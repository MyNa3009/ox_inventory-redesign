import React, { useEffect, useRef, useState } from 'react';

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(n, max));

const hexToHsv = (hex: string) => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (h.length !== 6) return { h: 0, s: 0, v: 100 };
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let hue = 0;
  if (d) {
    if (max === r) hue = ((g - b) / d) % 6;
    else if (max === g) hue = (b - r) / d + 2;
    else hue = (r - g) / d + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }
  return { h: hue, s: max === 0 ? 0 : (d / max) * 100, v: max * 100 };
};

const hsvToHex = (h: number, s: number, v: number) => {
  s /= 100;
  v /= 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) [r, g] = [c, x];
  else if (h < 120) [r, g] = [x, c];
  else if (h < 180) [g, b] = [c, x];
  else if (h < 240) [g, b] = [x, c];
  else if (h < 300) [r, b] = [x, c];
  else [r, b] = [c, x];
  const to = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
};

const ColorPicker: React.FC<{ value: string; onChange: (hex: string) => void }> = ({ value, onChange }) => {
  const [hsv, setHsv] = useState(() => hexToHsv(value));
  const squareRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.toUpperCase() !== hsvToHex(hsv.h, hsv.s, hsv.v)) setHsv(hexToHsv(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const { h, s, v } = hsv;

  const drag = (ref: React.RefObject<HTMLDivElement | null>, handler: (e: PointerEvent) => void) => (
    e: React.PointerEvent
  ) => {
    handler(e.nativeEvent);
    const move = (ev: PointerEvent) => handler(ev);
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const updateSquare = (e: PointerEvent) => {
    const r = squareRef.current!.getBoundingClientRect();
    const ns = clamp(((e.clientX - r.left) / r.width) * 100);
    const nv = clamp(100 - ((e.clientY - r.top) / r.height) * 100);
    setHsv((p) => ({ ...p, s: ns, v: nv }));
    onChange(hsvToHex(h, ns, nv));
  };

  const updateHue = (e: PointerEvent) => {
    const r = hueRef.current!.getBoundingClientRect();
    const nh = clamp(((e.clientX - r.left) / r.width) * 360, 0, 360);
    setHsv((p) => ({ ...p, h: nh }));
    onChange(hsvToHex(nh, s, v));
  };

  return (
    <div className="cp">
      <div
        className="cp-square"
        ref={squareRef}
        onPointerDown={drag(squareRef, updateSquare)}
        style={{
          background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent), hsl(${h}, 100%, 50%)`,
        }}
      >
        <div className="cp-square-handle" style={{ left: `${s}%`, top: `${100 - v}%` }} />
      </div>

      <div className="cp-hue" ref={hueRef} onPointerDown={drag(hueRef, updateHue)}>
        <div className="cp-hue-handle" style={{ left: `${(h / 360) * 100}%` }} />
      </div>

      <div className="cp-bottom">
        <span className="cp-preview" style={{ background: value }} />
        <span className="cp-hash">#</span>
        <input
          className="cp-hex"
          value={value.replace('#', '')}
          maxLength={6}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9a-fA-F]/g, '');
            onChange(`#${val}`);
          }}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
