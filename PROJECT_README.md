# DSHA Loan Dashboard

A data dashboard built with React, TypeScript, and Vite for visualizing Delaware home loan data. The dashboard provides interactive charts and filters to explore loan characteristics, demographics, and more.

---

## Features

- **Interactive Charts**: Visualize loan data by amount, type, DPA description, median credit score, and demographic breakdowns.
- **Dynamic Filtering**: Filter all charts by female head of household, first-time homebuyer, race, age at application, and county.
- **Responsive UI**: Modern, responsive layout using Tailwind CSS.
- **Single Source of Truth for Filters**: All charts and the filter panel share a single context, ensuring consistent filtering across the dashboard.
- **Navigation**: Sidebar navigation for switching between different chart views.

---

## Project Structure

```
DSHA-Loan-Dashboard/
├── public/                # Static assets
├── src/
│   ├── components/
│   │   ├── charts/        # All chart components (LoanAmountChart, LoanTypeChart, DPAChart, MedianScoreChart, DemographicInfoLayout, etc.)
│   │   ├── FiltersContext.tsx  # React context for global filter state
│   │   ├── FiltersPanel.tsx    # Sidebar filter UI
│   │   ├── Header.tsx
│   │   ├── NavSidebar.tsx
│   │   └── Tooltip.tsx
│   │   └── charts/DemographicInfo/ # Demographic Info charts (AgeofApplication, County, FemaleHeadHousehold, RaceDistribution)
│   ├── App.tsx            # Main app layout and routing
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles (Tailwind)
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── tsconfig*.json
└── README.md
```

---

## Main Components

### 1. FiltersContext

- Provides a global context for all filter state.
- Used by both the FiltersPanel and all chart components.
- Ensures that changing a filter updates all charts in real time.

### 2. FiltersPanel

- Sidebar UI for selecting filters.
- Options for female head of household, first-time homebuyer, race, age at application (slider), and county.
- Updates the global filter context.

### 3. Charts

- **LoanAmountChart**: Histogram of loan amounts, binned and filtered.
- **LoanTypeChart**: Bar chart of loan types, filtered.
- **DPAChart**: Bar chart of DPA descriptions, filtered.
- **MedianScoreChart**: Histogram of median credit scores, filtered.
- **DemographicInfoLayout**: Grid of demographic charts (age, race, county, female head of household).

#### Demographic Info Charts

- **AgeofApplication**: Distribution of applicants' ages at the time of application.
- **County**: Loan distribution by county.
- **FemaleHeadHousehold**: Loans by female head of household status.
- **RaceDistribution**: Loan distribution by race.

All Demographic Info charts:
- Are located in `src/components/charts/DemographicInfo/`.
- Use the global filter context for dynamic updates.
- Are displayed together in the DemographicInfoLayout grid.

All charts:
- Fetch data from a remote JSON endpoint.
- Apply the current filters from context.
- Update automatically when filters change.

### 4. Navigation

- **NavSidebar**: Lets users switch between chart views.
- **Header**: App title and About dialog.

---

## Data Source

- All charts fetch data from:  
  `https://dsha.blob.core.windows.net/home-loan/loan_data.json`

---

## Setup & Usage

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Install dependencies

```bash
npm install
# or
yarn install
```

### Start development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
# or
yarn build
```

### Lint

```bash
npm run lint
```

---

## Customization

- **Add new filters**: Update `FiltersContext.tsx` and `FiltersPanel.tsx`.
- **Add new charts**: Create a new chart component in `src/components/charts/`, use `useFilters()` to access filter state, and add a route in `App.tsx`.
- **Styling**: Uses Tailwind CSS, configured in `tailwind.config.js`.

---

## Dependencies

- React 19
- TypeScript
- Vite
- echarts & echarts-for-react
- Tailwind CSS
- React Router DOM
- @base-ui/react (for dialogs/tooltips)
- lucide-react (icons)
- ESLint (with recommended configs)

---

## License

This project is for demonstration and educational purposes.
