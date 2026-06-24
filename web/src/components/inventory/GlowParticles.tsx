import React, { useMemo } from 'react';
import { UIConfig } from '../../store/uiConfig';

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const GlowParticles: React.FC = () => {
  const { enabled, count, speed } = UIConfig.particles;

  const dots = useMemo<React.CSSProperties[]>(() => {
    if (!enabled || UIConfig.performance !== 'high') return [];

    const zones: { x: [number, number]; y: [number, number] }[] = [];
    if (UIConfig.corners.topLeft) zones.push({ x: [0, 32], y: [0, 32] });
    if (UIConfig.corners.topRight) zones.push({ x: [68, 100], y: [0, 32] });
    if (UIConfig.corners.bottomLeft) zones.push({ x: [0, 32], y: [68, 100] });
    if (UIConfig.corners.bottomRight) zones.push({ x: [68, 100], y: [68, 100] });
    if (zones.length === 0) return [];

    const out: React.CSSProperties[] = [];
    const spd = speed || 1;

    zones.forEach((zone) => {
      for (let i = 0; i < count; i++) {
        const dur = rand(7, 13) / spd;
        out.push({
          left: `${rand(zone.x[0], zone.x[1])}%`,
          top: `${rand(zone.y[0], zone.y[1])}%`,
          ['--dx' as string]: `${rand(-55, 55)}px`,
          ['--dy' as string]: `${rand(-55, 55)}px`,
          animationDuration: `${dur.toFixed(2)}s`,
          animationDelay: `${rand(0, dur).toFixed(2)}s`,
        } as React.CSSProperties);
      }
    });

    return out;
  }, [enabled, count, speed]);

  if (dots.length === 0) return null;

  return (
    <div className="glow-particles">
      {dots.map((style, i) => (
        <div key={i} className="glow-particle" style={style} />
      ))}
    </div>
  );
};

export default GlowParticles;
