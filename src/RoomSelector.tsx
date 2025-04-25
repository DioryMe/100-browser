import React, { useState, useEffect, useRef } from "react";

type ClientType = "HttpClient" | "S3Client";

interface Item {
  id: string;
  clientType: ClientType;
  address: string;
}

const STORAGE_KEY = "roomSelectorItems";

export const RoomSelector = () => {
  // All stored items
  const [items, setItems] = useState<Item[]>([]);
  // Form state for new item
  const [formData, setFormData] = useState<Item>({
    id: "",
    clientType: "HttpClient",
    address: "",
  });

  // Load from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored) as Item[]);
      } catch (e) {
        console.error("Invalid session data", e);
      }
    }
  }, []);

  // Persist to sessionStorage whenever items change, but skip the very first run
  const isFirstSave = useRef(true);
  useEffect(() => {
    if (isFirstSave.current) {
      isFirstSave.current = false;
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!formData.id.trim() || !formData.address.trim()) return;
    setItems((prev) => [...prev, formData]);
    setFormData({ id: "", clientType: "HttpClient", address: "" });
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      {/* List of existing items */}
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: 8 }}>
          <input value={item.id} disabled />
          <select value={item.clientType} disabled>
            <option value="HttpClient">HttpClient</option>
            <option value="S3Client">S3Client</option>
          </select>
          <input value={item.address} disabled />
          <button type="button" onClick={() => handleRemove(item.id)}>
            X
          </button>
        </div>
      ))}
      {/* Add-new form */}
      <div style={{ marginBottom: 12 }}>
        <input
          name="id"
          placeholder="Name"
          value={formData.id}
          onChange={handleChange}
        />
        <select
          name="clientType"
          value={formData.clientType}
          onChange={handleChange}
        >
          <option value="HttpClient">HttpClient</option>
          <option value="S3Client">S3Client</option>
        </select>
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <button type="button" onClick={handleAdd}>
          +
        </button>
      </div>
    </div>
  );
};
