import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./DiorySwipes.module.css";

import { DiorySlide } from "./DiorySlide";
import Header from "./Header";

import diographJson from "../mary-json.json";
import { Diograph } from "@diograph/diograph";
import { useNavigate, useParams } from "react-router-dom";
import { getDioryInfo } from "./utils/dioryInfo";
import { useEffect, useState } from "react";
import DiorySwiper from "./DiorySwiper";
import { IDioryObject } from "@diograph/diograph/types";
const diograph = new Diograph(diographJson);

const createDiorySlide = (diory: IDioryObject, key: number) => {
  if (!diory) return null;

  return (
    <SwiperSlide key={key}>
      <DiorySlide diory={diory} />;
    </SwiperSlide>
  );
};

const DiorySwipes = () => {
  // const { focusId } = useParams();
  const navigate = useNavigate();

  // const [storyDiory, setStoryDiory] = useState<any>(null);

  // useEffect(() => {

  //   setStoryDiory(story);

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
