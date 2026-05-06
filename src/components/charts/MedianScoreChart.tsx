
import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption, BarSeriesOption } from "echarts";
import { useFilters } from "../FiltersContext";
import FiltersPanel from "../FiltersPanel";

const DATA_URL = "https://dsha.blob.core.windows.net/home-loan/loan_data.json";

export default function MedianScoreChart() {
  
  const [option, setOption] = useState<EChartsOption>({
    title: {
      text: "Median Credit Score",
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
      name: "Median Credit Score",
      nameLocation: "middle",
      nameTextStyle: { color: "#0c0b0b", fontSize: 16, padding: [25, 0, 0, 0] },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#fff" } },
      name: "Count of Median Credit Score",
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

          // Debug: Log current filters
          console.log('[MedianScoreChart] Current filters:', JSON.stringify(filters));

          // Debug: Log unique RACE_CATEGORY values in data
          const uniqueRaces = Array.from(new Set(loanData.map((item: any) => item.RACE_CATEGORY)));
          console.log('[MedianScoreChart] Unique RACE_CATEGORY values in data:', uniqueRaces);



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
          return true;
        });



          // Debug: Log filtered data length and sample
          console.log('[MedianScoreChart] Filtered loan data count:', filteredLoanData.length);
          if (filteredLoanData.length > 0) {
            console.log('[MedianScoreChart] Sample filtered item:', filteredLoanData[0]);
          }










        // Group scores into bins of 5
        const BIN_SIZE = 5;
        const binCounts: Record<string, number> = {};
        filteredLoanData.forEach((item: any) => {
          const score = Number(item.MEDIAN_CREDIT_SCORE);
          if (!isNaN(score)) {
            const binStart = Math.floor(score / BIN_SIZE) * BIN_SIZE;
            const binLabel = `${binStart}`;
            binCounts[binLabel] = (binCounts[binLabel] || 0) + 1;
          }
        });
        // Sort bins numerically by bin start
        const sortedBins = Object.keys(binCounts)
          .map(label => ({
            label,
            start: Number(label.split(' - ')[0])
          }))
          .sort((a, b) => a.start - b.start)
          .map(b => b.label);
        const counts = sortedBins.map(bin => binCounts[bin]);
        setOption((prev) => {
          const prevSeries = Array.isArray(prev.series) ? prev.series : [];
          return {
            ...prev,
            xAxis: { ...prev.xAxis, data: sortedBins },
            series: [
              {
                ...(prevSeries[0] as BarSeriesOption || { name: "Count", type: "bar", itemStyle: { color: "#4A90E2" } }),
                data: counts,
              },
            ],
          };
        });
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
    <ReactECharts
      option={option}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: 'canvas', width: 'auto', height: 'auto' }}
      notMerge={true}
      lazyUpdate={true}
      autoResize={true}
    />
  );
}

