# Migration Plan: Vanilla JS → React + Vite

## Overview
Migrate from vanilla JavaScript to React + Vite + TypeScript, inspired by Lovable's implementation but with our requirements (fr-FR locale, correct calculation logic).

## Phase 1: Project Setup

### 1.1 Install Dependencies
- [x] Initialize package.json with Vite + React + TypeScript
- [x] Install core dependencies:
  - `react`, `react-dom`
  - `vite`, `@vitejs/plugin-react-swc`
  - `typescript`
  - `tailwindcss`, `postcss`, `autoprefixer`
  - `recharts` (for charts)
- [x] Install dev dependencies:
  - TypeScript types
  - ~~ESLint~~ (optional, skipped)
  - ~~Tailwind plugins~~ (basic only)

### 1.2 Configuration Files
- [x] Create `vite.config.ts` (simplified, no lovable-tagger)
- [x] Create `tsconfig.json` and related TypeScript configs
- [x] Create `tailwind.config.ts` (simplified, no shadcn colors initially)
- [x] Create `postcss.config.js`
- [x] Create `index.html` (Vite entry point)

### 1.3 Project Structure
```
wealth-simulator/
├── src/
│   ├── main.tsx              # React entry point
│   ├── App.tsx               # Main app component
│   ├── index.css             # Global styles + Tailwind
│   ├── lib/
│   │   ├── calculator.ts     # Migrated from js/calculator.js
│   │   └── utils.ts          # Migrated from js/utils.js (fr-FR)
│   ├── components/
│   │   ├── InputField.tsx    # Input component
│   │   ├── InvestmentChart.tsx # Chart component (Recharts)
│   │   └── SummaryCard.tsx   # Summary card component
│   └── pages/
│       └── Index.tsx         # Main page (like Lovable's)
├── public/                   # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.ts
```

## Phase 2: Code Migration

### 2.1 Migrate Calculator Logic
- [x] Copy `js/calculator.js` → `src/lib/calculator.ts`
- [x] Convert to TypeScript with proper types
- [x] **Fix calculation logic**: Use React's approach (compound first, then add contribution)
  ```typescript
  // Correct: Compound first, then add contribution
  currentValue = currentValue * (1 + monthlyRate) + monthlyContribution;
  ```
- [x] Update to return same data structure as Lovable (year, value, contributions)

### 2.2 Migrate Utils
- [x] Copy `js/utils.js` → `src/lib/utils.ts`
- [x] Convert to TypeScript
- [x] **Ensure fr-FR locale** (not de-DE like Lovable)
- [x] Keep all formatting functions (formatCurrency, formatNumber, formatPercentage)

### 2.3 Create React Components

#### InputField.tsx
- [x] Create reusable input component
- [x] Support prefix (€) and suffix (years, %)
- [x] TypeScript interfaces
- [x] Similar to Lovable's but simpler styling

#### InvestmentChart.tsx
- [x] Use Recharts (AreaChart)
- [x] Show TWO areas: Portfolio value + Contributions
- [x] Custom tooltip showing: Portfolio value, Contributions, Interest gains
- [x] Custom legend
- [x] **Use fr-FR locale** for formatting
- [x] X-axis: Years (integers)
- [x] Y-axis: Portfolio value with € formatting

#### SummaryCard.tsx
- [x] Simple card component for summary values
- [x] Support highlight prop for final portfolio value
- [x] TypeScript interfaces

### 2.4 Create Main Page (Index.tsx)
- [x] Use React hooks: `useState` for all inputs
- [x] Use `useMemo` for calculations (automatic recalculation)
- [x] Layout: Left (inputs), Right (chart + summary)
- [x] Use fr-FR formatting throughout
- [x] Summary sentence at top (like Lovable)
- [x] Three summary cards in grid

### 2.5 App Setup
- [x] Create `App.tsx` (simple, no routing needed for MVP)
- [x] Create `main.tsx` (React entry point)
- [x] Set up global styles with Tailwind

## Phase 3: Styling & UI

### 3.1 Tailwind Configuration
- [x] Simplified Tailwind config (no shadcn colors initially)
- [x] Basic dark mode support
- [x] Custom colors if needed

### 3.2 Component Styling
- [x] Style InputField (underline style like current)
- [x] Style chart container
- [x] Style summary cards
- [x] Responsive design (mobile-friendly)

## Phase 4: Documentation Updates

### 4.1 README.md
- [x] Update tech stack section (React + Vite + TypeScript)
- [x] Update "Getting Started" with build instructions:
  ```bash
  npm install
  npm run dev    # Development
  npm run build  # Production build
  npm run preview # Preview production build
  ```
- [x] Remove "no build step" mentions
- [x] Update project structure
- [x] Add build/deployment instructions

### 4.2 PROJECT_STRUCTURE.md
- [x] Update with new React structure
- [x] Document component responsibilities
- [x] Update migration path section

### 4.3 Other Docs
- [x] Update investment_app_requirements.md if needed
- [x] Keep COMPARISON.md for reference

## Phase 5: GitHub Actions Setup

### 5.1 GitHub Actions Workflow
- [x] Create `.github/workflows/deploy.yml`
- [x] Configure to:
  - Trigger on push to `main` branch
  - Install Node.js and dependencies
  - Run `npm run build`
  - Deploy `dist/` folder to GitHub Pages using `peaceiris/actions-gh-pages`
- [x] Test workflow runs successfully

### 5.2 GitHub Pages Configuration
- [x] GitHub Pages source set to "Deploy from a branch" → `gh-pages` / `/ (root)`
- [x] Verify deployment works automatically on push
- [x] App is live at https://sinataghva.github.io/wealth-simulator/

## Phase 6: Cleanup

### 6.1 Remove Old Files
- [ ] Delete `js/` directory (calculator, chart, ui, utils, main)
- [ ] Delete `css/styles.css` (replaced by Tailwind)
- [ ] Delete old `index.html` (replaced by Vite's)
- [ ] Keep `assets/` if needed

### 6.2 Remove Migration Docs
- [ ] Delete `COMPARISON.md` (no longer needed)
- [ ] Delete `MIGRATION_PLAN.md` (no longer needed)
- [ ] Mention migration details in final commit message

### 6.3 Update .gitignore
- [x] `node_modules/` already ignored
- [x] `dist/` already ignored
- [x] `.env` files already ignored

## Phase 7: Testing & Verification

### 7.1 Functionality
- [x] Test all inputs update correctly
- [x] Verify calculations match expected results
- [x] Test chart displays correctly (two areas)
- [x] Verify fr-FR formatting throughout
- [x] Test responsive design

### 7.2 Build & Deploy
- [x] `npm run build` works
- [x] GitHub Actions workflow builds and deploys on push to main
- [x] GitHub Pages live at https://sinataghva.github.io/wealth-simulator/

## Key Differences from Lovable

1. **Locale**: fr-FR (not de-DE)
2. **Calculation**: Compound first, then add (same as Lovable - correct)
3. **Simplified**: No shadcn/ui initially (can add later if needed)
4. **No routing**: Single page app (no React Router)
5. **No extra dependencies**: Keep it minimal (no react-query, etc.)

## Migration Strategy

1. **Keep old code** until migration is complete and tested
2. **Migrate incrementally**: Calculator → Utils → Components → Page
3. **Test after each phase**
4. **Update docs as we go**

## Estimated File Changes

- **New files**: ~15-20 files (React components, configs) + `.github/workflows/deploy.yml`
- **Modified files**: README.md, PROJECT_STRUCTURE.md, .gitignore
- **Deleted files**: ~5 files (old JS files) + COMPARISON.md + MIGRATION_PLAN.md (after completion)

## Future Improvements

- [ ] **Switch to GitHub Actions Pages source** (official method): replace `peaceiris/actions-gh-pages` with `actions/upload-pages-artifact` + `actions/deploy-pages`; change Pages source to "GitHub Actions" — eliminates the `gh-pages` branch and gives per-run deployment history.
- [ ] Add `npm run preview` step to CI for smoke testing before deploy.
- [ ] Run `npm audit fix` to resolve moderate vulnerability.

## Success Criteria

- ✅ App works identically to current version (functionality)
- ✅ Better UI (like Lovable's)
- ✅ Chart shows contributions + gains
- ✅ fr-FR formatting throughout
- ✅ Build process works
- ✅ Documentation updated
- ✅ GitHub Pages deployment works

