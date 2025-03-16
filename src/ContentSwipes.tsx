import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./ContentSwipes.module.css";
import { IDioryObject } from "@diograph/diograph/types";
import { useNavigate } from "react-router-dom";
import DiorySwiper from "./DiorySwiper";
import { ContentSlide } from "./ContentSlide";

const createContentSlide = (diory: IDioryObject, key: number) => {
  if (!diory) return null;

  return (
    <SwiperSlide key={key}>
      <ContentSlide diory={diory} />
    </SwiperSlide>
  );
};

const ContentSwipes = () => {
  return <DiorySwiper createSlide={createContentSlide} />;
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
