import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.headerContainer}>
      <div
        className={styles.headerSquare}
        style={{ width: "80px", height: "100%" }}
      >
        <img src="https://www.svgrepo.com/download/305142/arrow-ios-back.svg" />
      </div>
      <div className={styles.headerText} onClick={() => navigate("/")}>
        My Diory
      </div>
      <div
        className={styles.headerSquare}
        style={{ width: "80px", height: "100%" }}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/640px-Hamburger_icon.svg.png" />
      </div>
    </div>
  );
};

export default Header;
