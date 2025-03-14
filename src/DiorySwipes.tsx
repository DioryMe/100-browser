import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./DiorySwipes.module.css";

// import { useState } from "react";
import { DiorySlide } from "./DiorySlide";
import Header from "./Header";

import diographJson from "../mary-json.json";
import { Diograph } from "@diograph/diograph";
import { useNavigate, useParams } from "react-router-dom";
import { getDioryInfo } from "./utils/dioryInfo";
import { useEffect, useState } from "react";
const diograph = new Diograph(diographJson);

const getSlide = (dioryId: string, i: number) => {
  if (!dioryId) return null;

  const diory = diograph.getDiory({ id: dioryId });
  return (
    <SwiperSlide key={`swiper-slide-${i}`}>
      <DiorySlide key={i} diory={diory} />;
    </SwiperSlide>
  );
};

const DiorySwipes = () => {
  const { focusId } = useParams();
  const navigate = useNavigate();

  const { story, focus, next, prev } = getDioryInfo(diograph, focusId);
  const linkedDiories = story.links.map((l) => diograph.getDiory({ id: l.id }));

  const [slides, setSlides] = useState<any>([]);

  useEffect(() => {
    const newSlides = [prev, focusId, next].map((id, i) => getSlide(id, i));
    setSlides(newSlides);
  }, [focusId]);

  return (
    <div className={styles.container}>
      <Header
        text={story.text}
        onClick={() => navigate(story.id === "/" ? "/" : `/diory/${story.id}`)}
      />
      <div className={styles.swiperContainer}>
        <Swiper
          speed={200}
          initialSlide={0}
          onSlidePrevTransitionStart={() => {
            console.log("slie prev");
            navigate(`/diory/${prev}`);
          }}
          onSlideNextTransitionStart={() => {
            console.log("slie next");
            navigate(`/diory/${next}`);
          }}
        >
          {slides}
          {/* {linkedDiories.map((diory, i) => {
            return (
              <SwiperSlide key={`swiper-slide-${i}`}>
                <DiorySlide key={i} diory={diory} />;
              </SwiperSlide>
            );
          })} */}
        </Swiper>
      </div>
    </div>
  );
};

export default DiorySwipes;
