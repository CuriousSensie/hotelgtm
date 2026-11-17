'use client';

import { useEffect, useRef } from 'react';

import { PALETTES, SHADERS, type PaletteId, type ShaderId, type ShaderPalette } from './shaders';

const VERTEX = 'attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }';
/** Backing-store pixels per CSS pixel. The silk is soft, so rendering below 1x and upscaling is invisible but far cheaper. */
const RENDER_SCALE = 0.6;
/** The motion is slow; 30fps looks identical to 60 at half the GPU cost (and battery). */
const FRAME_MS = 1000 / 30;
/** Renderers without a GPU: animating there would run the shader on the CPU, so they get one still frame. */
const SOFTWARE_RENDERER = /swiftshader|llvmpipe|softpipe|software|basic render/i;

type ShaderCanvasProps = {
  shader: ShaderId;
  palette: PaletteId | ShaderPalette;
  className?: string;
  /** Time multiplier for the ambient motion. */
  speed?: number;
};

function hexToRgb(hex: string): [number, number, number] {
  const value = parseInt(hex.slice(1), 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Could not create WebGL shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`Shader compile failed: ${gl.getShaderInfoLog(shader) ?? 'unknown error'}`);
  }
  return shader;
}

function isSoftwareRenderer(gl: WebGLRenderingContext): boolean {
  const info = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
  return typeof renderer === 'string' && SOFTWARE_RENDERER.test(renderer);
}

/** Runs `task` once the browser is idle, so WebGL setup never competes with first paint and hydration. */
function whenIdle(task: () => void): () => void {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(task, { timeout: 1500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(task, 200);
  return () => clearTimeout(id);
}

type Setup = { canvas: HTMLCanvasElement; shader: ShaderId; colorKey: string; speed: number };

/** Builds the WebGL program and render loop. Returns a teardown, or undefined if WebGL is unavailable. */
function startShader({ canvas, shader, colorKey, speed }: Setup): (() => void) | undefined {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return undefined;

  let program: WebGLProgram;
  try {
    const created = gl.createProgram();
    if (!created) throw new Error('Could not create WebGL program');
    program = created;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, SHADERS[shader]));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'link failed');
  } catch (error) {
    // Leave the CSS fallback visible, but surface the reason for whoever is debugging.
    console.error(`[ShaderCanvas:${shader}]`, error);
    return undefined;
  }
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'a_pos');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const uRes = uniform('u_res');
  const uTime = uniform('u_time');
  const uMouse = uniform('u_mouse');
  const uEnergy = uniform('u_energy');
  colorKey.split(',').forEach((hex, index) => gl.uniform3fv(uniform(`u_c${index + 1}`), hexToRgb(hex)));

  // Still frame only: reduced-motion preference, or no GPU to animate on.
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches || isSoftwareRenderer(gl);
  const target = { x: 0.5, y: 0.5 };
  const mouse = { x: 0.5, y: 0.5 };
  /** Pointer speed, kicked by movement and decaying over time (0..1). */
  let energy = 0;
  let frame = 0;
  let visible = false;
  let elapsed = 8; // start mid-flow so the still frame is not the blank t=0 state
  let last = performance.now();
  let lastDrawn = 0;

  const resize = () => {
    const scale = Math.min(window.devicePixelRatio || 1, 2) * RENDER_SCALE;
    const width = Math.max(1, Math.round(canvas.clientWidth * scale));
    const height = Math.max(1, Math.round(canvas.clientHeight * scale));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
    gl.uniform2f(uRes, width, height);
  };

  const draw = (now: number) => {
    // Clamp so a long pause (tab hidden, off screen) does not jump the pointer easing in one step.
    const dt = Math.min(Math.max(now - last, 0) / 1000, 0.1);
    if (!still) elapsed += dt * speed;
    last = now;
    // Easing is time-based (tuned at 60fps) so it feels the same at any frame rate.
    const follow = 1 - Math.pow(0.92, dt * 60);
    mouse.x += (target.x - mouse.x) * follow;
    mouse.y += (target.y - mouse.y) * follow;
    energy *= Math.pow(0.965, dt * 60);
    gl.uniform1f(uTime, elapsed);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uEnergy, energy);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const loop = (now: number) => {
    if (now - lastDrawn >= FRAME_MS - 1) {
      lastDrawn = now;
      draw(now);
    }
    frame = requestAnimationFrame(loop);
  };
  const start = () => {
    if (frame || still) return;
    last = performance.now();
    frame = requestAnimationFrame(loop);
  };
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!visible) return;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = 1 - (event.clientY - rect.top) / rect.height;
    energy = Math.min(1, energy + Math.hypot(x - target.x, y - target.y) * 1.6);
    target.x = x;
    target.y = y;
  };

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (!frame) draw(performance.now());
  });
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  });

  resize();
  draw(performance.now());
  canvas.dataset.ready = 'true';
  resizeObserver.observe(canvas);
  visibilityObserver.observe(canvas);
  // A still frame has nothing for the pointer to drive.
  if (!still) window.addEventListener('pointermove', onPointerMove, { passive: true });

  return () => {
    stop();
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
    // Free GPU objects but keep the context: this canvas is reused when the effect re-runs.
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
  };
}

/**
 * Full-bleed WebGL background. Fills its positioned parent, follows the pointer and pauses while off screen.
 * Set up after the page is idle; sets data-ready on the canvas once the first frame is drawn (CSS fades it in).
 * Under reduced motion, or without a GPU, it renders a single still frame and ignores the pointer.
 * If WebGL is unavailable the canvas stays transparent and the parent's CSS background shows.
 */
export function ShaderCanvas({ shader, palette, className, speed = 1 }: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorKey = (typeof palette === 'string' ? PALETTES[palette] : palette).join(',');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let teardown: (() => void) | undefined;
    const cancel = whenIdle(() => {
      teardown = startShader({ canvas, shader, colorKey, speed });
    });
    return () => {
      cancel();
      teardown?.();
    };
  }, [shader, colorKey, speed]);

  return <canvas ref={canvasRef} className={className ? `shader-canvas ${className}` : 'shader-canvas'} aria-hidden="true" />;
}
