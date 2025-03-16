import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./DiorySwipes.module.css";

import { DiorySlide } from "./DiorySlide";
import Header from "./Header";

import { useNavigate } from "react-router-dom";
import DiorySwiper from "./DiorySwiper";
import { IDioryObject } from "@diograph/diograph/types";
import { useDiosphereContext } from "./DiosphereContext";

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
  const { storyDiory } = useDiosphereContext();

  return (
    <div className={styles.container}>
      <Header
        text={storyDiory && storyDiory.text}
        onClick={() => {
          navigate(storyDiory.id === "/" ? "/" : `/diory/${storyDiory.id}`);
        }}
      />
      <div className={styles.swiperContainer}>
        <DiorySwiper createSlide={createDiorySlide} />
      </div>
    </div>
  );
};

export default DiorySwipes;
