import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./DiorySwipes.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DiorySwipes = () => {
  const navigate = useNavigate();
  // const [slides, setSlides] = useState<any>([]);

  const url =
    "https://media.istockphoto.com/id/636379014/fi/valokuva/k%C3%A4det-muodostavat-syd%C3%A4men-muodon-auringonlaskun-siluetti.jpg?s=1024x1024&w=is&k=20&c=hCdUB-xdu_FwJNRUq23AfFSOKCqDQ8_eeLMaV9yup5s=";
  const url2 =
    "https://www.worldphoto.org/sites/default/files/default-media/Piercy.jpg";
  const url3 = "http://diory-demo-content.surge.sh/demo-content.png";

  return (
    <Swiper className="mySwiper" speed={200} initialSlide={1}>
      {[url, url2, url3].map((imageUrl, i) => {
        return (
          <SwiperSlide key={i}>
            <div className="flex-container column">
              <div className="flex-item">Image123</div>
              <div className="flex-item">
                <div className="image-container">
                  <img onClick={() => navigate("/content")} src={imageUrl} />
                </div>
              </div>
              <div className="flex-item">Info</div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default DiorySwipes;
