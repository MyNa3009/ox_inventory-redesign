import { isSlotWithItem } from '../helpers';
import { validateMove } from '../thunks/validateItems';
import { store } from '../store';
import { SlotWithItem } from '../typings';
import { moveSlots } from '../store/inventory';

export const onSplit = (item: SlotWithItem, amount: number) => {
  const { inventory: state } = store.getState();
  const sourceInventory = state.leftInventory;
  const sourceSlot = sourceInventory.items[item.slot - 1] as SlotWithItem;

  if (!isSlotWithItem(sourceSlot) || (sourceSlot.count ?? 0) <= 1) return;

  const count = Math.max(1, Math.min(Math.floor(amount), sourceSlot.count - 1));
  if (count < 1) return;

  const emptySlot = sourceInventory.items.find((s) => s.name === undefined);
  if (!emptySlot) return;

  const data = {
    fromSlot: sourceSlot,
    toSlot: emptySlot,
    fromType: sourceInventory.type,
    toType: sourceInventory.type,
    count,
  };

  store.dispatch(validateMove({ ...data, fromSlot: sourceSlot.slot, toSlot: emptySlot.slot }));
  store.dispatch(moveSlots(data));
};
