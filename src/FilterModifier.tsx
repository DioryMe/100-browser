import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type ClientType = "HttpClient" | "S3Client";

interface Item {
  id: string;
  clientType: ClientType;
  address: string;
}

const STORAGE_KEY = "roomSelectorItems";
export const ACTIVE_KEY = "roomSelectorActive";

export const FilterModifier = () => {
  const navigate = useNavigate();
  // All stored items
  const [items, setItems] = useState<Item[]>([]);
  // Form state for new item
  const [formData, setFormData] = useState<Item>({
    id: "",
    clientType: "HttpClient",
    address: "",
  });

  // Active item state + load on mount
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem(ACTIVE_KEY);
    if (stored) {
      try {
        setActiveItem(JSON.parse(stored) as Item);
      } catch (e) {
        console.error("Invalid active data", e);
      }
    }
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored) as Item[]);
      } catch (e) {
        console.error("Invalid session data", e);
      }
    }
  }, []);

  // Persist to localStorage whenever items change, but skip the very first run
  const isFirstSave = useRef(true);
  useEffect(() => {
    if (isFirstSave.current) {
      isFirstSave.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
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
    // clear active if removing the active item
    if (activeItem?.id === id) {
      localStorage.removeItem(ACTIVE_KEY);
      setActiveItem(null);
    }
  };

  const handleSetActive = (item: Item) => {
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(item));
    setActiveItem(item);
  };

  return (
    <>
      <div>
        {/* List of existing items */}
        {items.map((item) => (
          <div
            key={item.id}
            style={{ marginBottom: 8, display: "flex", alignItems: "center" }}
          >
            <button
              type="button"
              onClick={() => handleSetActive(item)}
              style={{
                marginRight: 8,
                color: activeItem?.id === item.id ? "green" : "gray",
              }}
            >
              {activeItem?.id === item.id ? "✓" : "○"}
            </button>
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
      <div>
        <a href={"/grid"}>
          <button>Go to Archive</button>
        </a>
      </div>
    </>
  );
};
