import Link from 'next/link';
import type { ComponentProps } from 'react';

type BrandProps = Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>;

export function Brand(props: BrandProps) {
  return (
    <Link href="/" className="brand" {...props}>
      <span className="brand-mark"><span>H</span></span>
      <span>HOTELGTM<small>HOSPITALITY COMMERCIAL INTELLIGENCE</small></span>
    </Link>
  );
}
