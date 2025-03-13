import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./DiorySwipes.module.css";

// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiorySlide } from "./DiorySlide";
import { contentDiories, contents, stories } from "./App";

const DiorySwipes = () => {
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
        <div className={styles.headerText} onClick={() => navigate("/story")}>
          Story
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
          {contentDiories.slice(0, 4).map((diory, i) => {
            return (
              <SwiperSlide>
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
