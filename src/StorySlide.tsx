import { useNavigate } from "react-router-dom";
import styles from "./DiorySlide.module.css";

export const StorySlide = ({
  story,
  images,
  storyOnClick,
}: {
  story: any;
  images: any[];
  storyOnClick: React.MouseEventHandler;
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.diorySlideContainer}>
      <div className={styles.image}>
        <img onClick={storyOnClick} src={story.image} />
      </div>
      <div className={`${styles.imageContainer} swiper-no-swiping`}>
        {images.map((diory, i) => (
          <img
            key={`images-${i}`}
            src={diory.image}
            onClick={() => navigate("/diory")}
          />
        ))}
      </div>
      <div className={styles.infoSectionContainer}>
        <div></div>
        <div className={styles.infoContainer}>
          <div className={styles.infoColumn}>
            <div className={styles.fieldLabel}>Date:</div>
            <div>{story.date || "-" || "12.12.2012"}</div>
          </div>
          <div className={styles.infoColumn}>
            <div className={styles.fieldLabel}>Latlng:</div>
            <div>{story.latlng || "-" || "64.42848, 41.58833"}</div>
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};
