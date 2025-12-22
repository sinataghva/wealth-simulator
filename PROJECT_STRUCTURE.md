# Project Structure

## File Organization

```
wealth-simulator/
├── index.html                 # Main HTML entry point
├── css/
│   └── styles.css            # Custom styles (if needed beyond Tailwind)
├── js/
│   ├── main.js               # Application entry point, initialization
│   ├── calculator.js         # Investment calculation logic
│   ├── chart.js              # Chart.js wrapper and chart rendering
│   ├── ui.js                 # UI updates, DOM manipulation, event handlers
│   └── utils.js              # Currency formatting, number formatting, helpers
├── assets/                   # Images, icons (if needed)
├── investment_app_requirements.md
├── README.md
└── .gitignore
```

## Module Responsibilities

### `index.html`
- Main HTML structure
- Links to Tailwind CSS (CDN)
- Links to Chart.js (CDN)
- Imports main.js as ES6 module

### `js/main.js`
- Initializes the application
- Sets up event listeners
- Coordinates between modules
- Handles app lifecycle

### `js/calculator.js`
- Pure calculation functions
- Investment growth calculations
- Compound interest logic
- Returns data structures (not DOM manipulation)
- Easy to test and migrate to Svelte

### `js/chart.js`
- Chart.js initialization
- Chart configuration
- Chart update functions
- Chart data transformation

### `js/ui.js`
- DOM element selection
- UI state updates
- Input/slider synchronization
- Summary text generation
- Currency formatting display

### `js/utils.js`
- Currency formatting utilities
- Number formatting
- Date/time helpers
- Validation helpers

## Design Principles

1. **Separation of Concerns**: Logic, UI, and charting are separate
2. **Pure Functions**: Calculator functions are pure (no side effects)
3. **Modular**: Each file has a single responsibility
4. **Svelte-Ready**: Structure mirrors component organization for easy migration
5. **No Build Step**: Uses CDN for Tailwind and Chart.js (can add build later)

## Future Svelte Migration Path

When migrating to Svelte:
- `calculator.js` → `lib/calculator.ts` (reusable)
- `utils.js` → `lib/utils.ts` (reusable)
- `ui.js` → Svelte components (Input.svelte, Summary.svelte, etc.)
- `chart.js` → Chart.svelte component
- `main.js` → App.svelte

