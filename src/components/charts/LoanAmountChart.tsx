
import { useEffect, useState } from "react";
import { useFilters } from "../FiltersContext";
import ReactECharts from "echarts-for-react";
import type { EChartsOption, BarSeriesOption } from "echarts";

const DATA_URL = "https://dsha.blob.core.windows.net/home-loan/loan_data.json";

export default function LoanAmountChart() {
    const [option, setOption] = useState<EChartsOption>({
        title: {
            text: "Loan Amount",
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
            name: "Loan Amount",
            nameLocation: "middle",
            nameTextStyle: { color: "#0c0b0b", fontSize: 16, padding: [25, 0, 0, 0] },
        },
        yAxis: {
            type: "value",
            axisLine: { lineStyle: { color: "#fff" } },
            name: "Count of Loan Amount",
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
                    return true;
                });
                // Group loan amounts into bins of 10,000
                const BIN_SIZE = 10000;
                const binCounts: Record<string, number> = {};
                let minAmount = Infinity;
                let maxAmount = -Infinity;
                filteredLoanData.forEach((item: any) => {
                    let amtStr = String(item.LOAN_AMOUNT || "").replace(/[$,\s]/g, "");
                    const amount = Number(amtStr);
                    if (!isNaN(amount) && amount > 0) {
                        minAmount = Math.min(minAmount, amount);
                        maxAmount = Math.max(maxAmount, amount);
                        const binStart = Math.floor(amount / BIN_SIZE) * BIN_SIZE;
                        const binLabel = `${Math.round(binStart / 1000)}K`;
                        binCounts[binLabel] = (binCounts[binLabel] || 0) + 1;
                    }
                });
                // Fill all bins between BIN_START and maxAmount for smooth histogram
                const sortedBins: string[] = [];
                const counts: number[] = [];
                if (minAmount !== Infinity && maxAmount !== -Infinity) {
                    for (let bin = Math.floor(minAmount / BIN_SIZE) * BIN_SIZE; bin <= maxAmount; bin += BIN_SIZE) {
                        const binLabel = `${Math.round(bin / 1000)}K`;
                        sortedBins.push(binLabel);
                        counts.push(binCounts[binLabel] || 0);
                    }
                }
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

