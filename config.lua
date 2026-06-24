-- ox_inventory UI configuration
-- Author: Myna3009 - BlossomScripts
--
-- Adjust the colours, fonts, texts and effects below, then run:
--   restart ox_inventory
-- Changes apply instantly, no UI rebuild required.

UIConfig = {
    -- Accent colour (HEX).
    -- Examples: '#A6CC34' green | '#3BA7E0' blue | '#9B5CF6' purple | '#E0A53B' gold | '#FF0062' pink
    accent = '#FF0062',

    -- Font: 'default' (Roboto), 'montserrat', 'inter', 'poppins', 'rajdhani', 'oswald', 'kanit', 'orbitron'
    font = 'default',

    -- Performance preset (default for players, can be overridden in the in-game settings menu)
    -- 'low'    = best performance: no glow, no particles, no animations
    -- 'medium' = balanced: glow + corner glow, no particles
    -- 'high'   = all effects: glow, corner glow, particles, animations
    performance = 'high',

    -- Position of the settings (gear) button, in pixels from the top/right edge
    settingsButton = { top = 90, right = 25 },

    -- Interface texts / translations
    text = {
        inventory = 'Inventory',                      -- large title (top left)
        pocketsSubtitle = 'Items on your character',  -- player inventory subtitle
        otherSubtitle = 'Store necessary assets',     -- stash / trunk subtitle
        shopSubtitle = 'Purchase available goods',    -- shop subtitle
        craftingSubtitle = 'Craft new items',         -- crafting subtitle
        hotbar = 'Hotbar',                            -- hotbar section title
        hotbarSubtitle = 'Quickly equip your items',  -- hotbar section subtitle

        -- settings menu
        settingsTitle = 'Settings',
        settingsFont = 'Font',
        settingsColor = 'Accent colour',
        settingsPerformance = 'Performance',
        settingsPerf_low = 'Low',
        settingsPerf_medium = 'Medium',
        settingsPerf_high = 'High',
        settingsStrokes = 'Slot detail lines',
        settingsNotification = 'Notifications',
        settingsKeybinds = 'Keybinds',
        settingsKeybindHint = 'Change in Settings -> Key Bindings (pause menu)',
        settingsNotifEdit = 'Edit position',
        notifEditorHint = 'Drag the notification to position it',
        save = 'Save',
        cancel = 'Cancel',
        settingsRarity = 'Rarity style',
        rarityBorder = 'Border',
        rarityGlow = 'Glow',
        rarityBottom = 'Bottom',
        raritySoft = 'Soft',
        settingsItemLabels = 'Item names',
    },

    -- Accent coloured glow
    glow = {
        enabled = true,    -- true / false
        strength = 1.6,    -- 0.5 subtle | 1.0 normal | 2.0 strong
    },

    -- Durability bar colours (HEX)
    durability = {
        low = '#E74C3C',     -- low / almost broken
        medium = '#E0A53B',  -- medium
        high = '#2ECC71',    -- high / new
    },

    -- Default notification position as screen percentage (x/y 0-100).
    -- Players can drag-reposition it in the settings menu.
    notification = { x = 50, y = 80 },

    -- Background dimming (0.0 = none, 1.0 = fully black)
    darkness = 0.8,

    -- Detail lines drawn inside empty slots
    strokes = {
        enabled = true,
        gap = 9,             -- spacing between the lines (px)
        height = 34,         -- height of the outer lines (%)
        middleHeight = 46,   -- height of the (slightly taller) middle line (%)
    },

    -- Show the item name label (the transparent box at the bottom of each slot)
    itemLabels = true,

    -- Which options players are allowed to change in the settings menu (true = allowed)
    allow = {
        font = true,
        accent = true,
        performance = true,
        rarity = true,
        strokes = true,
        notification = true,
        itemLabels = true,
    },

    -- Corner glow: which corners the accent glow bleeds out of
    corners = {
        topLeft = true,
        topRight = false,
        bottomLeft = false,
        bottomRight = true,
    },

    -- Floating particles drifting inside the active glow corners
    particles = {
        enabled = false,     -- true / false
        count = 6,           -- particles per active corner
        speed = 1.0,         -- 0.5 slow | 1.0 normal | 2.0 fast
    },

    -- ── Item rarity system ─────────────────────────────────────
    -- Rarity look (players can switch in the settings menu):
    -- 'border' = coloured border  |  'glow' = diagonal glow  |  'bottom' = glow filling the bottom  |  'soft' = subtle low glow behind the name
    rarityStyle = 'bottom',

    -- STEP 1: define the rarity tiers and their colours (HEX). Add/remove freely.
    rarities = {
        common    = '#9AA0A6',
        uncommon  = '#2ECC71',
        rare      = '#3BA7E0',
        epic      = '#9B5CF6',
        legendary = '#E0A53B',
    },

    -- STEP 2: assign items to a tier. Key = item name (as in ox_inventory items),
    --         value = tier name from above. Items not listed get no rarity border.
    --         Coloured border always shows; the glow scales with the performance preset.
    itemRarity = {
        -- examples (change or remove these):
        water     = 'common',
        copper    = 'uncommon',
        lockpick  = 'rare',
        powersaw  = 'epic',
        iron      = 'legendary',
    },
}
