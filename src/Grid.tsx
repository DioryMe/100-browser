// ... existing imports ...
import diograph from "../mary-json.json";
import FilterSelector from "./FilterSelector";

const Grid = () => {
  // 1) Map the JSON object into an array with flags
  const dioryArray = Object.values(diograph).map((diory, idx) => ({
    dioryId: diory.id,
    image: diory.image,
    selected: (idx + 1) % 4 === 0,
    existing: (idx + 1) % 6 === 0,
  }));
  // 2) Inline styles for grid and items
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "10px",
    padding: "10px",
  };
  const getItemStyle = (selected, existing) => ({
    position: "relative",
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
  // 3) Render the grid
  return (
    <>
      <FilterSelector />
      <div style={gridStyle}>
        {dioryArray.map(({ dioryId, image, selected, existing }) => (
          <div key={dioryId} style={getItemStyle(selected, existing)}>
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
        ))}
      </div>
    </>
  );
};

export default Grid;
