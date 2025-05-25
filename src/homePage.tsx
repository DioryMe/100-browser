import { useNavigate } from "react-router-dom";

import diograph from "../diograph.json";
import { setFocus, setStory } from "./store/diorySlice";
import { useDispatch } from "react-redux";
const rootDiory = diograph["f0ba9af3-61ea-4b86-be81-6beb08f0a287"];

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <div>{rootDiory.text}</div>
      {rootDiory.links.map((story) => (
        <div key={story}>
          {diograph[story.id].text}
          <img
            onClick={() => {
              // TODO: Set first diory of the story in focus
              dispatch(setFocus({ focusId: story.id, storyId: "/" }));
              navigate(`/diory/${story.id}/grid`);
            }}
            src={diograph[story.id].image}
          />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
