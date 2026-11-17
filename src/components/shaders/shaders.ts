/**
 * Fragment shader for <ShaderCanvas>: "charmeuse" silk, a liquid domain-warped satin used behind the home hero.
 * Draws with three colours (u_c1 lit cloth, u_c2 shadowed fold, u_c3 sheen) and reacts to the pointer:
 * u_mouse (0..1) presses a soft dent into the cloth, u_energy (pointer speed, 0..1) sends ripples outward.
 */

const SILK = /* glsl */ `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_energy;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.02 + vec2(17.1, 9.2); a *= 0.5; }
  return v;
}

/* Height of the cloth: two rounds of domain warping give the liquid folds; the pointer adds a dent and ripples. */
float silkHeight(vec2 p, vec2 m, float t) {
  vec2 s = p * 1.1;
  float tt = t * 0.07;
  vec2 a = vec2(fbm(s + vec2(0.0, tt)), fbm(s + vec2(5.2, 1.3 - tt)));
  vec2 b = vec2(fbm(s + 2.4 * a + vec2(1.7, 9.2) + tt), fbm(s + 2.4 * a + vec2(8.3, 2.8) - tt));
  float h = (fbm(s + 2.6 * b) - 0.5) * 3.2;
  vec2 d = p - m;
  float r2 = dot(d, d);
  h -= 0.55 * exp(-r2 * 7.0);
  h += u_energy * 0.45 * exp(-r2 * 2.2) * sin(sqrt(r2) * 16.0 - t * 5.0);
  return h;
}

void main() {
  /* Centred, aspect-corrected coordinates for the fragment and the pointer. */
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec2 m = (u_mouse - 0.5) * vec2(u_res.x / u_res.y, 1.0);
  float t = u_time;
  float e = 1.5 / u_res.y;
  float h = silkHeight(p, m, t);
  float hx = silkHeight(p + vec2(e, 0.0), m, t);
  float hy = silkHeight(p + vec2(0.0, e), m, t);
  vec3 n = normalize(vec3(-(hx - h) / e, -(hy - h) / e, 7.0));
  vec3 light = normalize(vec3(-0.45, 0.6, 0.65));
  float diffuse = clamp(dot(n, light), 0.0, 1.0);
  float spec = pow(clamp(dot(n, normalize(light + vec3(0.0, 0.0, 1.0))), 0.0, 1.0), 38.0);
  float fold = smoothstep(-1.4, 1.4, h);
  vec3 col = mix(u_c2, u_c1, smoothstep(0.35, 0.98, diffuse) * 0.75 + fold * 0.25);
  col = mix(col, u_c3, clamp(spec * 0.7, 0.0, 1.0));
  col += spec * 0.08;
  col += (hash(gl_FragCoord.xy + fract(t) * 100.0) - 0.5) * 0.018;
  gl_FragColor = vec4(col, 1.0);
}`;

export type ShaderId = 'silk';

export const SHADERS: Record<ShaderId, string> = { silk: SILK };

export type ShaderPalette = [lit: string, shadow: string, sheen: string];

export const PALETTES = {
  pine: ['#21423a', '#0b1712', '#d9b867'],
} satisfies Record<string, ShaderPalette>;

export type PaletteId = keyof typeof PALETTES;
