import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { setFocus } from "./store/diorySlice";

export const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
  gap: "10px",
  padding: "10px",
};

export const badgeStyle = {
  position: "absolute",
  top: "5px",
  left: "5px",
  padding: "2px 4px",
  backgroundColor: "grey",
  color: "#fff",
  fontSize: "12px",
  borderRadius: "2px",
};

const Grid = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateDiory = useSelector((state: RootState) => state.diory);
  const { diograph, focusId, storyId, storyDiories, stories } = stateDiory;
  const { focusId: urlParamFocusId } = useParams();

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

  // Functions for previous/next diory navigation
  const focusPrevious = () => {
    const currentIndex = storyDiories.findIndex((item) => item.id === focusId);
    if (currentIndex > 0) {
      const prev = storyDiories[currentIndex - 1];
      dispatch(setFocus({ focusId: prev.id, storyId }));
    }
  };

  const focusNext = () => {
    const currentIndex = storyDiories.findIndex((item) => item.id === focusId);
    if (currentIndex !== -1 && currentIndex < storyDiories.length - 1) {
      const next = storyDiories[currentIndex + 1];
      dispatch(setFocus({ focusId: next.id, storyId }));
    }
  };

  // Bind left and right arrow keys for navigation.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        focusPrevious();
      } else if (e.key === "ArrowRight") {
        focusNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [storyDiories, focusId, storyId]);

  const focusSelected = (id: string) => {
    const dioryInFocus = storyDiories.find((item) => item.id === id);
    if (dioryInFocus.links && dioryInFocus.links.length && id === focusId) {
      const firstDioryIdOfStory = Object.values(
        diograph[dioryInFocus.id].links
      )[0].id;
      dispatch(setFocus({ focusId: firstDioryIdOfStory, storyId: id }));
      return;
    }
    if (id === focusId) {
      navigate(`/diory/${id}/content?storyId=${storyId}`);
    }
    dispatch(setFocus({ focusId: id, storyId }));
  };

  const selectedHasMultipleStories = stories.length > 1;
  const otherStories = stories.filter((story) => story.id !== storyId);

  // Partition the items so that (if one is selected) items before in the array will be rendered above,
  // the selected item will be rendered full-width in its own section, and items after will be rendered below.
  const selectedIndex = storyDiories.findIndex((item) => item.id === focusId);
  let itemsBefore = [];
  let selectedItem = null;
  let itemsAfter = [];

  if (selectedIndex !== -1) {
    itemsBefore = storyDiories.slice(0, selectedIndex);
    selectedItem = storyDiories[selectedIndex];
    itemsAfter = storyDiories.slice(selectedIndex + 1);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <button onClick={() => navigate(`/`)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 9L12 2L21 9"></path>
            <path d="M9 22V12H15V22"></path>
            <path d="M21 22H3"></path>
          </svg>
        </button>
      </div>
      {selectedHasMultipleStories &&
        otherStories.map((otherStory) => (
          <button
            onClick={() => {
              dispatch(
                setFocus({
                  focusId: focusId,
                  storyId: otherStory.id,
                })
              );
              navigate(`/diory/${focusId}/grid?storyId=${otherStory.id}`);
            }}
          >
            {`${otherStory.text}`}
          </button>
        ))}
      {selectedItem ? (
        <>
          <div style={gridStyle}>
            {itemsBefore.map(({ id, image }) => (
              <div key={id} onClick={() => focusSelected(id)}>
                <img
                  src={image}
                  alt={id}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            ))}
          </div>
          <div style={{ width: "100%", padding: "10px" }}>
            <div onClick={() => focusSelected(selectedItem.id)}>
              <div style={{ position: "relative" }}>
                {selectedItem.text && (
                  <div style={{ ...(badgeStyle as any) }}>
                    {selectedItem.text}
                  </div>
                )}
                <img
                  src={selectedItem.image}
                  alt={selectedItem.id}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
          <div style={gridStyle}>
            {itemsAfter.map(({ id, image }) => (
              <div key={id} onClick={() => focusSelected(id)}>
                <img
                  src={image}
                  alt={id}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={gridStyle}>
          {storyDiories.map(({ id, image }) => (
            <div key={id} onClick={() => focusSelected(id)}>
              <img
                src={image}
                alt={id}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Grid;
