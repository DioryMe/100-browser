// src/components/FilterSelector.tsx
import React, { useState } from "react";

type FilterItem = {
  name: string;
  enabled: boolean;
  filter: object;
};

const initialFilters: FilterItem[] = [
  { name: "Summer", enabled: false, filter: {} },
  { name: "Winter", enabled: false, filter: {} },
  { name: "2022", enabled: false, filter: {} },
  { name: "Map", enabled: false, filter: {} },
];

const pillStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "4px 10px",
  margin: "4px",
  background: "#e0e0e0",
  borderRadius: "16px",
  cursor: "pointer",
  userSelect: "none",
};

const FilterSelector: React.FC = () => {
  const [filters, setFilters] = useState<FilterItem[]>(initialFilters);

  // Split out enabled vs. available
  const available = filters.filter((f) => !f.enabled);
  const selected = filters.filter((f) => f.enabled);

  // When you pick an option, flip enabled → true
  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    setFilters((prev) =>
      prev.map((f) => (f.name === name ? { ...f, enabled: true } : f))
    );
    e.target.value = ""; // reset the select
  };

  // When you click a pill, flip enabled → false
  const onRemove = (name: string) => {
    setFilters((prev) =>
      prev.map((f) => (f.name === name ? { ...f, enabled: false } : f))
    );
  };

  return (
    <div>
      <select onChange={onSelect} defaultValue="">
        <option value="" disabled>
          -- choose filter --
        </option>
        {available.map((f) => (
          <option key={f.name} value={f.name}>
            {f.name}
          </option>
        ))}
      </select>

      <div style={{ marginTop: 12, height: "50px" }}>
        {selected.map((f) => (
          <span key={f.name} style={pillStyle} onClick={() => onRemove(f.name)}>
            {f.name} &times;
          </span>
        ))}
      </div>
    </div>
  );
};

export default FilterSelector;
