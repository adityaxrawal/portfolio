import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

import { useSharedState } from '@/app';
import './GridCursor.css';

const GRID_SIZE = 20; // Must match App.css background-size
const HOVER_SELECTORS = [
  'a',
  'button',
  '.nav-social-link',
  '.cta-button',
  '.stats-box',
  '.tech-tag',
  '.contact-button',
  '[role="button"]',
  '.snap-dot-btn',
  '.service-card',
  '.work-v2-job-item',
  '.featured-card',
  '.orbit-point'
].join(', ');

interface GridCell {
  x: number;
  y: number;
  opacity: number;
}

export default function GridCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const accentColorRef = useRef<string>('');

  const { isDarkTheme } = useSharedState();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Read the exact theme color after DOM applies classes
    const timer = setTimeout(() => {
      accentColorRef.current = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-text-primary')
        .trim();
    }, 50);
    return () => clearTimeout(timer);
  }, [isDarkTheme]);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const reticle = reticleRef.current;
    const text = textRef.current;

    if (!canvas || !ctx || !reticle || !text) return;

    // Resize canvas
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial setup
    gsap.set(reticle, { opacity: 1 });

    // GSAP quickTo tracking
    // Instant tracking for the precision reticle
    const dotX = gsap.quickTo(reticle, 'x', { duration: 0.1, ease: 'power3.out' });
    const dotY = gsap.quickTo(reticle, 'y', { duration: 0.1, ease: 'power3.out' });

    const activeCells: GridCell[] = [];
    let animationFrameId: number;
    let lastCellX = -1;
    let lastCellY = -1;

    // Canvas render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw grid cells - use exact theme text color
      ctx.fillStyle = accentColorRef.current || (isDarkTheme ? '#f4f1e8' : '#101010');
      const maxOpacity = isDarkTheme ? 0.3 : 0.15;
      
      for (let i = activeCells.length - 1; i >= 0; i--) {
        const cell = activeCells[i];
        
        // Decrease opacity
        cell.opacity -= 0.02; // Fade out speed
        
        if (cell.opacity <= 0) {
          activeCells.splice(i, 1);
          continue;
        }
        
        ctx.globalAlpha = cell.opacity * maxOpacity;
        ctx.fillRect(cell.x * GRID_SIZE, cell.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
      }
      
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const onMove = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;

      dotX(cx);
      dotY(cy);

      // Calculate grid cell
      const gx = Math.floor(cx / GRID_SIZE);
      const gy = Math.floor(cy / GRID_SIZE);

      // Add to active cells if moved to a new cell
      if (gx !== lastCellX || gy !== lastCellY) {
        // Find existing to reset opacity, or add new
        const existing = activeCells.find(c => c.x === gx && c.y === gy);
        if (existing) {
          existing.opacity = 1; // max glow
        } else {
          activeCells.push({ x: gx, y: gy, opacity: 1 });
        }
        lastCellX = gx;
        lastCellY = gy;
      }
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      const closest = target.closest(HOVER_SELECTORS);
      if (!closest) return;
      
      let newText = '';
      if (closest.classList.contains('featured-card')) {
        newText = 'View';
      } else if (closest.classList.contains('orbit-point') || closest.classList.contains('work-v2-job-item')) {
        newText = 'Explore';
      }
      
      if (newText) {
        text.innerText = newText;
        gsap.to(text, { opacity: 1, duration: 0.2, delay: 0.1 });
      }

      gsap.to(reticle, {
        width: newText ? 72 : 48,
        height: newText ? 72 : 48,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest(HOVER_SELECTORS)) return;
      
      gsap.to(text, { opacity: 0, duration: 0.2, onComplete: () => { text.innerText = ''; } });
      
      gsap.to(reticle, {
        width: 24,
        height: 24,
        duration: 0.4,
        ease: 'elastic.out(1, 0.4)'
      });
    };

    const onMouseDown = () => {
      gsap.to(reticle, { scale: 0.8, duration: 0.1 });
    };

    const onMouseUp = () => {
      gsap.to(reticle, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
    };

    const onLeaveWindow = () => {
      gsap.to(reticle, { opacity: 0, duration: 0.25 });
    };

    const onEnterWindow = () => {
      gsap.to(reticle, { opacity: 1, duration: 0.25 });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onLeaveWindow);
    document.documentElement.addEventListener('mouseenter', onEnterWindow);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
      document.documentElement.removeEventListener('mouseenter', onEnterWindow);
    };
  }, [prefersReducedMotion, isDarkTheme]);

  return (
    <div ref={containerRef} className={`grid-cursor-container ${isDarkTheme ? 'theme-dark' : 'theme-light'}`} aria-hidden="true">
      <canvas ref={canvasRef} className="grid-cursor-canvas" />
      <div ref={reticleRef} className="grid-cursor-reticle">
        <span ref={textRef} className="grid-cursor-text"></span>
      </div>
    </div>
  );
}
