import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { setFocus } from "./store/diorySlice";
import { badgeStyle, getSelectedItemStyle, gridStyle } from "./GridStyle";
import { Diograph } from "@diograph/diograph";

const Grid = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateDiory = useSelector((state: RootState) => state.diory);
  const { focusId, storyId, diograph } = stateDiory;
  const { focusId: urlParamFocusId } = useParams();

  console.log("rerender");

  useEffect(() => {
    if (focusId) {
      navigate(`/diory/${focusId}/grid?storyId=${storyId}`);
      return;
    }
    if (urlParamFocusId) {
      const storyId = new URLSearchParams(search).get("storyId");
      dispatch(setFocus({ focusId: urlParamFocusId, storyId }));
    }
  }, [focusId, urlParamFocusId]);

  const [dioryArray, setDioryArray] = useState([]);

  useEffect(() => {
    if (diograph && storyId) {
      const diographInstance = new Diograph(diograph);
      const storyDiory = diographInstance.getDiory({ id: storyId });
      setDioryArray(
        storyDiory.links.map((link) => {
          const linkedDiory = diographInstance.getDiory({ id: link.id });
          return {
            dioryId: linkedDiory.id,
            image: linkedDiory.image,
          };
        })
      );
    }
  }, [diograph, storyId]);

  const focusSelected = (id: string) => {
    console.log("new", stateDiory);
    if (id === focusId) {
      alert("Go to content");
    }
    dispatch(setFocus({ focusId: id, storyId }));
  };

  return (
    <>
      <button onClick={() => navigate(`/`)}>Back</button>
      <div style={gridStyle}>
        {dioryArray.map(({ dioryId, image }) => (
          <div
            key={dioryId}
            style={focusId === dioryId ? getSelectedItemStyle() : {}}
            onClick={() => focusSelected(dioryId)}
          >
            <img
              src={image}
              alt={dioryId}
              style={{ width: "100%", height: "auto" }}
            />
            {focusId === dioryId && (
              <div style={{ ...badgeStyle }}>Selected</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
