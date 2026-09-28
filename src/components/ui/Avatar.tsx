import React, { useState } from 'react';
import { cn } from '@/src/lib/utils';

type AvatarProps = {
  src?: string;
  name: string;
  size?: number;
  className?: string;
};

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({ src, name, size = 64, className }: AvatarProps) {
  const [failed, setFailed] = useState(false);

  if (!src) return null;

  const box = { width: size, height: size };

  if (failed) {
    return (
      <div
        style={box}
        aria-label={name}
        role="img"
        className={cn(
          'flex shrink-0 select-none items-center justify-center rounded-full',
          'border border-outline-variant bg-surface-high',
          'text-[15px] font-semibold tracking-[-0.01em] text-primary',
          className,
        )}
      >
        {initials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      style={box}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn(
        'shrink-0 rounded-full border border-outline-variant object-cover',
        'grayscale contrast-[1.08]',
        className,
      )}
    />
  );
}
