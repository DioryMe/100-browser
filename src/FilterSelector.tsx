// src/components/FilterSelector.tsx
import React, { useState } from "react";
import { STORAGE_KEY } from "./FilterModifier";

type FilterItem = {
  name: string;
  enabled: boolean;
  filter: object;
};

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
  const stored = localStorage.getItem(STORAGE_KEY);
  const initialFilters = JSON.parse(stored).map((item) => {
    return { name: item.id, enabled: false, filter: { ...item } };
  });
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

        <div style={{ display: "inline-block" }}>
          <a href="/filters">
            <button>Edit filters</button>
          </a>
        </div>
      </div>

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
