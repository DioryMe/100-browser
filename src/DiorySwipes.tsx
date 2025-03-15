import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./DiorySwipes.module.css";

import { DiorySlide } from "./DiorySlide";
import Header from "./Header";

import diographJson from "../mary-json.json";
import { Diograph } from "@diograph/diograph";
import { useNavigate, useParams } from "react-router-dom";
import { getDioryInfo } from "./utils/dioryInfo";
import { useEffect, useState } from "react";
import { HashNavigation } from "swiper/modules";
const diograph = new Diograph(diographJson);

const createSlide = (dioryId: string, i: number) => {
  console.log("triggered");
  if (!dioryId) return null;
  console.log("dioryId", dioryId);

  const diory = diograph.getDiory({ id: dioryId });
  return (
    <SwiperSlide key={`swiper-slide-${i}`} data-hash={dioryId}>
      <DiorySlide key={i} diory={diory} />;
    </SwiperSlide>
  );
};

const DiorySwipes = () => {
  const { focusId } = useParams();
  const navigate = useNavigate();

  const [slides, setSlides] = useState<any>([]);
  const [focusDioryId, setFocusDioryId] = useState<any>(null);
  const [prevDioryId, setPrevDioryId] = useState<any>(null);
  const [nextDioryId, setNextDioryId] = useState<any>(null);
  const [storyDiory, setStoryDiory] = useState<any>(null);

  useEffect(() => {
    const { story, next, prev } = getDioryInfo(diograph, focusId);
    const newSlides = [prev, focusId, next].map((id, i) => createSlide(id, i));
    setSlides(newSlides);
    setNextDioryId(next);
    setPrevDioryId(prev);
    setStoryDiory(story);
  }, [focusId]);

  console.log("slide", slides);
  return (
    storyDiory && (
      <div className={styles.container}>
        <Header
          text={storyDiory.text}
          onClick={() =>
            navigate(storyDiory.id === "/" ? "/" : `/diory/${storyDiory.id}`)
          }
        />
        <div className={styles.swiperContainer}>
          <Swiper
            modules={[HashNavigation]}
            speed={200}
            hashNavigation={{ watchState: true }}
            runCallbacksOnInit={false}
            initialSlide={prevDioryId ? 1 : 0}
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
                  swiper.slideTo(swiper.activeIndex + 1, 0);
                }, 0);
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
        </div>
      </div>
    )
  );
};

export default DiorySwipes;
