import React from "react";
import { useFilters } from "./FiltersContext";

type CheckboxOption = {
  label: string;
  value: string;
};

type FilterSectionProps = {
  title: string;
  options: CheckboxOption[];
  value: string[];
  onChange: (val: string[]) => void;
};

function FilterSection({ title, options, value, onChange }: FilterSectionProps) {
  const handleCheck = (checked: boolean, val: string) => {
    if (checked) {
      onChange([...value, val]);
    } else {
      onChange(value.filter((v) => v !== val));
    }
  };
  return (
    <div className="space-y-3">
      <h3 className="text-[18px] font-semibold text-gray-300">
        {title}
      </h3>
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-3 text-[16px] text-white"
          >
            <input
              type="checkbox"
              value={opt.value}
              checked={value.includes(opt.value)}
              onChange={e => handleCheck(e.target.checked, opt.value)}
              className="h-5 w-5 accent-blue"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function FiltersPanel() {
  const { filters, setFilters } = useFilters();
  return (
    <aside className="w-[320px] min-h-screen bg-[#002452] p-6 space-y-8 w-fit overflow-y-auto">
      <FilterSection
        title="Female Head Of Household"
        options={[
          { label: "(All)", value: "all" },
          { label: "Null", value: "null" },
          { label: "False", value: "false" },
          { label: "True", value: "true" },
        ]}
        value={filters.femaleHeadOfHousehold}
        onChange={vals => setFilters(f => ({ ...f, femaleHeadOfHousehold: vals }))}
      />
      <FilterSection
        title="First Time Homebuyer"
        options={[
          { label: "(All)", value: "all" },
          { label: "Null", value: "null" },
          { label: "False", value: "false" },
          { label: "True", value: "true" },
        ]}
        value={filters.firstTimeHomebuyer}
        onChange={vals => setFilters(f => ({ ...f, firstTimeHomebuyer: vals }))}
      />
      <FilterSection
        title="Race"
        options={[
          { label: "(All)", value: "all" },
          { label: "Null", value: "null" },
          { label: "ASIAN", value: "asian" },
          { label: "BLACK", value: "black" },
          { label: "INDIAN_ALASKA_NATIVE", value: "indian_alaska_native" },
          { label: "MIXED", value: "mixed" },
          { label: "NATIVE_HAWAIIAN", value: "native_hawaiian" },
          { label: "UNKNOWN", value: "unknown" },
          { label: "WHITE", value: "white" },
        ]}
        value={filters.race}
        onChange={vals => setFilters(f => ({ ...f, race: vals }))}
      />
      <div className="space-y-3">
        <h3 className="text-[18px] font-semibold text-white">Age At Application (bin)</h3>
        <div className="flex items-center justify-between text-sm text-gray-200">
          <span>0</span>
          <span>97</span>
        </div>
        <input
          type="range"
          min={0}
          max={97}
          value={filters.ageAtApplication[1]}
          onChange={e => setFilters(f => ({ ...f, ageAtApplication: [0, Number(e.target.value)] }))}
          className="w-full accent-blue"
        />
      </div>
      <FilterSection
        title="County"
        options={[
          { label: "(All)", value: "all" },
          { label: "Null", value: "null" },
          { label: "KENT", value: "kent" },
          { label: "NEW CASTLE", value: "new_castle" },
          { label: "SUSSEX", value: "sussex" },
        ]}
        value={filters.county}
        onChange={vals => setFilters(f => ({ ...f, county: vals }))}
      />
    </aside>
  );
}
 