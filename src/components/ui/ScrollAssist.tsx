import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronsUp, ChevronsDown, type LucideIcon } from 'lucide-react';
import { APPLE_EASE } from './Reveal';

function EdgeButton({
  mode,
  icon: Icon,
  label,
  onClick,
}: {
  mode: string;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-primary text-on-primary shadow-lg ring-1 ring-outline-variant transition-opacity hover:opacity-90"
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={mode}
          className="absolute inset-0 flex items-center justify-center"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.5, rotate: -50 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.5, rotate: 50 }}
          transition={{ duration: 0.28, ease: APPLE_EASE }}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function ScrollAssist() {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const [hasPointer] = useState(
    () => window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  );

  useEffect(() => {
    const updateEdges = () => {
      const scrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setAtTop(scrollY <= 4);
      setAtBottom(scrollY >= max - 4);
      setScrollable(max > 80);
    };

    updateEdges();
    window.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    // Page height also changes on route changes and when a case study expands.
    const observer = new ResizeObserver(updateEdges);
    observer.observe(document.body);
    return () => {
      window.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
      observer.disconnect();
    };
  }, []);

  const behavior = (): ScrollBehavior =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

  const step = (direction: 1 | -1) => {
    window.scrollBy({ top: direction * window.innerHeight * 0.85, behavior: behavior() });
  };

  const jumpTo = (edge: 'top' | 'bottom') => {
    window.scrollTo({
      top: edge === 'top' ? 0 : document.documentElement.scrollHeight,
      behavior: behavior(),
    });
  };

  if (!scrollable || !hasPointer) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 hidden flex-col gap-2 sm:flex"
      role="group"
      aria-label="Scroll the page"
    >
      {atTop ? (
        <EdgeButton
          mode="jump-bottom"
          icon={ChevronsDown}
          label="Jump to the bottom of the page"
          onClick={() => jumpTo('bottom')}
        />
      ) : (
        <EdgeButton
          mode="step-up"
          icon={ChevronUp}
          label="Scroll up one screen"
          onClick={() => step(-1)}
        />
      )}

      {atBottom ? (
        <EdgeButton
          mode="jump-top"
          icon={ChevronsUp}
          label="Jump to the top of the page"
          onClick={() => jumpTo('top')}
        />
      ) : (
        <EdgeButton
          mode="step-down"
          icon={ChevronDown}
          label="Scroll down one screen"
          onClick={() => step(1)}
        />
      )}
    </div>
  );
}
