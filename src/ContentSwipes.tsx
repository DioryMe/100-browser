import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./ContentSwipes.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { contentDiories, contents } from "./App";

const ContentSwipes = () => {
  const navigate = useNavigate();
  // const [slides, setSlides] = useState<any>([]);

  return (
    <Swiper className="mySwiper" speed={200} initialSlide={1}>
      {contentDiories.map((diory, i) => {
        return (
          <SwiperSlide key={i}>
            {/* Image */}
            {/* {type !== "video" && ( */}
            <div
              className={styles.fullImage}
              style={{
                cursor: "grab",
              }}
            >
              <img
                onClick={() => navigate("/diory")}
                src={diory && diory.image}
              />
            </div>
            {/* )} */}
            {/* Video */}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ContentSwipes;

// {
//   type === "video" && (
//     <>
//       {/* Swipe-handle and back button */}
//       <div
//         onClick={() => navigate("/diory")}
//         className={styles.grab}
//         /* Styles are not applied via class */
//         style={{
//           color: "white",
//           cursor: "grab",
//           width: "100%",
//           height: "20px",
//           textAlign: "center",
//           fontSize: "30px",
//         }}
//       >
//         |||
//       </div>
//       <div className={styles.fullImage}>
//         <video controls style={{ maxHeight: "90vh", width: "100%" }}>
//           <source src={imageUrl} />
//         </video>
//       </div>
//     </>
//   );
// }
