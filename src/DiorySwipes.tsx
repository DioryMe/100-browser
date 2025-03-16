import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./DiorySwipes.module.css";

import { DiorySlide } from "./DiorySlide";
import Header from "./Header";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DiorySwiper from "./DiorySwiper";
import { IDioryObject } from "@diograph/diograph/types";

const createDiorySlide = (diory: IDioryObject, key: number) => {
  if (!diory) return null;

  return (
    <SwiperSlide key={key}>
      <DiorySlide diory={diory} />;
    </SwiperSlide>
  );
};

const DiorySwipes = () => {
  const navigate = useNavigate();
  // const { focusId } = useParams();
  // const [storyDiory, setStoryDiory] = useState<any>(null);
  //
  // useEffect(() => {
  //
  //   setStoryDiory(story);
  //
  //   if (swiper) {
  //     setTimeout(() => {
  //       swiper.slideTo(swiper.activeIndex + (prev ? 1 : 0), 0, false);
  //     }, 1);
  //   }
  // }, [focusId, swiper]);

  return (
    <div className={styles.container}>
      <Header
        text="Not implemented" // {storyDiory.text}
        onClick={
          () => navigate("/")
          // navigate(storyDiory.id === "/" ? "/" : `/diory/${storyDiory.id}`)
        }
      />
      <div className={styles.swiperContainer}>
        <DiorySwiper createSlide={createDiorySlide} />
      </div>
    </div>
  );
};

export default DiorySwipes;
