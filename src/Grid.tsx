import { useEffect, useState } from "react";
import FilterSelector, { pillStyle } from "./FilterSelector";
import { useNavigate } from "react-router-dom";
import { useDiosphereContext } from "./DiosphereContext";
import {
  Filter,
  FILTER_ACTIVE_KEY,
  FILTER_STORAGE_KEY,
} from "./FilterModifier";

const Grid = () => {
  const navigate = useNavigate();
  const { diograph } = useDiosphereContext();
  const [dioryArray, setDioryArray] = useState([]);
  const [activeFilter, setActiveFilter] = useState<Filter | null>(null);

  const stored = localStorage.getItem(FILTER_STORAGE_KEY);
  const initialFilters = JSON.parse(stored);
  const [filters, setFilters] = useState<Filter[]>(initialFilters);

  useEffect(() => {
    const storedActive = localStorage.getItem(FILTER_ACTIVE_KEY);
    if (storedActive) {
      try {
        setActiveFilter(JSON.parse(storedActive));
      } catch {
        console.error("Invalid active filter JSON in localStorage");
      }
    }
  }, []);

  useEffect(() => {
    if (!diograph) return;

    const diographObject = activeFilter
      ? diograph.queryDiographByDateAndGeo({
          latlngStart: activeFilter.latlngStart,
          latlngEnd: activeFilter.latlngEnd,
          dateStart: activeFilter.dateStart,
          dateEnd: activeFilter.dateEnd,
          // latlngStart: "61.48587998183945, 23.96633387857436",
          // latlngEnd: "61.385879805830584, 24.241258867230393",
        })
      : diograph.toObject();

    const dioryArray = Object.values(diographObject)
      .sort((dioryA, dioryB) => {
        const dioryADate = new Date(dioryA.date);
        const dioryBDate = new Date(dioryB.date);
        return dioryADate > dioryBDate ? 1 : -1;
      })
      .map((diory, idx) => ({
        dioryId: diory.id,
        image: diory.image,
        // selected: (idx + 1) % 4 === 0,
        // existing: (idx + 1) % 6 === 0,
      }));

    setDioryArray(dioryArray);
  }, [diograph, activeFilter]);

  const handleSetActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filterName = e.target.value;
    const filter = filters.find((f) => f.id === filterName);
    localStorage.setItem(FILTER_ACTIVE_KEY, JSON.stringify(filter));
    setActiveFilter(filter);
  };

  const handleRemove = (id: string) => {
    if (activeFilter?.id === id) {
      localStorage.removeItem(FILTER_ACTIVE_KEY);
      setActiveFilter(null);
    }
  };

  // Toggle selected flag when clicking an item
  const toggleSelected = (id: string) => {
    setDioryArray((prev) =>
      prev.map((item) =>
        item.dioryId === id ? { ...item, selected: !item.selected } : item
      )
    );
  };
  // 2) Inline styles for grid and items
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "10px",
    padding: "10px",
  };
  const getItemStyle = (selected, existing) => ({
    position: "relative",
    cursor: "pointer",
    border: selected
      ? "3px solid blue"
      : existing
      ? "3px solid green"
      : "1px solid #ccc",
    borderRadius: "4px",
    overflow: "hidden",
  });
  const badgeStyle = {
    position: "absolute",
    top: "5px",
    left: "5px",
    padding: "2px 4px",
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    fontSize: "12px",
    borderRadius: "2px",
  };

  const alertSelectedIds = () => {
    const selectedIds = dioryArray
      .filter((item) => item.selected)
      .map((item) => item.dioryId);
    alert(selectedIds.join(", "));
  };

  // 3) Render the grid
  return (
    <>
      {/* <FilterSelector /> */}
      <div>
        <select onChange={handleSetActive} defaultValue="">
          <option value="" disabled>
            -- choose filter --
          </option>
          {filters.map((f) => (
            <option key={f.id} value={f.id}>
              {f.id}
            </option>
          ))}
        </select>

        <div style={{ display: "inline-block" }}>
          <a href="/filters">
            <button>Edit filters</button>
          </a>
        </div>
      </div>

      <div>
        {activeFilter && (
          <span
            key={activeFilter.id}
            style={pillStyle}
            onClick={() => handleRemove(activeFilter.id)}
          >
            {activeFilter.id} &times;
          </span>
        )}
      </div>
      <div>
        <button onClick={alertSelectedIds}>Process selected</button>
      </div>
      <div>
        <button onClick={() => navigate("/room-selector")}>
          Archive selector
        </button>
      </div>
      <div style={gridStyle}>
        {dioryArray.map(({ dioryId, image, selected, existing }) => (
          <a key={dioryId} href={`/diory/${dioryId}/content`}>
            <div
              key={dioryId}
              style={getItemStyle(selected, existing)}
              // onClick={() => toggleSelected(dioryId)}
            >
              <img
                src={image}
                alt={dioryId}
                style={{ width: "100%", height: "auto" }}
              />
              {selected && (
                <div style={{ ...badgeStyle, backgroundColor: "blue" }}>
                  Selected
                </div>
              )}
              {existing && (
                <div
                  style={{
                    ...badgeStyle,
                    top: "auto",
                    bottom: "5px",
                    backgroundColor: "green",
                  }}
                >
                  Existing
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default Grid;
