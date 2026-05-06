import React, { createContext, useContext, useState } from "react";

export type FiltersState = {
  femaleHeadOfHousehold: string[];
  firstTimeHomebuyer: string[];
  race: string[];
  ageAtApplication: [number, number];
  county: string[];
};

const defaultFilters: FiltersState = {
  femaleHeadOfHousehold: [],
  firstTimeHomebuyer: [],
  race: [],
  ageAtApplication: [0, 97],
  county: [],
};

export type FiltersContextType = {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  resetFilters: () => void;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const resetFilters = () => setFilters(defaultFilters);
  return (
    <FiltersContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export function useFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFilters must be used within a FiltersProvider");
  return ctx;
}
