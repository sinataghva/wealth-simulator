# Wealth Simulator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern web application for simulating investment growth over time. Calculate how your investments will grow based on initial capital, monthly contributions, expected returns, and duration.

## Features

### MVP Version
- Simple investment growth calculator
- Interactive input fields (Initial Investment, Monthly Contribution, Duration, Annual Return)
- Real-time portfolio value visualization with instant recalculation
- Area chart showing portfolio value and contributions over time (Recharts)
- Summary display with final portfolio value, total contributions, total gains, and summary sentence
- French currency formatting (EUR) with French number formatting (fr-FR)
- Responsive layout and dark mode (follows system preference)

### Advanced Version (Planned)
- Detailed breakdown of contributions vs gains
- Year-by-year breakdown table
- Flexible contribution frequencies

### Pro Version (Planned)
- Multi-asset allocation (Stocks vs Other)
- Asset-specific interest and tax rates
- Withdrawal rate calculations
- Inflation adjustments
- Net future value calculations

## Tech Stack

- **React 18** – UI components and state
- **TypeScript** – Type-safe JavaScript
- **Vite** – Build tool and dev server
- **Tailwind CSS** – Utility-first styling (PostCSS)
- **Recharts** – Area charts for portfolio growth

## Project Structure

```
wealth-simulator/
├── index.html              # Vite entry point
├── src/
│   ├── main.tsx            # React entry point
│   ├── App.tsx             # Root component
│   ├── index.css           # Global styles + Tailwind
│   ├── lib/
│   │   ├── calculator.ts   # Investment calculation logic
│   │   └── utils.ts        # Formatting (fr-FR) and helpers
│   ├── components/
│   │   ├── InputField.tsx
│   │   ├── InvestmentChart.tsx
│   │   └── SummaryCard.tsx
│   └── pages/
│       └── Index.tsx       # Main page
├── public/                 # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.ts
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed documentation.

## Getting Started

### Live Demo

- **Wealth Simulator on GitHub Pages:** https://sinataghva.github.io/wealth-simulator/

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/sinataghva/wealth-simulator.git
   cd wealth-simulator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the app**
   - **Development** (with hot reload):
     ```bash
     npm run dev
     ```
   - **Production build**:
     ```bash
     npm run build
     ```
   - **Preview production build** (serve `dist/` locally):
     ```bash
     npm run preview
     ```

### Deployment

The app is a static SPA. For production:

1. Run `npm run build` to generate the `dist/` folder.
2. Deploy the contents of `dist/` to any static host. This repository uses **GitHub Actions** to build and deploy to GitHub Pages on push to `main`.

## Requirements

See [investment_app_requirements.md](./investment_app_requirements.md) for detailed requirements.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
