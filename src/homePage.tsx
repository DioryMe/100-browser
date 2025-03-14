import { useNavigate } from "react-router-dom";
import { storyDiories } from "./App";
import styles from "./DiorySwipes.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div>My Diory</div>
      <div>
        {storyDiories[0].text}
        <img
          onClick={() => navigate(`/diory/${storyDiories[0].id}`)}
          src={storyDiories[0].image}
        />
      </div>
    </div>
  );
};

export default HomePage;
