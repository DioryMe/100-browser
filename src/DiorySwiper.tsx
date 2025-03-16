import { Swiper } from "swiper/react";
import "swiper/css";
import styles from "./DiorySwipes.module.css";

import { useParams } from "react-router-dom";
import { getDioryInfo } from "./utils/dioryInfo";
import { ReactNode, useEffect, useState } from "react";
import { IDiory, IDioryObject } from "@diograph/diograph/types";
import { useDiosphereContext } from "./DiosphereContext";

interface Props {
  createSlide: (diory: IDioryObject, key: number) => ReactNode;
}

const DiorySwiper = ({ createSlide }: Props) => {
  const { focusId } = useParams();
  const diograph = useDiosphereContext();

  const [slides, setSlides] = useState<string[]>([]);
  const [prevDioryId, setPrevDioryId] = useState<string>(null);
  const [nextDioryId, setNextDioryId] = useState<string>(null);
  const [storyDiory, setStoryDiory] = useState<IDiory>(null);

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

            const { next: nextId, prev: prevId } = getDioryInfo(
              diograph,
              prevDioryId
            );
            setPrevDioryId(prevId);
            setNextDioryId(nextId);
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
            const { next: nextId, prev: prevId } = getDioryInfo(
              diograph,
              nextDioryId
            );
            setPrevDioryId(prevId);
            setNextDioryId(nextId);

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
