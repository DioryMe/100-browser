import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./ContentSwipes.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContentSwipes = () => {
  const navigate = useNavigate();
  // const [slides, setSlides] = useState<any>([]);

  const contents = [
    [
      "https://media.istockphoto.com/id/636379014/fi/valokuva/k%C3%A4det-muodostavat-syd%C3%A4men-muodon-auringonlaskun-siluetti.jpg?s=1024x1024&w=is&k=20&c=hCdUB-xdu_FwJNRUq23AfFSOKCqDQ8_eeLMaV9yup5s=",
      "image",
    ],
    [
      "https://www.worldphoto.org/sites/default/files/default-media/Piercy.jpg",
      "image",
    ],
    // ["http://diory-demo-content.surge.sh/demo-content.png", "image"],
    [
      "http://diory-demo-content.surge.sh/Diory%20Content/Generic%20content/some-video.mov",
      "video",
    ],
  ];

  return (
    <Swiper className="mySwiper" speed={200} initialSlide={1}>
      {contents.map(([imageUrl, type], i) => {
        return (
          <SwiperSlide key={i}>
            {/* Image */}
            {type !== "video" && (
              <div
                className={styles.fullImage}
                style={{
                  cursor: "grab",
                }}
              >
                <img onClick={() => navigate("/diory")} src={imageUrl} />
              </div>
            )}
            {/* Video */}
            {type === "video" && (
              <>
                {/* Swipe-handle and back button */}
                <div
                  onClick={() => navigate("/diory")}
                  className={styles.grab}
                  /* Styles are not applied via class */
                  style={{
                    color: "white",
                    cursor: "grab",
                    width: "100%",
                    height: "20px",
                    textAlign: "center",
                    fontSize: "30px",
                  }}
                >
                  |||
                </div>
                <div className={styles.fullImage}>
                  <video controls style={{ maxHeight: "90vh", width: "100%" }}>
                    <source src={imageUrl} />
                  </video>
                </div>
              </>
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ContentSwipes;
