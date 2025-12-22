# Wealth Simulator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern web application for simulating investment growth over time. Calculate how your investments will grow based on initial capital, monthly contributions, expected returns, and various financial parameters.

## Features

### MVP Version
- Simple investment growth calculator
- Interactive input fields (Initial Investment, Monthly Contribution, Duration, Annual Return)
- Real-time portfolio value visualization with instant recalculation
- Line chart showing growth over time (years on x-axis, portfolio value on y-axis)
- Summary display with final portfolio value, total contributions, total gains, and summary sentence
- French currency formatting (EUR) with French number formatting

### Advanced Version (Planned)
- Detailed breakdown of contributions vs gains
- Stacked area charts
- Year-by-year breakdown table
- Flexible contribution frequencies

### Pro Version (Planned)
- Multi-asset allocation (Stocks vs Other)
- Asset-specific interest and tax rates
- Withdrawal rate calculations
- Inflation adjustments
- Net future value calculations

## Tech Stack

- **HTML5** - Semantic markup
- **Vanilla JavaScript (ES6 Modules)** - No framework overhead, easy to migrate to Svelte later
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Chart.js** - Powerful charting library for visualizations

### Why This Stack?

- **No build step required** - Works directly in the browser
- **Lightweight** - Fast loading, minimal dependencies
- **Svelte-ready** - Modular structure makes future migration to Svelte + Vite straightforward
- **Modern** - Uses ES6 modules for clean code organization

## Project Structure

```
wealth-simulator/
├── index.html                 # Main HTML entry point
├── css/
│   └── styles.css            # Custom styles
├── js/
│   ├── main.js               # Application entry point
│   ├── calculator.js         # Investment calculation logic
│   ├── chart.js              # Chart.js wrapper and rendering
│   ├── ui.js                 # UI updates and DOM manipulation
│   └── utils.js              # Currency formatting and helpers
├── assets/                   # Images, icons (if needed)
└── investment_app_requirements.md
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed structure documentation.

## Getting Started

1. Clone the repository
2. Open `index.html` in a modern web browser
3. No build step or installation required!

The app uses CDN links for Tailwind CSS and Chart.js, so it works immediately.

## Requirements

See [investment_app_requirements.md](./investment_app_requirements.md) for detailed requirements.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
