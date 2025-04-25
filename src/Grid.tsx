import { useEffect, useState } from "react";
import FilterSelector from "./FilterSelector";
import { useNavigate } from "react-router-dom";
import { useDiosphereContext } from "./DiosphereContext";

const Grid = () => {
  const navigate = useNavigate();
  const { diograph } = useDiosphereContext();
  const [dioryArray, setDioryArray] = useState([]);

  useEffect(() => {
    if (!diograph) return;

    const dioryArray = Object.values(diograph.toObject())
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
  }, [diograph]);

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
      <FilterSelector />
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
