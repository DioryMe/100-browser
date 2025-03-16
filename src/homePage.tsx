import { useNavigate } from "react-router-dom";
import styles from "./DiorySwipes.module.css";

// Home page is a custom page and has fixed links to diories
// --- under construction ---

// TODO: Iterate through storyDiories: needs diosphere context
// const mary = "e07c2f1d-5f5a-488a-a505-34f7b9f55105"
// const scoutsEvent = "f1470597-1a3c-4a76-8546-2c29591a6846";
// const storyDiories = [mary, scoutsEvent];

import diograph from "../mary-json.json";
const mary = diograph["e07c2f1d-5f5a-488a-a505-34f7b9f55105"];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div>My Diory</div>
      <div>
        {mary.text}
        <img onClick={() => navigate(`/diory/${mary.id}`)} src={mary.image} />
      </div>
    </div>
  );
};

export default HomePage;
