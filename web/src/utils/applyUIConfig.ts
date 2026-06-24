import { UIConfig } from '../store/uiConfig';
import { hexToRgb } from './hexToRgb';
import { fetchNui } from './fetchNui';

export const FONTS: Record<string, string> = {
  default: "'Roboto', sans-serif",
  montserrat: "'Montserrat', sans-serif",
  inter: "'Inter', sans-serif",
  poppins: "'Poppins', sans-serif",
  rajdhani: "'Rajdhani', sans-serif",
  oswald: "'Oswald', sans-serif",
  kanit: "'Kanit', sans-serif",
  orbitron: "'Orbitron', sans-serif",
};

export const FONT_LABELS: { id: string; label: string }[] = [
  { id: 'default', label: 'Roboto' },
  { id: 'montserrat', label: 'Montserrat' },
  { id: 'inter', label: 'Inter' },
  { id: 'poppins', label: 'Poppins' },
  { id: 'rajdhani', label: 'Rajdhani' },
  { id: 'oswald', label: 'Oswald' },
  { id: 'kanit', label: 'Kanit' },
  { id: 'orbitron', label: 'Orbitron' },
];

export const applyUIConfig = () => {
  const root = document.documentElement.style;
  const c = UIConfig;
  const low = c.performance === 'low';

  root.setProperty('--accent', c.accent);
  root.setProperty('--accent-rgb', hexToRgb(c.accent));
  root.setProperty('--ui-font', FONTS[c.font] || FONTS.default);
  root.setProperty('--glow', String(low ? 0 : c.glow.enabled ? c.glow.strength : 0));
  root.setProperty('--backdrop', String(c.darkness));
  root.setProperty('--strokes', c.strokes.enabled ? '1' : '0');
  root.setProperty('--stroke-gap', `${c.strokes.gap}px`);
  root.setProperty('--stroke-h', `${c.strokes.height}%`);
  root.setProperty('--stroke-mid-h', `${c.strokes.middleHeight}%`);

  const cornersOn = !low;
  root.setProperty('--corner-tl', cornersOn && c.corners.topLeft ? '1' : '0');
  root.setProperty('--corner-tr', cornersOn && c.corners.topRight ? '1' : '0');
  root.setProperty('--corner-bl', cornersOn && c.corners.bottomLeft ? '1' : '0');
  root.setProperty('--corner-br', cornersOn && c.corners.bottomRight ? '1' : '0');

  root.setProperty('--settings-btn-top', `${c.settingsButton.top}px`);
  root.setProperty('--settings-btn-right', `${c.settingsButton.right}px`);

  const el = document.documentElement;
  el.classList.remove('perf-low', 'perf-medium', 'perf-high');
  el.classList.add(`perf-${c.performance}`);
  el.classList.remove('rarity-style-border', 'rarity-style-glow', 'rarity-style-bottom', 'rarity-style-soft');
  el.classList.add(`rarity-style-${c.rarityStyle}`);
  el.classList.toggle('hide-item-labels', !c.itemLabels);
};

export const saveUserSettings = () => {
  const c = UIConfig;
  fetchNui('saveSettings', {
    font: c.font,
    accent: c.accent,
    performance: c.performance,
    rarityStyle: c.rarityStyle,
    strokes: { enabled: c.strokes.enabled },
    notification: c.notification,
    itemLabels: c.itemLabels,
  });
};
