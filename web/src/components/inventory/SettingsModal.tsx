import React, { useReducer, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { closeSettings, openNotifEditor } from '../../store/settingsModal';
import { setRarityStyle } from '../../store/ui';
import { UIConfig } from '../../store/uiConfig';
import { applyUIConfig, saveUserSettings, FONT_LABELS } from '../../utils/applyUIConfig';
import ColorPicker from './ColorPicker';

const PERF = [
  { id: 'low', label: 'Low' },
  { id: 'medium', label: 'Medium' },
  { id: 'high', label: 'High' },
];

const SWATCHES = ['#FF0062', '#A6CC34', '#3BA7E0', '#9B5CF6', '#E0A53B', '#E0483B', '#22B8CF', '#FFFFFF'];

const t = (key: string, fallback: string) => UIConfig.text[key] || fallback;

const SettingsModal: React.FC = () => {
  const open = useAppSelector((state) => state.settingsModal.open);
  const dispatch = useAppDispatch();
  const [, force] = useReducer((x) => x + 1, 0);
  const [closing, setClosing] = useState(false);

  if (!open) return null;

  const c = UIConfig;
  const commit = () => {
    applyUIConfig();
    saveUserSettings();
    force();
  };

  const setAccent = (hex: string) => {
    c.accent = hex.startsWith('#') ? hex : `#${hex}`;
    commit();
  };

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      dispatch(closeSettings());
    }, 170);
  };

  return (
    <div className={`settings-overlay${closing ? ' closing' : ''}`} onClick={close}>
      <div className={`settings-modal${closing ? ' closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <p className="settings-title">{t('settingsTitle', 'Settings')}</p>
          <button type="button" className="settings-close" onClick={close} aria-label="close">
            ✕
          </button>
        </div>

        <div className="settings-body">
          {c.allow.font && (
            <div className="settings-row">
              <span className="settings-label">{t('settingsFont', 'Font')}</span>
              <div className="settings-chips">
                {FONT_LABELS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`settings-chip${c.font === f.id ? ' active' : ''}`}
                    onClick={() => {
                      c.font = f.id;
                      commit();
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {c.allow.accent && (
            <div className="settings-row">
              <span className="settings-label">{t('settingsColor', 'Accent colour')}</span>
              <div className="settings-swatches">
                {SWATCHES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`settings-swatch${c.accent.toUpperCase() === s ? ' active' : ''}`}
                    style={{ background: s }}
                    onClick={() => setAccent(s)}
                    aria-label={s}
                  />
                ))}
              </div>
              <ColorPicker value={c.accent} onChange={setAccent} />
            </div>
          )}

          {c.allow.performance && (
            <div className="settings-row">
              <span className="settings-label">{t('settingsPerformance', 'Performance')}</span>
              <div className="settings-segment">
                {PERF.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`settings-seg${c.performance === p.id ? ' active' : ''}`}
                    onClick={() => {
                      c.performance = p.id;
                      commit();
                    }}
                  >
                    {t(`settingsPerf_${p.id}`, p.label)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {c.allow.rarity && (
            <div className="settings-row">
              <span className="settings-label">{t('settingsRarity', 'Rarity style')}</span>
              <div className="settings-segment">
                {[
                  { id: 'border', label: t('rarityBorder', 'Border') },
                  { id: 'glow', label: t('rarityGlow', 'Glow') },
                  { id: 'bottom', label: t('rarityBottom', 'Bottom') },
                  { id: 'soft', label: t('raritySoft', 'Soft') },
                ].map((rs) => (
                  <button
                    key={rs.id}
                    type="button"
                    className={`settings-seg${c.rarityStyle === rs.id ? ' active' : ''}`}
                    onClick={() => {
                      c.rarityStyle = rs.id;
                      dispatch(setRarityStyle(rs.id));
                      commit();
                    }}
                  >
                    {rs.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {c.allow.strokes && (
            <div className="settings-row">
              <span className="settings-label">{t('settingsStrokes', 'Slot detail lines')}</span>
              <button
                type="button"
                className={`settings-toggle${c.strokes.enabled ? ' on' : ''}`}
                onClick={() => {
                  c.strokes.enabled = !c.strokes.enabled;
                  commit();
                }}
                aria-pressed={c.strokes.enabled}
              >
                <span className="settings-toggle-knob" />
              </button>
            </div>
          )}

          {c.allow.itemLabels && (
            <div className="settings-row">
              <span className="settings-label">{t('settingsItemLabels', 'Item names')}</span>
              <button
                type="button"
                className={`settings-toggle${c.itemLabels ? ' on' : ''}`}
                onClick={() => {
                  c.itemLabels = !c.itemLabels;
                  commit();
                }}
                aria-pressed={c.itemLabels}
              >
                <span className="settings-toggle-knob" />
              </button>
            </div>
          )}

          {c.allow.notification && (
            <div className="settings-row">
              <span className="settings-label">{t('settingsNotification', 'Notifications')}</span>
              <button type="button" className="settings-edit-btn" onClick={() => dispatch(openNotifEditor())}>
                {t('settingsNotifEdit', 'Edit position')}
              </button>
            </div>
          )}

          <div className="settings-row settings-row-hint">
            <span className="settings-label">{t('settingsKeybinds', 'Keybinds')}</span>
            <span className="settings-hint">{t('settingsKeybindHint', 'Change in Settings → Key Bindings (pause menu)')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
