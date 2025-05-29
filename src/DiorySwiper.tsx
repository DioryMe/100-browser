import { Swiper } from "swiper/react";
import "swiper/css";
import styles from "./DiorySwipes.module.css";

import { ReactNode, useEffect, useState } from "react";
import { IDioryObject } from "@diograph/diograph/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import { Diograph } from "@diograph/diograph";
import { setFocus, loadDioryContent } from "./store/diorySlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface Props {
  createSlide: (diory: IDioryObject, key: number) => ReactNode;
}

const DiorySwiper = ({ createSlide }: Props) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { focusId: urlParamFocusId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  // Include contentUrls here
  const { diograph, storyId, focusId, prevId, nextId, contentUrls } =
    useSelector((state: RootState) => state.diory);

  const [slides, setSlides] = useState<string[]>([]);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
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
        // Recalibrate the activeIndex after slide addition.
        setTimeout(() => {
          swiper.slideTo(prevId ? 1 : 0, 0, false);
        }, 1);
      }
    }
  }, [focusId, swiper, diograph]);

  // New effect: Ensure content for current slide diories is loaded in Redux.
  useEffect(() => {
    if (diograph && storyId) {
      const neededIds = [prevId, focusId, nextId].filter((id) => id != null);
      const diographInstance = new Diograph(diograph);
      neededIds.forEach((id) => {
        if (!contentUrls[id]) {
          const diory = diographInstance.getDiory({ id });
          if (diory && diory.data) {
            dispatch(loadDioryContent(diory));
          }
        }
      });
    }
  }, [diograph, storyId, prevId, focusId, nextId, contentUrls, dispatch]);

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
              swiper.slideTo(swiper.activeIndex + 1, 0, false);
            }
          }}
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
