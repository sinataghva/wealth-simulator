# Project Structure

## File Organization

```
wealth-simulator/
├── index.html              # Vite entry point, root #root div, dark-mode init script
├── src/
│   ├── main.tsx            # React entry: createRoot, StrictMode, imports App + index.css
│   ├── App.tsx             # Root component (renders Index page; no routing in MVP)
│   ├── index.css           # Tailwind directives + global overrides (e.g. number input spinners)
│   ├── lib/
│   │   ├── calculator.ts   # Investment growth calculation (compound then contribution)
│   │   └── utils.ts        # Formatting (fr-FR), currency, numbers, summary sentence
│   ├── components/
│   │   ├── InputField.tsx  # Reusable numeric input (label, prefix/suffix, underline style)
│   │   ├── InvestmentChart.tsx  # Recharts area chart (portfolio + contributions), tooltip, legend
│   │   └── SummaryCard.tsx # Single summary metric (label, value, optional highlight)
│   └── pages/
│       └── Index.tsx       # Main page: state, inputs, chart, summary layout
├── public/                 # Static assets (if any)
├── package.json
├── vite.config.ts          # Vite + React plugin, path alias @ → src/
├── tsconfig.json           # TypeScript project config
├── tsconfig.app.json
├── tsconfig.node.json
├── tailwind.config.ts       # Tailwind content, darkMode: class
├── postcss.config.js
├── investment_app_requirements.md
├── README.md
└── .gitignore
```

## Module Responsibilities

### Entry and root

| File | Role |
|------|------|
| `index.html` | Vite entry; `<div id="root">`; inline script to set `dark` class from `prefers-color-scheme`. |
| `src/main.tsx` | Mounts React app with `createRoot`, wraps in `StrictMode`, imports `App` and `index.css`. |
| `src/App.tsx` | Root component; renders the main page (`Index`). No router in MVP. |
| `src/index.css` | `@tailwind base/components/utilities`; global styles (e.g. hide number input spinners). |

### Library (`src/lib/`)

| File | Role |
|------|------|
| `calculator.ts` | Pure functions: `calculateInvestmentGrowth(initial, monthly, annualReturn, years)`; compound-then-contribution logic; returns `{ chartData, finalValue, totalContributions, totalGains }`. |
| `utils.ts` | `formatCurrency`, `formatNumber`, `formatPercentage` (fr-FR); `generateSummarySentence`; validation/date helpers. |

### Components (`src/components/`)

| Component | Role |
|-----------|------|
| `InputField.tsx` | Controlled number input with label; optional `prefix` (e.g. €) or `suffix` (e.g. years, %); underline styling; responsive. |
| `InvestmentChart.tsx` | Recharts `AreaChart`: two areas (portfolio value, contributions), custom tooltip (year, value, contributions, interest gains), custom legend; Y-axis and tooltip use fr-FR currency. |
| `SummaryCard.tsx` | Displays one metric: label + value; optional `highlight` for primary value (e.g. final portfolio). |

### Pages (`src/pages/`)

| File | Role |
|------|------|
| `Index.tsx` | Main screen: `useState` for initial investment, monthly contribution, duration, annual return; `useMemo` to run calculator; layout: left column (inputs), right column (chart + summary); summary sentence + three `SummaryCard`s. |

## Design Principles

1. **Separation of concerns** – Logic in `lib/`, UI in components and pages.
2. **Pure calculator** – `calculator.ts` has no side effects; easy to test and reuse.
3. **Single responsibility** – Each component and lib module has a clear, narrow role.
4. **Locale** – All user-facing numbers and currency use fr-FR (see `utils.ts` and chart formatting).
5. **Build and deploy** – Vite for dev/build; GitHub Actions used to build and deploy `dist/` to GitHub Pages.

## Migration Note

This project was migrated from a vanilla JS version (HTML + ES modules + Chart.js). The previous structure is described in `COMPARISON.md`. Core logic lives in `src/lib/`; the previous `js/calculator.js` and `js/utils.js` have been replaced by `src/lib/calculator.ts` and `src/lib/utils.ts` with the same responsibilities and fr-FR formatting.
