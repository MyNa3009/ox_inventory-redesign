import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { closeNotifEditor, openSettings } from '../../store/settingsModal';
import { UIConfig } from '../../store/uiConfig';
import { saveUserSettings } from '../../utils/applyUIConfig';

const clamp = (n: number) => Math.max(4, Math.min(n, 96));
const t = (key: string, fallback: string) => UIConfig.text[key] || fallback;

const NotificationEditor: React.FC = () => {
  const editing = useAppSelector((state) => state.settingsModal.notifEditing);
  const dispatch = useAppDispatch();
  const [pos, setPos] = useState({ x: UIConfig.notification.x, y: UIConfig.notification.y });
  const dragging = useRef(false);

  useEffect(() => {
    if (editing) setPos({ x: UIConfig.notification.x, y: UIConfig.notification.y });
  }, [editing]);

  if (!editing) return null;

  const startDrag = () => {
    dragging.current = true;
    const move = (ev: PointerEvent) => {
      if (!dragging.current) return;
      setPos({ x: clamp((ev.clientX / window.innerWidth) * 100), y: clamp((ev.clientY / window.innerHeight) * 100) });
    };
    const up = () => {
      dragging.current = false;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const save = () => {
    UIConfig.notification = { ...pos };
    saveUserSettings();
    dispatch(closeNotifEditor());
    dispatch(openSettings());
  };

  const cancel = () => {
    dispatch(closeNotifEditor());
    dispatch(openSettings());
  };

  return (
    <div className="notif-editor">
      <div className="notif-editor-bar">
        <span className="notif-editor-hint">{t('notifEditorHint', 'Drag the notification to position it')}</span>
        <div className="notif-editor-actions">
          <button type="button" className="notif-editor-cancel" onClick={cancel}>
            {t('cancel', 'Cancel')}
          </button>
          <button type="button" className="notif-editor-save" onClick={save}>
            {t('save', 'Save')}
          </button>
        </div>
      </div>

      <div className="notif-editor-dummy" style={{ left: `${pos.x}%`, top: `${pos.y}%` }} onPointerDown={startDrag}>
        <div className="notif-editor-dummy-action">{t('settingsNotification', 'Notification')}</div>
        <div className="notif-editor-dummy-body" />
      </div>
    </div>
  );
};

export default NotificationEditor;
