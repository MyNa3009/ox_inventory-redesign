![FiveM® by Cfx re - BlossoMV built with Qbox Project by The Community! 25 06 2026 00_40_22](https://github.com/user-attachments/assets/faa04c03-58c8-42f8-8e4b-4755ca95719c)

<div align="center">

# Blossom Inventory

A modern, fully configurable UI redesign for [ox_inventory](https://github.com/overextended/ox_inventory).
**Free and open source.**

</div>

This resource keeps the full ox_inventory backend (item logic, stashes, shops, crafting, weapons, exports) and replaces the interface with a clean, themeable design plus a built-in player settings menu.

---

## ✨ Features

- **Themeable accent colour** – set any HEX colour, or let players pick their own with a built-in colour picker.
- **8 fonts** – Roboto, Montserrat, Inter, Poppins, Rajdhani, Oswald, Kanit, Orbitron.
- **Item rarity system** – assign items to tiers and choose between three looks: coloured border, diagonal glow, or bottom glow.
- **In-game settings menu** – players adjust font, accent colour, performance, rarity look, slot detail lines, notification position and item-name visibility. Saved per machine (no database needed).
- **Performance presets** – Low / Medium / High let players trade effects for FPS. Low disables glow, particles and animations entirely.
- **Accent glow & corner glow** – soft lighting in your accent colour, with optional drifting particles.
- **Draggable notifications** – players position pickup notifications anywhere on screen.
- **Hotbar section, weight bars, split-with-amount popup, context-menu item preview** and more.
- **Server-controlled permissions** – decide exactly which options players are allowed to change.
- **Fully translatable** – every text lives in `config.lua`.

## Requirements

- [ox_lib](https://github.com/overextended/ox_lib) `3.36.4` or newer
- [oxmysql](https://github.com/overextended/oxmysql)
- A supported framework (ESX / QBox / qb-core) or standalone, same as ox_inventory

## Installation

1. Download the latest release.
2. Make sure the folder is named **`ox_inventory`** (other resources depend on this name).
3. Ensure `ox_lib` starts **before** `ox_inventory`.
4. Add `ensure ox_inventory` to your `server.cfg`.
5. Open `config.lua`, tweak it to your liking, then `restart ox_inventory`.

> All ox_inventory convars and data files work exactly as before – only the interface changed.

## Configuration

Everything visual lives in **`config.lua`** at the root of the resource. Changes apply on `restart ox_inventory` – no rebuild required.

| Section | Controls |
| --- | --- |
| `accent` / `font` | Default colour and font |
| `performance` | Default effect preset (`low` / `medium` / `high`) |
| `text` | Every UI string (translate here) |
| `glow` / `corners` / `particles` | Accent lighting and particles |
| `durability` | Durability bar colours |
| `darkness` / `strokes` | Background dim and empty-slot detail lines |
| `rarityStyle` / `rarities` / `itemRarity` | Rarity look, tiers and item assignments |
| `itemLabels` | Show or hide the item-name label |
| `allow` | Which options players may change in the settings menu |
| `settingsButton` | Position of the settings (gear) button |

### Item rarity

```lua
rarities = {
    common    = '#9AA0A6',
    uncommon  = '#2ECC71',
    rare      = '#3BA7E0',
    epic      = '#9B5CF6',
    legendary = '#E0A53B',
},

itemRarity = {
    lockpick = 'rare',
    -- WEAPON_PISTOL = 'legendary',
}
```

Item names are the same as in `data/items.lua`. Items not listed simply have no rarity styling.

## Building the UI (optional, for developers)

The compiled UI ships in `web/build`, so you only need this if you modify the source in `web/src`.

```bash
cd web
npm install --legacy-peer-deps
npm run build:ui
```

## Credits

- **Base:** [ox_inventory](https://github.com/overextended/ox_inventory) by [Overextended](https://github.com/overextended) – all backend logic and the original UI.
- **Redesign:** BlossomScripts (MyNa3009).

## License

Licensed under the **GNU General Public License v3.0**, the same license as ox_inventory. You are free to use, modify and redistribute it, but any distributed version must remain open source under GPLv3 and keep the credits and copyright notice below. See [`LICENSE`](LICENSE).

### Copyright

Copyright © 2024 Overextended <https://github.com/overextended>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
