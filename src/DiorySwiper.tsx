import { Swiper } from "swiper/react";
import "swiper/css";
import styles from "./DiorySwipes.module.css";

import { useParams } from "react-router-dom";
import { getDioryInfo } from "./utils/dioryInfo";
import { ReactNode, useEffect, useState } from "react";
import { IDioryObject } from "@diograph/diograph/types";
import { useDiosphereContext } from "./DiosphereContext";

interface Props {
  createSlide: (diory: IDioryObject, key: number) => ReactNode;
}

const DiorySwiper = ({ createSlide }: Props) => {
  const { focusId } = useParams();
  const { diograph, setStoryDiory, storyDiory } = useDiosphereContext();

  const [slides, setSlides] = useState<string[]>([]);
  const [prevDioryId, setPrevDioryId] = useState<string>(null);
  const [nextDioryId, setNextDioryId] = useState<string>(null);

  const [swiper, setSwiper] = useState(null);

  // On route load or when navigating via link from other page
  useEffect(() => {
    if (diograph && focusId) {
      const { story, next, prev } = getDioryInfo(diograph, focusId);
      const newSlides = [prev, focusId, next];
      setSlides(newSlides);
      setNextDioryId(next);
      setPrevDioryId(prev);
      setStoryDiory(story);

      if (swiper) {
        swiper.slideTo(prev ? 1 : 0, 0, false);
      }
    }
  }, [focusId, swiper, diograph]);

  return (
    storyDiory && (
      <div className={styles.swiperContainer}>
        <Swiper
          onSwiper={setSwiper}
          speed={200}
          runCallbacksOnInit={false}
          // On swipe back on Diory or Content views
          // - do nothing if you can't swipe to next
          // - update url to indicate focus change
          // - retrieve next diory's diory info and update the state
          // - add slide if there is next diory doesn't exist yet
          onSlidePrevTransitionStart={(swiper) => {
            if (!prevDioryId) return;
            window.history.replaceState(null, "Diory", `/diory/${prevDioryId}`);

            const {
              next: nextId,
              prev: prevId,
              story,
            } = getDioryInfo(diograph, prevDioryId);
            setPrevDioryId(prevId);
            setNextDioryId(nextId);
            setStoryDiory(story);

            if (prevId && !slides.includes(prevId)) {
              setSlides((slides) => [prevId, ...slides]);
              // After adding slide in the beginning we need to recalibrate the activeIndex
              swiper.slideTo(swiper.activeIndex + 1, 0, false);
            }
          }}
          // On swipe next on Diory or Content views
          // - almost same as swipe back
          onSlideNextTransitionStart={(swiper) => {
            if (!nextDioryId) return;

            window.history.replaceState(null, "Diory", `/diory/${nextDioryId}`);

            const {
              next: nextId,
              prev: prevId,
              story,
            } = getDioryInfo(diograph, nextDioryId);
            setPrevDioryId(prevId);
            setNextDioryId(nextId);
            setStoryDiory(story);

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
