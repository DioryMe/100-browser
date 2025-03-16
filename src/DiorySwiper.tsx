import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./DiorySwipes.module.css";

import diographJson from "../mary-json.json";
import { Diograph } from "@diograph/diograph";
import { useNavigate, useParams } from "react-router-dom";
import { getDioryInfo } from "./utils/dioryInfo";
import { ReactNode, useEffect, useState } from "react";
import { IDioryObject } from "@diograph/diograph/types";
const diograph = new Diograph(diographJson);

interface Props {
  createSlide: (diory: IDioryObject, key: number) => ReactNode;
}

const DiorySwiper = ({ createSlide }: Props) => {
  const { focusId } = useParams();
  const navigate = useNavigate();

  const [slides, setSlides] = useState<string[]>([]);
  const [focusDioryId, setFocusDioryId] = useState<any>(null);
  const [prevDioryId, setPrevDioryId] = useState<any>(null);
  const [nextDioryId, setNextDioryId] = useState<any>(null);
  const [storyDiory, setStoryDiory] = useState<any>(null);

  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    const { story, next, prev } = getDioryInfo(diograph, focusId);
    const newSlides = [prev, focusId, next];
    setSlides(newSlides);
    setNextDioryId(next);
    setPrevDioryId(prev);
    setStoryDiory(story);

    if (swiper) {
      setTimeout(() => {
        swiper.slideTo(swiper.activeIndex + (prev ? 1 : 0), 0, false);
      }, 1);
    }
  }, [focusId, swiper]);

  return (
    storyDiory && (
      <div className={styles.swiperContainer}>
        <Swiper
          onSwiper={setSwiper}
          speed={200}
          runCallbacksOnInit={false}
          onSlidePrevTransitionStart={(swiper) => {
            if (!prevDioryId) return;
            window.history.replaceState(null, "Diory", `/diory/${prevDioryId}`);

            const {
              next: nextId,
              prev: prevId,
              focusId,
            } = getDioryInfo(diograph, prevDioryId);
            setPrevDioryId(prevId);
            setNextDioryId(nextId);
            setFocusDioryId(focusId);
            if (prevId && !slides.includes(prevId)) {
              setSlides((slides) => [prevId, ...slides]);
              setTimeout(() => {
                swiper.slideTo(swiper.activeIndex + 1, 0, false);
              }, 1);
            }
          }}
          onSlideNextTransitionStart={(swiper) => {
            if (!nextDioryId) return;
            window.history.replaceState(null, "Diory", `/diory/${nextDioryId}`);
            const {
              next: nextId,
              prev: prevId,
              focusId,
            } = getDioryInfo(diograph, nextDioryId);
            setPrevDioryId(prevId);
            setNextDioryId(nextId);
            setFocusDioryId(focusId);
            if (nextId && !slides.includes(nextId)) {
              setSlides((slides) => [...slides, nextId]);
            }
          }}
        >
          {slides.map((id, i) => {
            if (id) {
              const diory = diograph.getDiory({ id: id });
              return createSlide(diory, i);
            }
            return null;
          })}
        </Swiper>
      </div>
    )
  );
};

export default DiorySwiper;
