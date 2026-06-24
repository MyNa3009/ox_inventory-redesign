import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight } from '../../helpers';
import { useAppSelector } from '../../store';
import { useIntersection } from '../../hooks/useIntersection';
import { UIConfig } from '../../store/uiConfig';

const PAGE_SIZE = 30;

const HexIcon: React.FC = () => (
  <svg className="inv-header-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      className="inv-header-icon-hex"
      d="M12 1.6 21 6.8v10.4L12 22.4 3 17.2V6.8z"
    />
    <path
      className="inv-header-icon-glyph"
      d="M8 8.5h8M8 12h8M8 15.5h5"
    />
  </svg>
);

const WeightIcon: React.FC = () => (
  <svg className="inv-weight-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 7V5.5A2.5 2.5 0 0 1 11.5 3h1A2.5 2.5 0 0 1 15 5.5V7h3.2a1 1 0 0 1 .98.8l1.6 11a1 1 0 0 1-.98 1.2H4.2a1 1 0 0 1-.98-1.2l1.6-11A1 1 0 0 1 5.8 7H9Zm2 0h2V5.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V7Z" />
  </svg>
);

const subtitleFor = (type: string): string => {
  switch (type) {
    case 'player':
      return UIConfig.text.pocketsSubtitle;
    case 'shop':
      return UIConfig.text.shopSubtitle;
    case 'crafting':
      return UIConfig.text.craftingSubtitle;
    default:
      return UIConfig.text.otherSubtitle;
  }
};

const InventoryGrid: React.FC<{ inventory: Inventory }> = ({ inventory }) => {
  const weight = useMemo(
    () => (inventory.maxWeight !== undefined ? Math.floor(getTotalWeight(inventory.items) * 1000) / 1000 : 0),
    [inventory.maxWeight, inventory.items]
  );
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  const isBusy = useAppSelector((state) => state.inventory.isBusy);

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);

  const isPlayer = inventory.type === 'player';
  const gridItems = isPlayer ? inventory.items.filter((i) => i.slot > 5) : inventory.items;
  const hotbarItems = isPlayer
    ? inventory.items.filter((i) => i.slot >= 1 && i.slot <= 5).sort((a, b) => a.slot - b.slot)
    : [];

  return (
    <>
      <div
        className={`inventory-grid-wrapper ${isPlayer ? 'player' : 'secondary'}`}
        style={{ pointerEvents: isBusy ? 'none' : 'auto' }}
      >
        {inventory.type === 'player' && <h1 className="inventory-page-title">{UIConfig.text.inventory}</h1>}
        <div>
          <div className="inventory-grid-header-wrapper">
            <div className="inv-header-left">
              <HexIcon />
              <div className="inv-header-titles">
                <p className="inv-header-title">{inventory.label}</p>
                <p className="inv-header-sub">{subtitleFor(inventory.type)}</p>
              </div>
            </div>
            {inventory.maxWeight && (
              <div className="inv-weight-row">
                <WeightIcon />
                <p>
                  {weight / 1000} / {inventory.maxWeight / 1000} kg
                </p>
              </div>
            )}
          </div>
          <WeightBar percent={inventory.maxWeight ? (weight / inventory.maxWeight) * 100 : 0} />
        </div>
        <div className={`inventory-grid-container${isPlayer ? '' : ' secondary'}`} ref={containerRef}>
          <>
            {gridItems.slice(0, (page + 1) * PAGE_SIZE).map((item, index) => (
              <InventorySlot
                key={`${inventory.type}-${inventory.id}-${item.slot}`}
                item={item}
                ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                inventoryType={inventory.type}
                inventoryGroups={inventory.groups}
                inventoryId={inventory.id}
              />
            ))}
          </>
        </div>
        {isPlayer && (
          <div className="inventory-hotbar-section">
            <div className="inventory-grid-header-wrapper">
              <div className="inv-header-left">
                <HexIcon />
                <div className="inv-header-titles">
                  <p className="inv-header-title">{UIConfig.text.hotbar}</p>
                  <p className="inv-header-sub">{UIConfig.text.hotbarSubtitle}</p>
                </div>
              </div>
            </div>
            <div className="inventory-hotbar-row">
              {hotbarItems.map((item) => (
                <InventorySlot
                  key={`hotbar-section-${inventory.id}-${item.slot}`}
                  item={item}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InventoryGrid;
