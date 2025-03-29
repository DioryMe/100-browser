import { useNavigate, useSearchParams } from "react-router-dom";
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

  const [searchParams] = useSearchParams();
  const roomAddress =
    sessionStorage.getItem("roomAddress") || searchParams.get("roomAddress");
  const roomAuthToken =
    sessionStorage.getItem("roomAuthToken") ||
    searchParams.get("roomAuthToken");
  const rootDioryId =
    sessionStorage.getItem("rootDioryId") || searchParams.get("rootDioryId");

  console.log("rootDiory", rootDioryId);
  if (roomAddress && roomAuthToken) {
    roomAddress && sessionStorage.setItem("roomAddress", roomAddress);
    roomAuthToken && sessionStorage.setItem("roomAuthToken", roomAuthToken);
    rootDioryId && sessionStorage.setItem("rootDioryId", rootDioryId);
  }

  return (
    <div className={styles.container}>
      <div>My Diory</div>
      <div>
        {mary.text}
        <img
          onClick={() => navigate(`/diory/${rootDioryId || mary.id}`)}
          src={mary.image}
        />
      </div>
    </div>
  );
};

export default HomePage;
