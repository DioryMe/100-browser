import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./ContentSwipes.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import diographJson from "../mary-json.json";
import { Diograph } from "@diograph/diograph";
import { getDioryInfo } from "./utils/dioryInfo";
const diograph = new Diograph(diographJson);

const ContentSwipes = () => {
  const { focusId } = useParams();
  const navigate = useNavigate();

  const [slides, setSlides] = useState<any>([]);
  const [focusDioryId, setFocusDioryId] = useState<any>(null);
  const [prevDioryId, setPrevDioryId] = useState<any>(null);
  const [nextDioryId, setNextDioryId] = useState<any>(null);

  const [swiper, setSwiper] = useState(null);

  const createSlide = (dioryId: string, i: number) => {
    if (!dioryId) return null;

    const diory = diograph.getDiory({ id: dioryId });
    return (
      <SwiperSlide key={i}>
        <div
          className={styles.fullImage}
          style={{
            cursor: "grab",
          }}
        >
          <img
            onClick={() => navigate(`/diory/${dioryId}`)}
            src={diory && diory.image}
          />
        </div>
      </SwiperSlide>
    );
  };

  useEffect(() => {
    const { story, next, prev } = getDioryInfo(diograph, focusId);
    const newSlides = [prev, focusId, next].map((id, i) => createSlide(id, i));
    setSlides(newSlides);
    setNextDioryId(next);
    setPrevDioryId(prev);

    if (swiper) {
      setTimeout(() => {
        swiper.slideTo(swiper.activeIndex + (prev ? 1 : 0), 0, false);
      }, 1);
    }
  }, [focusId, swiper]);

  return (
    <Swiper
      onSwiper={setSwiper}
      speed={200}
      runCallbacksOnInit={false}
      onSlidePrevTransitionStart={(swiper) => {
        if (!prevDioryId) return;
        // navigate(`/diory/${prevDioryId}`);
        const {
          next: nextId,
          prev: prevId,
          focusId,
        } = getDioryInfo(diograph, prevDioryId);
        setPrevDioryId(prevId);
        setNextDioryId(nextId);
        setFocusDioryId(focusId);
        if (prevId) {
          const prevSlide = createSlide(prevId, Date.now());
          setSlides((slides) => [prevSlide, ...slides]);
          setTimeout(() => {
            swiper.slideTo(swiper.activeIndex + 1, 0, false);
          }, 1);
        }
      }}
      onSlideNextTransitionStart={(swiper) => {
        if (!nextDioryId) return;
        // navigate(`/diory/${nextDioryId}`);
        const {
          next: nextId,
          prev: prevId,
          focusId,
        } = getDioryInfo(diograph, nextDioryId);
        setPrevDioryId(prevId);
        setNextDioryId(nextId);
        setFocusDioryId(focusId);
        if (nextId) {
          const nextSlide = createSlide(nextId, Date.now());
          setSlides((slides) => [...slides, nextSlide]);
        }
      }}
    >
      {slides}
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
