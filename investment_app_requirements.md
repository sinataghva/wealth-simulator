# Investment Web App Requirements

## 1. MVP Version

### Purpose
A simple simulator that shows how an investment grows over time based on initial capital, monthly contributions, expected annual return, and duration.

### Layout
- Left: input fields  
- Right: one chart (top), summary text and recap numbers (bottom)  

### Inputs
- Initial investment  
- Monthly contribution  
- Investment duration (years)  
- Annual return (percent)  

### Outputs
- Final portfolio value  
- Total contributions  
- Total gains  
- Summary sentence  
- Area chart: years on x-axis; portfolio value and total contributions (two areas), fr-FR formatting  

---

## 2. Advanced Version

### Additional Outputs
- Split between contributions and gains  
- Stacked area chart or two line series  
- Breakdown table (year, balance, contributions, gains)  

### Additional Inputs
- Contribution frequency (monthly or yearly)  
- Display of compounding frequency (fixed monthly compounding)

---

## 3. Pro Version (Screenshot Inspired)

### Allocations
- Current wealth allocation (Stocks vs Other)  
- Contribution allocation (Stocks vs Other)

### Asset Specific Parameters
- Interest rate Stocks  
- Interest rate Other  
- Tax rate Stocks  
- Tax rate Other  

### Withdrawal and Income
- Withdrawal rate  
- Computed monthly income at withdrawal  
- Gross and net future value  

### Inflation
- Inflation rate input  
- Display future value and income in today's money

### Graph Enhancements
- Current wealth  
- Contributions  
- Interests  
- Combined stacked or multi line chart  

### Summary Block
- Future value  
- Included capital gains  
- Net future value  
- Monthly income  

---

## 4. Non Functional Requirements

- Single page layout  
- Instant recalculation on input change  
- Clean modern UI; dark mode follows system preference  
- Currency: EUR (fixed, French formatting — fr-FR)  

---

## 5. Implementation Note (MVP)

The current MVP is implemented with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Recharts**. See [README.md](./README.md) and [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for build and run instructions.
