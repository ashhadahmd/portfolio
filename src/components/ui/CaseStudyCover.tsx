import React from 'react';
import { cn } from '@/src/lib/utils';

export function CaseStudyCover({
  art,
  accentRgb,
  fit = 'bleed',
  logo,
  logoDark,
  logoHeight = 20,
  pillLight,
  name,
  href,
}: {
  art: string;
  accentRgb: string;
  fit?: 'bleed' | 'cover';
  logo: string;
  logoDark?: string;
  /** Rendered height in px; logos with a tall icon need more to match wordmarks. */
  logoHeight?: number;
  /** Pill colour in the light theme; defaults to the page surface. */
  pillLight?: string;
  name: string;
  href?: string;
}) {
  const content = (
    <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-surface-high">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(85% 70% at 50% 45%, rgba(${accentRgb}, 0.14), transparent 72%)`,
        }}
      />

      <img
        src={art}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={cn(
          fit === 'cover'
            ? 'absolute inset-0 h-full w-full object-cover'
            : 'absolute inset-x-0 bottom-0 h-auto w-full',
        )}
      />

      <div
        className={cn(
          'cover-pill absolute left-4 top-4 inline-flex h-10 items-center rounded-full px-4 shadow-[0_6px_18px_rgba(0,0,0,0.18)] ring-1 ring-black/5',
        )}
        style={{
          ['--logo-h' as string]: `${logoHeight}px`,
          ['--pill-light' as string]: pillLight,
        }}
      >
        {logoDark ? (
          <>
            <img
              src={logo}
              alt={`${name} logo`}
              className="cover-logo-light h-[var(--logo-h)] w-auto object-contain"
              loading="lazy"
            />
            <img
              src={logoDark}
              alt={`${name} logo`}
              className="cover-logo-dark h-[var(--logo-h)] w-auto object-contain"
              loading="lazy"
            />
          </>
        ) : (
          <img src={logo} alt={`${name} logo`} className="h-[var(--logo-h)] w-auto object-contain" loading="lazy" />
        )}
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${name}`}>
      {content}
    </a>
  );
}
