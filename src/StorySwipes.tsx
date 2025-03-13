import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./DiorySwipes.module.css";

// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { contents, stories } from "./App";
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
          {stories.slice(0, 3).map(([imageUrl], i) => {
            return (
              <SwiperSlide key={`swiper-slide-${i}`}>
                <StorySlide
                  key={i}
                  storyImageUrl={imageUrl}
                  images={contents.slice(0, 3).map((s) => s[0])}
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
