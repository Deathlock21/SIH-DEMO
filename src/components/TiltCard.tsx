import React, { useRef, useState, useCallback } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number; // degrees
  scale?: number;
  glowColor?: 'red' | 'white' | 'cyan' | 'purple' | 'emerald' | 'amber' | 'gold';
  onClick?: () => void;
  id?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  style = {},
  maxTilt = 8,
  scale = 1.015,
  glowColor = 'red',
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  const glowColorsMap = {
    red: {
      border: 'rgba(220, 38, 38, 0.35)',
      shadow: '0 12px 30px rgba(220, 38, 38, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
      glare: 'rgba(255, 255, 255, 0.55)',
    },
    white: {
      border: 'rgba(0, 0, 0, 0.14)',
      shadow: '0 12px 30px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
      glare: 'rgba(255, 255, 255, 0.55)',
    },
    gold: {
      border: 'rgba(217, 119, 6, 0.35)',
      shadow: '0 12px 30px rgba(217, 119, 6, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
      glare: 'rgba(255, 255, 255, 0.55)',
    },
    cyan: {
      border: 'rgba(220, 38, 38, 0.35)',
      shadow: '0 12px 30px rgba(220, 38, 38, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
      glare: 'rgba(255, 255, 255, 0.55)',
    },
    purple: {
      border: 'rgba(220, 38, 38, 0.28)',
      shadow: '0 12px 30px rgba(220, 38, 38, 0.10), 0 2px 6px rgba(0, 0, 0, 0.04)',
      glare: 'rgba(255, 255, 255, 0.55)',
    },
    emerald: {
      border: 'rgba(16, 185, 129, 0.35)',
      shadow: '0 12px 30px rgba(16, 185, 129, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
      glare: 'rgba(255, 255, 255, 0.55)',
    },
    amber: {
      border: 'rgba(245, 158, 11, 0.35)',
      shadow: '0 12px 30px rgba(245, 158, 11, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
      glare: 'rgba(255, 255, 255, 0.55)',
    },
  };

  const currentGlow = glowColorsMap[glowColor];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const xPct = clientX / rect.width;
      const yPct = clientY / rect.height;

      const tiltX = (0.5 - yPct) * (maxTilt * 2);
      const tiltY = (xPct - 0.5) * (maxTilt * 2);

      setTransformStyle(
        `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
      );

      setGlarePosition({
        x: Math.round(xPct * 100),
        y: Math.round(yPct * 100),
        opacity: 1,
      });
    },
    [maxTilt, scale]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      id={id}
      className={`tilt-card-container ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: transformStyle,
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.25s ease, border-color 0.25s ease'
          : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease, border-color 0.35s ease',
        borderColor: isHovered ? currentGlow.border : undefined,
        boxShadow: isHovered ? currentGlow.shadow : undefined,
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Specular Glare / Reflection Layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          background: `radial-gradient(circle 350px at ${glarePosition.x}% ${glarePosition.y}%, ${currentGlow.glare} 0%, rgba(255, 255, 255, 0.2) 40%, transparent 80%)`,
          opacity: glarePosition.opacity,
          transition: 'opacity 0.3s ease',
          zIndex: 2,
        }}
      />

      {/* Inner Content with z-index above glare */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
};
