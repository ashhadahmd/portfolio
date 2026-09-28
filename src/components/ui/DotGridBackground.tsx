import React, { useEffect, useRef } from 'react';
import { createNoise2D } from '@/src/lib/noise';

const SPACING = 32;
const NOISE_SCALE = 0.0055;
const TIME_SPEED = 0.00026;
const WAVE_AMPLITUDE_Y = 12;
const WAVE_AMPLITUDE_X = 9;
const NOISE_X_OFFSET = 1000;
const DOT_RADIUS = 1.7;
const SPOTLIGHT_RADIUS = 220;
const FOLLOW = 0.12;

type ThemeVars = {
  r: number;
  g: number;
  b: number;
  baseOpacity: number;
  spotOpacity: number;
};

function readThemeVars(): ThemeVars {
  const style = getComputedStyle(document.documentElement);
  const [r, g, b] = style
    .getPropertyValue('--dot-grid-rgb')
    .split(',')
    .map((part) => parseFloat(part.trim()) || 0);
  return {
    r,
    g,
    b,
    baseOpacity: parseFloat(style.getPropertyValue('--dot-base-opacity')) || 0.18,
    spotOpacity: parseFloat(style.getPropertyValue('--dot-spot-opacity')) || 0.28,
  };
}

export function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas || !glow) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!hasPointer) glow.classList.add('dot-grid--static');

    const noise2D = createNoise2D();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const offsetX = Math.random() * SPACING;
    const offsetY = Math.random() * SPACING;

    let width = 0;
    let height = 0;
    let theme = readThemeVars();
    // With reduced motion there is no animation loop, so changes must repaint.
    let redraw = () => {};

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      redraw();
    };
    resize();
    window.addEventListener('resize', resize);

    const themeObserver = new MutationObserver(() => {
      theme = readThemeVars();
      redraw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    let targetX = width / 2;
    let targetY = height / 2;
    let spotX = targetX;
    let spotY = targetY;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };
    if (hasPointer) {
      window.addEventListener('pointermove', onMove, { passive: true });
      spotX = targetX;
      spotY = targetY;
    }

    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;

    const draw = () => {
      const { r, g, b, baseOpacity, spotOpacity } = theme;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;

      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          const x = ix * SPACING - offsetX;
          const y = iy * SPACING - offsetY;

          const n = noise2D(x * NOISE_SCALE, y * NOISE_SCALE + elapsed);
          const nx = noise2D(x * NOISE_SCALE + NOISE_X_OFFSET, y * NOISE_SCALE + elapsed);
          const depth = (n + 1) / 2;
          const dy = n * WAVE_AMPLITUDE_Y;
          const dx = nx * WAVE_AMPLITUDE_X;
          const px = x + dx;
          const py = y + dy;

          let opacity = baseOpacity * (0.45 + depth * 1.1);
          const radius = DOT_RADIUS * (0.6 + depth * 0.9);

          if (hasPointer) {
            const spotDx = px - spotX;
            const spotDy = py - spotY;
            const dist = Math.sqrt(spotDx * spotDx + spotDy * spotDy);
            if (dist < SPOTLIGHT_RADIUS) {
              const falloff = 1 - dist / SPOTLIGHT_RADIUS;
              opacity += spotOpacity * falloff * falloff * (0.6 + depth * 0.6);
            }
          } else {
            opacity += spotOpacity * 0.35 * depth;
          }

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(opacity, 1)})`;
          ctx.fill();
        }
      }
    };

    const tick = (time: number) => {
      const delta = lastTime ? time - lastTime : 16;
      lastTime = time;
      elapsed += delta * TIME_SPEED;

      if (hasPointer) {
        spotX += (targetX - spotX) * FOLLOW;
        spotY += (targetY - spotY) * FOLLOW;
        glow.style.setProperty('--spot-x', `${spotX}px`);
        glow.style.setProperty('--spot-y', `${spotY}px`);
      }

      draw();
      frame = requestAnimationFrame(tick);
    };

    if (reduceMotion) {
      if (hasPointer) {
        glow.style.setProperty('--spot-x', `${spotX}px`);
        glow.style.setProperty('--spot-y', `${spotY}px`);
      }
      draw();
      redraw = draw;
    } else {
      frame = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      themeObserver.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="dot-grid pointer-events-none fixed inset-0 z-0 overflow-hidden bg-surface-lowest"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div ref={glowRef} className="dot-grid__glow absolute inset-0" />
    </div>
  );
}
