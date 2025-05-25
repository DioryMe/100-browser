import { useNavigate } from "react-router-dom";

import diograph from "../diograph.json";
const rootDiory = diograph["f0ba9af3-61ea-4b86-be81-6beb08f0a287"];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>{rootDiory.text}</div>
      {rootDiory.links.map((story) => (
        <div key={story}>
          {diograph[story.id].text}
          <img
            onClick={() => navigate(`/diory/${story.id}/grid`)}
            src={diograph[story.id].image}
          />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
