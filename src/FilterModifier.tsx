import React, { useState, useEffect, useRef } from "react";

interface Filter {
  id: string;
  dateStart: string;
  dateEnd: string;
  latlngStart: string;
  latlngEnd: string;
  removedIds: string[];
}

interface FilterForm {
  id: string;
  dateStart: string;
  dateEnd: string;
  latlngStart: string;
  latlngEnd: string;
  removedIdsText: string; // comma-separated in the form
}

export const STORAGE_KEY = "filterItems";
const ACTIVE_KEY = "filterActive";

export const FilterModifier: React.FC = () => {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter | null>(null);
  const [form, setForm] = useState<FilterForm>({
    id: "",
    dateStart: "",
    dateEnd: "",
    latlngStart: "",
    latlngEnd: "",
    removedIdsText: "",
  });
  const isFirstSave = useRef(true);

  // Load existing filters once on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFilters(JSON.parse(stored));
      } catch {
        console.error("Invalid filter JSON in localStorage");
      }
    }
  }, []);

  // Load active filter once on mount
  useEffect(() => {
    const storedActive = localStorage.getItem(ACTIVE_KEY);
    if (storedActive) {
      try {
        setActiveFilter(JSON.parse(storedActive));
      } catch {
        console.error("Invalid active filter JSON in localStorage");
      }
    }
  }, []);

  // Persist filters to localStorage on every change (skip initial mount)
  useEffect(() => {
    if (isFirstSave.current) {
      isFirstSave.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleAdd = () => {
    const trimmedId = form.id.trim();
    if (!trimmedId) return;

    const newFilter: Filter = {
      id: trimmedId,
      dateStart: form.dateStart,
      dateEnd: form.dateEnd,
      latlngStart: form.latlngStart,
      latlngEnd: form.latlngEnd,
      removedIds: form.removedIdsText
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
    };

    setFilters((prev) => [...prev, newFilter]);
    // reset form
    setForm({
      id: "",
      dateStart: "",
      dateEnd: "",
      latlngStart: "",
      latlngEnd: "",
      removedIdsText: "",
    });
  };

  const handleRemove = (id: string) => {
    setFilters((prev) => prev.filter((f) => f.id !== id));

    // if the removed one was active, clear it
    if (activeFilter?.id === id) {
      localStorage.removeItem(ACTIVE_KEY);
      setActiveFilter(null);
    }
  };

  // Mark a filter as active
  const handleSetActive = (filter: Filter) => {
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(filter));
    setActiveFilter(filter);
  };

  return (
    <div style={{ padding: 16 }}>
      {/* FILTER CARDS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {filters.map((f) => (
          // wrap each card with an active‐toggle button
          <div
            key={f.id}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            {/* existing card layout */}
            <div
              key={f.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 4,
                padding: 12,
                width: 220,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <input value={f.id} disabled />
              <input value={f.dateStart} disabled />
              <input value={f.dateEnd} disabled />
              <input value={f.latlngStart} disabled />
              <input value={f.latlngEnd} disabled />
              <input
                value={f.removedIds.join(",")}
                disabled
                placeholder="removedIds"
              />
              <button
                type="button"
                onClick={() => handleRemove(f.id)}
                style={{ marginTop: 8 }}
              >
                X
              </button>
              <button
                type="button"
                onClick={() => handleSetActive(f)}
                style={{ color: activeFilter?.id === f.id ? "green" : "gray" }}
              >
                {activeFilter?.id === f.id ? "✓" : "○"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* STACKED FORM */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: 300,
          marginBottom: 24,
        }}
      >
        <input
          name="id"
          placeholder="ID"
          value={form.id}
          onChange={handleChange}
        />
        <input
          name="dateStart"
          type="date"
          placeholder="Start Date"
          value={form.dateStart}
          onChange={handleChange}
        />
        <input
          name="dateEnd"
          type="date"
          placeholder="End Date"
          value={form.dateEnd}
          onChange={handleChange}
        />
        <input
          name="latlngStart"
          placeholder="LatLng Start"
          value={form.latlngStart}
          onChange={handleChange}
        />
        <input
          name="latlngEnd"
          placeholder="LatLng End"
          value={form.latlngEnd}
          onChange={handleChange}
        />
        <input
          name="removedIdsText"
          placeholder="Removed IDs (comma-separated)"
          value={form.removedIdsText}
          onChange={handleChange}
        />
        <button type="button" onClick={handleAdd}>
          +
        </button>
      </div>
      <a href="/grid">
        <button>Archive</button>
      </a>
    </div>
  );
};
