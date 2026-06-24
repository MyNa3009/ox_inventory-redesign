export const UIConfig: {
  accent: string;
  font: string;
  performance: string;
  notification: { x: number; y: number };
  glow: { enabled: boolean; strength: number };
  durability: { low: string; medium: string; high: string };
  darkness: number;
  strokes: { enabled: boolean; gap: number; height: number; middleHeight: number };
  corners: { topLeft: boolean; topRight: boolean; bottomLeft: boolean; bottomRight: boolean };
  particles: { enabled: boolean; count: number; speed: number };
  settingsButton: { top: number; right: number };
  rarityStyle: string;
  rarities: { [tier: string]: string };
  itemRarity: { [item: string]: string };
  itemLabels: boolean;
  allow: {
    font: boolean;
    accent: boolean;
    performance: boolean;
    rarity: boolean;
    strokes: boolean;
    notification: boolean;
    itemLabels: boolean;
  };
  text: { [key: string]: string };
} = {
  accent: '#FF0062',
  font: 'default',
  performance: 'high',
  notification: { x: 50, y: 80 },
  glow: { enabled: true, strength: 1 },
  durability: { low: '#E74C3C', medium: '#E0A53B', high: '#2ECC71' },
  darkness: 0.6,
  strokes: { enabled: true, gap: 9, height: 34, middleHeight: 46 },
  corners: { topLeft: true, topRight: false, bottomLeft: false, bottomRight: true },
  particles: { enabled: false, count: 6, speed: 1 },
  settingsButton: { top: 90, right: 25 },
  rarityStyle: 'bottom',
  rarities: {},
  itemRarity: {},
  itemLabels: true,
  allow: {
    font: true,
    accent: true,
    performance: true,
    rarity: true,
    strokes: true,
    notification: true,
    itemLabels: true,
  },
  text: {
    inventory: 'Inventory',
    pocketsSubtitle: 'Items on your character',
    otherSubtitle: 'Store necessary assets',
    shopSubtitle: 'Purchase available goods',
    craftingSubtitle: 'Craft new items',
    hotbar: 'Hotbar',
    hotbarSubtitle: 'Quickly equip your items',
    settingsTitle: 'Settings',
    settingsFont: 'Font',
    settingsColor: 'Accent colour',
    settingsPerformance: 'Performance',
    settingsPerf_low: 'Low',
    settingsPerf_medium: 'Medium',
    settingsPerf_high: 'High',
    settingsStrokes: 'Slot detail lines',
    settingsNotification: 'Notifications',
    settingsKeybinds: 'Keybinds',
    settingsKeybindHint: 'Change in Settings -> Key Bindings (pause menu)',
    settingsNotifEdit: 'Edit position',
    notifEditorHint: 'Drag the notification to position it',
    save: 'Save',
    cancel: 'Cancel',
    settingsRarity: 'Rarity style',
    rarityBorder: 'Border',
    rarityGlow: 'Glow',
    rarityBottom: 'Bottom',
    raritySoft: 'Soft',
    settingsItemLabels: 'Item names',
  },
};
