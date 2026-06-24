import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { closeSplitModal } from '../../store/splitModal';
import { onSplit } from '../../dnd/onSplit';
import { Items } from '../../store/items';
import { Locale } from '../../store/locale';

const SplitModal: React.FC = () => {
  const item = useAppSelector((state) => state.splitModal.item);
  const dispatch = useAppDispatch();

  const total = item?.count ?? 0;
  const max = Math.max(1, total - 1);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    if (item) setAmount(Math.max(1, Math.floor((item.count ?? 2) / 2)));
  }, [item]);

  if (!item) return null;

  const clamp = (n: number) => Math.max(1, Math.min(Math.floor(n) || 1, max));
  const label = item.metadata?.label || Items[item.name]?.label || item.name;

  const cancel = () => dispatch(closeSplitModal());
  const confirm = () => {
    onSplit(item, amount);
    dispatch(closeSplitModal());
  };

  return (
    <div className="split-modal-overlay" onClick={cancel}>
      <div className="split-modal" onClick={(e) => e.stopPropagation()}>
        <p className="split-modal-title">
          {Locale.ui_split || 'Split'} — {label}
        </p>

        <div className="split-modal-amount">
          <button type="button" onClick={() => setAmount((a) => clamp(a - 1))} aria-label="decrease">
            −
          </button>
          <input
            type="number"
            min={1}
            max={max}
            value={amount}
            onChange={(e) => setAmount(clamp(parseInt(e.target.value, 10)))}
            onKeyDown={(e) => e.key === 'Enter' && confirm()}
            autoFocus
          />
          <button type="button" onClick={() => setAmount((a) => clamp(a + 1))} aria-label="increase">
            +
          </button>
        </div>

        <input
          className="split-modal-slider"
          type="range"
          min={1}
          max={max}
          value={amount}
          onChange={(e) => setAmount(clamp(parseInt(e.target.value, 10)))}
        />

        <div className="split-modal-info">
          <span>
            {amount} / {total}
          </span>
          <span>
            {Locale.ui_split_rest || 'Rest'}: {total - amount}
          </span>
        </div>

        <div className="split-modal-buttons">
          <button type="button" className="split-modal-cancel" onClick={cancel}>
            {Locale.ui_close || 'Cancel'}
          </button>
          <button type="button" className="split-modal-confirm" onClick={confirm}>
            {Locale.ui_split || 'Split'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplitModal;
