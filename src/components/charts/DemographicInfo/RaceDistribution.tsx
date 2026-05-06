
import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { useFilters } from "../../FiltersContext";
import type { EChartsOption, BarSeriesOption } from "echarts";

const DATA_URL = "https://dsha.blob.core.windows.net/home-loan/loan_data.json";

export default function RaceDistributionChart() {
  const [option, setOption] = useState<EChartsOption>({
    title: {
      text: "Race Distribution",
      left: "center",
      textStyle: {
        color: "#111111",
        fontSize: 18,
      },
    },
    tooltip: { trigger: "item" },
    xAxis: {
      type: "category",
      data: [],
      axisLine: { lineStyle: { color: "#fff" } },
      name: "Race",
      nameLocation: "middle",
      nameTextStyle: { color: "#0c0b0b", fontSize: 16, padding: [25, 0, 0, 0] },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#fff" } },
      name: "Count of Race Categories",
      nameLocation: "middle",
      nameTextStyle: { color: "#0c0b0b", fontSize: 16, padding: [0, 0, 35, 0] },
    },
    series: [
      {
        name: "Count",
        type: "bar",
        data: [],
        itemStyle: { color: "#4A90E2" },
      } as BarSeriesOption,
    ],
  });
  const { filters } = useFilters();

  useEffect(() => {
    const loadLoanJSONData = async () => {
      try {
        const loan = await fetch(DATA_URL);
        const loanData = await loan.json();

        // Apply filters (same logic as MedianScoreChart)
        const filteredLoanData = loanData.filter((item: any) => {
          // Female Head Of Household
          if (filters.femaleHeadOfHousehold.length && !filters.femaleHeadOfHousehold.includes("all")) {
            const val = String(item.FEMALE_HEAD_OF_HOUSEHOLD).toLowerCase();
            if (!filters.femaleHeadOfHousehold.map(v => v.toLowerCase()).includes(val)) return false;
          }
          // First Time Homebuyer
          if (filters.firstTimeHomebuyer.length && !filters.firstTimeHomebuyer.includes("all")) {
            const val = String(item.FIRST_TIME_HOMEBUYER_demo).toLowerCase();
            if (!filters.firstTimeHomebuyer.map(v => v.toLowerCase()).includes(val)) return false;
          }
          // Race
          if (filters.race.length && !filters.race.includes("all")) {
            const val = String(item.RACE_CATEGORY).toLowerCase();
            if (!filters.race.map(v => v.toLowerCase()).includes(val)) return false;
          }
          // County
          if (filters.county.length && !filters.county.includes("all")) {
            const val = String(item.COUNTY_CODE_DESC).toLowerCase();
            if (!filters.county.map(v => v.toLowerCase()).includes(val)) return false;
          }
          // Age at Application (bin)
          const age = Number(item.AGE_AT_APPLICATION);
          if (isNaN(age) || age < filters.ageAtApplication[0] || age > filters.ageAtApplication[1]) return false;
          return true; // Include item if it passes all filters
        });


        // Count by DPA_DESCRIPTION
        const typeCounts: Record<string, number> = {};
        filteredLoanData.forEach((item: any) => {
          const type = item.RACE_CATEGORY;
          if (type) {
            typeCounts[type] = (typeCounts[type] || 0) + 1;
          }
        });
        const sortedTypes = Object.keys(typeCounts).sort();
        const counts = sortedTypes.map(type => typeCounts[type]);
        // Assign a different color to each bar
        const colorPalette = [
          '#4A90E2', '#71e1c9', '#B8E986', '#F5A623', '#c24856', '#7126b3', '#dd4a98', '#0e19b7', '#b873d3'
        ];
        const coloredData = counts.map((count, idx) => ({
          value: count,
          itemStyle: { color: colorPalette[idx % colorPalette.length] }
        }));
        setOption((prev) => {
          const prevSeries = Array.isArray(prev.series) ? prev.series : [];
          return {
            ...prev,
            xAxis: { ...prev.xAxis, data: sortedTypes },
            series: [
              {
                ...(prevSeries[0] as BarSeriesOption || { name: "Count", type: "bar" }),
                data: coloredData,
              },
            ],
          };
        });
        // ...existing code...
      } catch (err) {
        // Optionally handle error
        setOption((prev) => ({
          ...prev,
          title: { ...prev.title, text: "Failed to load data" },
        }));
      }
    };
    loadLoanJSONData();
  }, [filters]);

  return (
    <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', minHeight: 350 }}>
      <ReactECharts
        option={option}
        style={{ height: '45vw', maxHeight: 420, minHeight: 300, width: '100%' }}
        opts={{ renderer: 'canvas', width: 'auto', height: 'auto' }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
}

