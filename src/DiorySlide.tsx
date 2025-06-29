import { useNavigate } from "react-router-dom";
import styles from "./DiorySlide.module.css";

import { IDioryObject } from "@diograph/diograph/types";
import { useDiosphereContext } from "./DiosphereContext";

export const DiorySlide = ({ diory }: { diory: IDioryObject }) => {
  const navigate = useNavigate();
  const { diograph } = useDiosphereContext();

  const linkedDiories =
    (diory.links && diory.links.map((l) => diograph.getDiory({ id: l.id }))) ||
    [];

  return (
    <div className={styles.diorySlideContainer}>
      <div className={styles.image}>
        <img
          onClick={() => navigate(`/diory/${diory.id}/content`)}
          src={diory.image}
        />
      </div>
      <div className={`${styles.imageContainer} swiper-no-swiping`}>
        {linkedDiories.map((linkedDiory, i) => (
          <img
            key={`images-${i}`}
            src={linkedDiory.image}
            onClick={() => navigate(`/diory/${linkedDiory.id}`)}
          />
        ))}
        {linkedDiories.length === 0 && "No linked diories"}
      </div>
      <div className={styles.infoSectionContainer}>
        <div></div>
        <div className={styles.infoContainer}>
          <div className={styles.infoColumn}>
            <div className={styles.fieldLabel}>Text:</div>
            <div>{diory.text || "-"}</div>
          </div>
          <div className={styles.infoColumn}>
            <div className={styles.fieldLabel}>Date:</div>
            <div>{diory.date || "-" || "12.12.2012"}</div>
          </div>
          <div className={styles.infoColumn}>
            <div className={styles.fieldLabel}>Latlng:</div>
            <div>
              <a
                target="_blank"
                href={
                  diory.latlng
                    ? `https://google.com/search?q=${diory.latlng}`
                    : ""
                }
              >
                {diory.latlng || "-" || "64.42848, 41.58833"}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};
