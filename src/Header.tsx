import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { MouseEventHandler } from "react";

interface Props {
  text: string;
  onClick: MouseEventHandler;
}

const Header = ({ text, onClick }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.headerContainer}>
      <div
        className={styles.headerSquare}
        // For some reason headerSquare class is not applied properly so needed to add these inline
        style={{ width: "80px", height: "100%" }}
        onClick={onClick}
      >
        <img src="https://www.svgrepo.com/download/305142/arrow-ios-back.svg" />
      </div>
      <div className={styles.headerText} onClick={onClick}>
        {text}
      </div>
      <div>
        <div
          className={styles.headerSquare}
          // For some reason headerSquare class is not applied properly so needed to add these inline
          style={{
            width: "100px",
            height: "20px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/room-selector")}
        >
          Rooms
        </div>
        <div
          className={styles.headerSquare}
          // For some reason headerSquare class is not applied properly so needed to add these inline
          style={{
            width: "100px",
            height: "20px",
            cursor: "pointer",
            display: "inline-block",
          }}
          onClick={() => navigate("/grid")}
        >
          Archive
        </div>
      </div>
    </div>
  );
};

export default Header;
