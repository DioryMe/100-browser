import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./DiorySwipes.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DiorySwipes = () => {
  const navigate = useNavigate();
  // const [slides, setSlides] = useState<any>([]);

  const url =
    "https://media.istockphoto.com/id/636379014/fi/valokuva/k%C3%A4det-muodostavat-syd%C3%A4men-muodon-auringonlaskun-siluetti.jpg?s=1024x1024&w=is&k=20&c=hCdUB-xdu_FwJNRUq23AfFSOKCqDQ8_eeLMaV9yup5s=";
  const url2 =
    "https://www.worldphoto.org/sites/default/files/default-media/Piercy.jpg";
  const url3 = "http://diory-demo-content.surge.sh/demo-content.png";

  const imageUrl = url2;

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div>
          <img src="https://www.svgrepo.com/download/305142/arrow-ios-back.svg" />
        </div>
        <div className={styles.headerText}>Diory 1</div>
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/640px-Hamburger_icon.svg.png" />
        </div>
      </div>
      <div className={styles.swiperContainer}>
        <Swiper className="mySwiper" speed={200} initialSlide={1}>
          {[url, url2, url3].map((imageUrl, i) => {
            return (
              <SwiperSlide key={i}>
                <div className={styles.swiperSlideContainer}>
                  <div className={styles.image}>
                    <img onClick={() => navigate("/content")} src={imageUrl} />
                  </div>
                  <div className={styles.infoSectionContainer}>
                    <div></div>
                    <div className={styles.infoContainer}>
                      <div className={styles.infoColumn}>
                        <div className={styles.fieldLabel}>Date:</div>
                        <div>12.12.2012</div>
                      </div>
                      <div className={styles.infoColumn}>
                        <div className={styles.fieldLabel}>Latlng:</div>
                        <div>64.42848, 41.58833</div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                  <div></div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default DiorySwipes;
