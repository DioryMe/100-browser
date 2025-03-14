import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./ContentSwipes.module.css";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import diographJson from "../mary-json.json";
import { Diograph } from "@diograph/diograph";
import { getDioryInfo } from "./utils/dioryInfo";
const diograph = new Diograph(diographJson);

const ContentSwipes = () => {
  // const [slides, setSlides] = useState<any>([]);
  const navigate = useNavigate();
  const { focusId } = useParams();

  const { story, focus, next, prev } = getDioryInfo(diograph, focusId);

  const linkedDiories = story.links.map((l) => diograph.getDiory({ id: l.id }));

  return (
    <Swiper speed={200} initialSlide={0}>
      {linkedDiories.map((diory, i) => {
        return (
          <SwiperSlide key={i}>
            <div
              className={styles.fullImage}
              style={{
                cursor: "grab",
              }}
            >
              <img
                onClick={() => navigate(`/diory/${focusId}`)}
                src={diory && diory.image}
              />
            </div>
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
