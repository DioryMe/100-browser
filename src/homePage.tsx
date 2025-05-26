import { useNavigate } from "react-router-dom";

import diograph from "../diograph.json";
import { setFocus, setStory } from "./store/diorySlice";
import { useDispatch } from "react-redux";
const rootDiory = diograph["22185bcd-c09f-4f16-b613-af5f3c81150c"];

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <h2>{rootDiory.text}</h2>
      {rootDiory.links.map((story) => (
        <div key={story.id}>
          <h3>{diograph[story.id].text}</h3>
          <div>
            <img
              onClick={() => {
                // TODO: Set first diory of the story in focus
                const firstDioryOfStory = Object.values(
                  diograph[story.id].links
                )[0].id;
                dispatch(
                  setFocus({
                    focusId: firstDioryOfStory,
                    storyId: story.id,
                  })
                );
                navigate(
                  `/diory/${firstDioryOfStory}/grid?storyId=${story.id}`
                );
              }}
              src={diograph[story.id].image}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
