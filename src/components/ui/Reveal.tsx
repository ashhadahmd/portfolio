import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const APPLE_EASE: [number, number, number, number] = [0.28, 0.11, 0.32, 1];

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  immediate?: boolean;
  as?: 'div' | 'section' | 'article' | 'li';
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
  immediate = false,
  as = 'div',
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const transition = { duration: 1, ease: APPLE_EASE, delay };
  const from = { opacity: 0, y };
  const to = { opacity: 1, y: 0 };

  if (immediate) {
    return (
      <Tag className={className} initial={from} animate={to} transition={transition}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial={from}
      whileInView={to}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -80px 0px' }}
      transition={transition}
    >
      {children}
    </Tag>
  );
}

export function MaskedLines({
  lines,
  className,
  delay = 0,
  stagger = 0.09,
  immediate = false,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <span className={className}>
        {lines.map((line, index) => (
          <span key={line} className="block">
            {line}
            {index < lines.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    );
  }

  const to = { y: '0%' };
  const from = { y: '110%' };

  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="block"
            initial={from}
            {...(immediate
              ? { animate: to }
              : {
                  whileInView: to,
                  viewport: { once: true, amount: 0.4, margin: '0px 0px -40px 0px' },
                })}
            transition={{
              duration: 1.1,
              ease: APPLE_EASE,
              delay: delay + index * stagger,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
