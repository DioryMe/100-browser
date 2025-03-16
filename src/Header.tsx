import styles from "./Header.module.css";
import { MouseEventHandler } from "react";

interface Props {
  text: string;
  onClick: MouseEventHandler;
}

const Header = ({ text, onClick }: Props) => {
  return (
    <div className={styles.headerContainer}>
      <div
        className={styles.headerSquare}
        // For some reason headerSquare class is not applied properly so needed to add these inline
        style={{ width: "80px", height: "100%" }}
      >
        <img src="https://www.svgrepo.com/download/305142/arrow-ios-back.svg" />
      </div>
      <div className={styles.headerText} onClick={onClick}>
        {text}
      </div>
      <div
        className={styles.headerSquare}
        // For some reason headerSquare class is not applied properly so needed to add these inline
        style={{ width: "80px", height: "100%" }}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/640px-Hamburger_icon.svg.png" />
      </div>
    </div>
  );
};

export default Header;
