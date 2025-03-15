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

const createSlide = (dioryId: string, i: number) => {
  console.log("triggered");
  if (!dioryId) return null;
  console.log("dioryId", dioryId);

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

  const [slides, setSlides] = useState<any>([]);
  const [prevDioryId, setPrevDioryId] = useState<any>(null);
  const [nextDioryId, setNextDioryId] = useState<any>(null);
  const [storyDiory, setStoryDiory] = useState<any>(null);

  useEffect(() => {
    const { story, next, prev } = getDioryInfo(diograph, focusId);
    const newSlides = [prev, focusId, next].map((id, i) => createSlide(id, i));
    console.log(JSON.stringify({ storyId: story.id, focusId, next, prev }));
    setSlides(newSlides);
    setNextDioryId(next);
    setPrevDioryId(prev);
    setStoryDiory(story);
  }, [focusId]);

  console.log("slide", slides);
  return (
    storyDiory && (
      <div className={styles.container}>
        <Header
          text={storyDiory.text}
          onClick={() =>
            navigate(storyDiory.id === "/" ? "/" : `/diory/${storyDiory.id}`)
          }
        />
        <div className={styles.swiperContainer}>
          <Swiper
            speed={200}
            initialSlide={1}
            runCallbacksOnInit={false}
            onSlidePrevTransitionStart={(swiper) => {
              navigate(`/diory/${prevDioryId}`);
            }}
            onSlideNextTransitionStart={(swiper) => {
              navigate(`/diory/${nextDioryId}`);
            }}
          >
            {slides}
          </Swiper>
        </div>
      </div>
    )
  );
};

export default DiorySwipes;
