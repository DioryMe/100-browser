import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./DiorySwipes.module.css";

// import { useState } from "react";
import { DiorySlide } from "./DiorySlide";
import Header from "./Header";

import diographJson from "../mary-json.json";
import { Diograph } from "@diograph/diograph";
import { useNavigate, useParams } from "react-router-dom";
const diograph = new Diograph(diographJson);

const DiorySwipes = () => {
  // const [slides, setSlides] = useState<any>([]);
  const { focusId } = useParams();
  const navigate = useNavigate();

  const stories = Object.values(diograph.toObject()).filter((dioryData) =>
    dioryData.links?.some((link) => link.id === focusId)
  );

  const story = stories[0];

  const linkedDiories = story.links.map((l) => diograph.getDiory({ id: l.id }));

  return (
    <div className={styles.container}>
      <Header
        text={story.text}
        onClick={() => navigate(story.id === "/" ? "/" : `/diory/${story.id}`)}
      />
      <div className={styles.swiperContainer}>
        <Swiper speed={200} initialSlide={0}>
          {linkedDiories.map((diory, i) => {
            return (
              <SwiperSlide key={`swiper-slide-${i}`}>
                <DiorySlide key={i} diory={diory} />;
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default DiorySwipes;
