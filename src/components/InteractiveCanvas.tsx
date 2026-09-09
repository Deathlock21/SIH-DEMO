import React, { useEffect, useRef } from 'react';

export interface InteractiveCanvasProps {
  intensity?: number;
}

export const InteractiveCanvas: React.FC<InteractiveCanvasProps> = ({
  intensity = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    isHovered: boolean;
    clickPulse: number;
  }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 3 : 300,
    targetX: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    targetY: typeof window !== 'undefined' ? window.innerHeight / 3 : 300,
    isHovered: false,
    clickPulse: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovered = false;
    };

    const handleClick = () => {
      mouseRef.current.clickPulse = 1.0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // Smooth linear interpolation (lerp) for soft, fluid cursor tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Decay click pulse smoothly
      if (mouse.clickPulse > 0.01) {
        mouse.clickPulse *= 0.94;
      } else {
        mouse.clickPulse = 0;
      }

      // Parallax offsets based on mouse position
      const parallaxX = (mouse.x - width / 2) * 0.04;
      const parallaxY = (mouse.y - height / 2) * 0.04;

      // 1. Silent Ambient Orb 1 (Top Left / Center - Soft Crimson Light, +10% visibility)
      const orb1X = width * 0.28 + Math.sin(time * 0.7) * 40 + parallaxX;
      const orb1Y = height * 0.22 + Math.cos(time * 0.5) * 35 + parallaxY;
      const orb1Radius = 600;
      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, orb1Radius);
      grad1.addColorStop(0, `rgba(220, 38, 38, ${0.055 * intensity})`);
      grad1.addColorStop(0.5, `rgba(239, 68, 68, ${0.022 * intensity})`);
      grad1.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // 2. Silent Ambient Orb 2 (Bottom Right - Soft Rose Glow, +10% visibility)
      const orb2X = width * 0.75 - Math.cos(time * 0.6) * 50 - parallaxX * 1.2;
      const orb2Y = height * 0.68 + Math.sin(time * 0.8) * 40 - parallaxY * 1.2;
      const orb2Radius = 700;
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, orb2Radius);
      grad2.addColorStop(0, `rgba(220, 38, 38, ${0.0385 * intensity})`);
      grad2.addColorStop(0.5, `rgba(254, 205, 211, ${0.022 * intensity})`);
      grad2.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 3. Dense Focused Core near Cursor (High density of color right at pointer)
      const innerCoreRadius = 150 + mouse.clickPulse * 70;
      const innerCoreAlpha = (mouse.isHovered ? 0.26 : 0.14) * intensity + mouse.clickPulse * 0.12;

      const innerGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        innerCoreRadius
      );
      innerGrad.addColorStop(0, `rgba(220, 38, 38, ${innerCoreAlpha})`);
      innerGrad.addColorStop(0.3, `rgba(225, 29, 72, ${innerCoreAlpha * 0.78})`);
      innerGrad.addColorStop(0.65, `rgba(239, 68, 68, ${innerCoreAlpha * 0.35})`);
      innerGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = innerGrad;
      ctx.fillRect(0, 0, width, height);

      // 4. Soft Outer Ambient Cursor Halo (Dispersing crimson glow)
      const outerRadius = 460 + mouse.clickPulse * 120;
      const outerAlpha = (mouse.isHovered ? 0.095 : 0.048) * intensity + mouse.clickPulse * 0.05;

      const outerGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        outerRadius
      );
      outerGrad.addColorStop(0, `rgba(220, 38, 38, ${outerAlpha})`);
      outerGrad.addColorStop(0.45, `rgba(244, 63, 94, ${outerAlpha * 0.5})`);
      outerGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = outerGrad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
};
