import { useEffect, useState } from "react";
import diograph from "../diograph.json";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { setFocus } from "./store/diorySlice";

const Grid = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateDiory = useSelector((state: RootState) => state.diory);
  const { focusId: stateFocusId } = stateDiory;
  const { focusId: urlParamFocusId } = useParams();
  console.log("baa", stateFocusId);
  console.log("buu", urlParamFocusId);
  useEffect(() => {
    if (stateFocusId) {
      console.log("set url", stateFocusId);
      navigate(`/diory/${stateFocusId}/grid`);
      return;
    }
    if (urlParamFocusId && urlParamFocusId !== stateFocusId) {
      console.log("set state", urlParamFocusId);
      dispatch(setFocus({ focusId: urlParamFocusId }));
    }
  }, [stateFocusId, urlParamFocusId, dispatch, navigate]);

  // 1) Map the JSON object into an array with flags in state
  const [dioryArray, setDioryArray] = useState(() =>
    Object.values(diograph).map((diory, idx) => ({
      dioryId: diory.id,
      image: diory.image,
      // selected: (idx + 1) % 4 === 0,
      // existing: (idx + 1) % 6 === 0,
    }))
  );

  // Toggle selected flag when clicking an item
  const toggleSelected = (id: string) => {
    setDioryArray((prev) =>
      prev.map((item) =>
        item.dioryId === id
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    );
    console.log("boom", stateDiory);
    console.log("click state", id);

    dispatch(setFocus({ focusId: id }));
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
      <button onClick={() => navigate(`/`)}>Back</button>
      <div style={gridStyle}>
        {dioryArray.map(({ dioryId, image, selected, existing }) => (
          <div
            key={dioryId}
            style={getItemStyle(selected, existing)}
            onClick={() => toggleSelected(dioryId)}
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
        ))}
      </div>
      {/* <button onClick={alertSelectedIds}>Show Selected IDs</button> */}
    </>
  );
};

export default Grid;
