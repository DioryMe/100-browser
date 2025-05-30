import { useNavigate } from "react-router-dom";
import styles from "./ContentSwipes.module.css";
import { IDioryObject } from "@diograph/diograph/types";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

export const ContentSlide = ({ diory }: { diory: IDioryObject }) => {
  const navigate = useNavigate();
  const { storyId } = useSelector((state: RootState) => state.diory);
  // Select the blob URL from Redux using the diory id
  const contentUrl = useSelector(
    (state: RootState) => state.diory.contentUrls[diory.id]
  );

  return (
    <div className={styles.fullImage} style={{ cursor: "grab" }}>
      <div className="swiper-zoom-container">
        {" "}
        {/* Added container for Swiper zoom */}
        <img
          // Use the blob URL if available; fallback to the diory.image otherwise.
          src={contentUrl ? contentUrl : diory.image}
        />
      </div>
    </div>
  );
};
