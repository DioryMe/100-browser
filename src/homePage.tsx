import { useNavigate } from "react-router-dom";
import { stories } from "./App";
import styles from "./DiorySwipes.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div>My Diory</div>
      <img onClick={() => navigate("/story")} src={stories[1][0]} />
    </div>
  );
};

export default HomePage;
