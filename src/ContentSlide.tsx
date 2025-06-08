import { useNavigate } from "react-router-dom";
import styles from "./ContentSwipes.module.css";
import { IDioryObject } from "@diograph/diograph/types";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

export const ContentSlide = ({ diory }: { diory: IDioryObject }) => {
  const navigate = useNavigate();
  const { storyId } = useSelector((state: RootState) => state.diory);
  // Select the blob URL from Redux using the diory id
  const contentUrl2 = useSelector(
    (state: RootState) => state.diory.contentUrls[diory.id]
  );

  let content, content2;
  if (contentUrl2) {
    console.log("con", contentUrl2);
    const { url: contentUrl, mimeType } = contentUrl2;

    content = (
      <img
        // Use the blob URL if available; fallback to the diory.image otherwise.
        src={contentUrl ? contentUrl : diory.image}
      />
    );

    content2 = (
      <video controls={true} loop={true} autoPlay={false}>
        <source src={contentUrl} type="video/mp4" />
        <track kind="captions" />
      </video>
    );
  }

  return (
    <div className={styles.fullImage} style={{ cursor: "grab" }}>
      <div className="swiper-zoom-container">
        {" "}
        {/* Added container for Swiper zoom */}
        {content}
      </div>
    </div>
  );
};
