import InventoryComponent from './components/inventory';
import useNuiEvent from './hooks/useNuiEvent';
import { Items } from './store/items';
import { Locale } from './store/locale';
import { setImagePath } from './store/imagepath';
import { setupInventory } from './store/inventory';
import { Inventory } from './typings';
import { useAppDispatch } from './store';
import { debugData } from './utils/debugData';
import { UIConfig } from './store/uiConfig';
import { setRarityStyle } from './store/ui';
import { applyUIConfig } from './utils/applyUIConfig';
import DragPreview from './components/utils/DragPreview';
import { fetchNui } from './utils/fetchNui';
import { useDragDropManager } from 'react-dnd';
import KeyPress from './components/utils/KeyPress';

debugData([
  {
    action: 'setupInventory',
    data: {
      leftInventory: {
        id: 'test',
        type: 'player',
        slots: 50,
        label: 'Bob Smith',
        weight: 3000,
        maxWeight: 5000,
        items: [
          {
            slot: 1,
            name: 'iron',
            weight: 3000,
            metadata: {
              description: `name: Svetozar Miletic  \n Gender: Male`,
              ammo: 3,
              mustard: '60%',
              ketchup: '30%',
              mayo: '10%',
            },
            count: 5,
          },
          { slot: 2, name: 'powersaw', weight: 0, count: 1, metadata: { durability: 75 } },
          { slot: 3, name: 'copper', weight: 100, count: 12, metadata: { type: 'Special' } },
          {
            slot: 4,
            name: 'water',
            weight: 100,
            count: 1,
            metadata: { description: 'Generic item description' },
          },
          { slot: 5, name: 'water', weight: 100, count: 1 },
          {
            slot: 6,
            name: 'backwoods',
            weight: 100,
            count: 1,
            metadata: {
              label: 'Russian Cream',
              imageurl: 'https://i.imgur.com/2xHhTTz.png',
            },
          },
        ],
      },
      rightInventory: {
        id: 'shop',
        type: 'crafting',
        slots: 5000,
        label: 'Bob Smith',
        weight: 3000,
        maxWeight: 5000,
        items: [
          {
            slot: 1,
            name: 'lockpick',
            weight: 500,
            price: 300,
            ingredients: {
              iron: 5,
              copper: 12,
              powersaw: 0.1,
            },
            metadata: {
              description: 'Simple lockpick that breaks easily and can pick basic door locks',
            },
          },
        ],
      },
    },
  },
]);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const manager = useDragDropManager();

  useNuiEvent<{
    locale: { [key: string]: string };
    items: typeof Items;
    leftInventory: Inventory;
    imagepath: string;
  }>('init', ({ locale, items, leftInventory, imagepath }) => {
    for (const name in locale) Locale[name] = locale[name];
    for (const name in items) Items[name] = items[name];

    setImagePath(imagepath);
    dispatch(setupInventory({ leftInventory }));
  });

  useNuiEvent<Partial<typeof UIConfig>>('setUIConfig', (data) => {
    if (data.accent) UIConfig.accent = data.accent;
    if (data.font) UIConfig.font = data.font;
    if (data.performance) UIConfig.performance = data.performance;
    if (data.notification) Object.assign(UIConfig.notification, data.notification);
    if (data.glow) Object.assign(UIConfig.glow, data.glow);
    if (typeof data.darkness === 'number') UIConfig.darkness = data.darkness;
    if (data.strokes) Object.assign(UIConfig.strokes, data.strokes);
    if (data.corners) Object.assign(UIConfig.corners, data.corners);
    if (data.particles) Object.assign(UIConfig.particles, data.particles);
    if (data.settingsButton) Object.assign(UIConfig.settingsButton, data.settingsButton);
    if (data.rarityStyle) {
      UIConfig.rarityStyle = data.rarityStyle;
      dispatch(setRarityStyle(data.rarityStyle));
    }
    if (data.rarities) Object.assign(UIConfig.rarities, data.rarities);
    if (data.itemRarity) Object.assign(UIConfig.itemRarity, data.itemRarity);
    if (typeof data.itemLabels === 'boolean') UIConfig.itemLabels = data.itemLabels;
    if (data.allow) Object.assign(UIConfig.allow, data.allow);
    if (data.durability) Object.assign(UIConfig.durability, data.durability);
    if (data.text) Object.assign(UIConfig.text, data.text);
    applyUIConfig();
  });

  fetchNui('uiLoaded', {});

  useNuiEvent('closeInventory', () => {
    manager.dispatch({ type: 'dnd-core/END_DRAG' });
  });

  return (
    <div className="app-wrapper">
      <InventoryComponent />
      <DragPreview />
      <KeyPress />
    </div>
  );
};

addEventListener('dragstart', function (event) {
  event.preventDefault();
});

export default App;
