export const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
  gap: "10px",
  padding: "10px",
};

export const getSelectedItemStyle = () => ({
  position: "relative",
  cursor: "pointer",
  border: "3px solid blue",
  borderRadius: "4px",
  overflow: "hidden",
});

export const badgeStyle = {
  position: "absolute",
  top: "5px",
  left: "5px",
  padding: "2px 4px",
  backgroundColor: "blue",
  color: "#fff",
  fontSize: "12px",
  borderRadius: "2px",
};
