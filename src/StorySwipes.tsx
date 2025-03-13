import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./DiorySwipes.module.css";

// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { contentDiories, contents, stories, storyDiories } from "./App";
import { StorySlide } from "./StorySlide";

const StorySwipes = () => {
  const navigate = useNavigate();
  // const [slides, setSlides] = useState<any>([]);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        {/* <div className={styles.headerSquare}> */}
        <div
          style={{ width: "80px", height: "100%" }}
          className={styles.headerSquare}
        >
          <img src="https://www.svgrepo.com/download/305142/arrow-ios-back.svg" />
        </div>
        <div className={styles.headerText} onClick={() => navigate("/")}>
          My Diory
        </div>
        <div
          style={{ width: "80px", height: "100%" }}
          className={styles.headerSquare}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/640px-Hamburger_icon.svg.png" />
        </div>
      </div>
      <div className={styles.swiperContainer}>
        <Swiper className="mySwiper" speed={200} initialSlide={1}>
          {storyDiories.slice(0, 1).map((diory, i) => {
            return (
              <SwiperSlide key={`swiper-slide-${i}`}>
                <StorySlide
                  key={i}
                  story={diory}
                  images={contentDiories.slice(0, 4)}
                  storyOnClick={() => navigate("/story-content")}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default StorySwipes;
