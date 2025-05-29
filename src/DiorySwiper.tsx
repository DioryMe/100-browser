import { Swiper } from "swiper/react";
import "swiper/css";
import styles from "./DiorySwipes.module.css";

import { ReactNode, useEffect, useState } from "react";
import { IDioryObject } from "@diograph/diograph/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import { Diograph } from "@diograph/diograph";
import { setFocus } from "./store/diorySlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface Props {
  createSlide: (diory: IDioryObject, key: number) => ReactNode;
}

const DiorySwiper = ({ createSlide }: Props) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { focusId: urlParamFocusId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { diograph, storyId, focusId, prevId, nextId } = useSelector(
    (state: RootState) => state.diory
  );

  const [slides, setSlides] = useState<string[]>([]);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    // if (focusId) {
    //   navigate(`/diory/${focusId}/content?storyId=${storyId}`);
    //   return;
    // }
    if (!focusId && urlParamFocusId) {
      const storyId = new URLSearchParams(search).get("storyId");
      dispatch(setFocus({ focusId: urlParamFocusId, storyId }));
    }
  }, [focusId, urlParamFocusId]);

  // On route load or when navigating via link from other page
  useEffect(() => {
    if (diograph && focusId) {
      const newSlides = [prevId, focusId, nextId];
      setSlides(newSlides);

      dispatch(setFocus({ focusId, storyId }));

      if (swiper) {
        // Couldn't get transition from Riverfest photo to event without this
        setTimeout(() => {
          swiper.slideTo(prevId ? 1 : 0, 0, false);
        }, 1);
      }
    }
  }, [focusId, swiper, diograph]);

  return (
    focusId && (
      <div className={styles.swiperContainer}>
        <Swiper
          onSwiper={setSwiper}
          speed={200}
          runCallbacksOnInit={false}
          // On swipe back on Diory or Content views
          // - do nothing if you can't swipe to nextId
          // - update url to indicate focus change
          // - retrieve nextId diory's diory info and update the state
          // - add slide if there is nextId diory doesn't exist yet
          onSlidePrevTransitionStart={(swiper) => {
            if (!prevId) return;
            window.history.replaceState(
              null,
              "Diory",
              `/diory/${prevId}/content?storyId=${storyId}`
            );

            dispatch(setFocus({ focusId: prevId }));

            if (prevId && !slides.includes(prevId)) {
              setSlides((slides) => [prevId, ...slides]);
              // After adding slide in the beginning we need to recalibrate the activeIndex
              swiper.slideTo(swiper.activeIndex + 1, 0, false);
            }
          }}
          // On swipe nextId on Diory or Content views
          // - almost same as swipe back
          onSlideNextTransitionStart={(swiper) => {
            if (!nextId) return;

            window.history.replaceState(
              null,
              "Diory",
              `/diory/${nextId}/content?storyId=${storyId}`
            );

            if (nextId && !slides.includes(nextId)) {
              setSlides((slides) => [...slides, nextId]);
            }
            dispatch(setFocus({ focusId: nextId }));
          }}
        >
          {slides.map((id, i) => {
            if (id) {
              const diographInstance = new Diograph(diograph);
              const diory = diographInstance.getDiory({ id: id });
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
