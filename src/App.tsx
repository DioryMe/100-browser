import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./homePage";
import "./App.css";
import ContentSwipes from "./ContentSwipes";
import DiorySwipes from "./DiorySwipes";
import StorySwipes from "./StorySwipes";
import StoryContentSwipes from "./StoryContentSwipes";

export const stories = [
  [
    "https://www.publicdomainpictures.net/pictures/190000/velka/travel-background-1469438300Bbk.jpg",
    "image",
  ],
  [
    "https://lh3.ggpht.com/p/AF1QipPeoo0jUW9dEDIbO_xjN1Knn8ZNbE8x84ea9f-1=s1536",
    "image",
  ],
  [
    "https://upload.wikimedia.org/wikipedia/commons/2/21/Downtown_Tampere4.jpg",
    "image",
  ],
];

export const contents = [
  [
    "https://media.istockphoto.com/id/636379014/fi/valokuva/k%C3%A4det-muodostavat-syd%C3%A4men-muodon-auringonlaskun-siluetti.jpg?s=1024x1024&w=is&k=20&c=hCdUB-xdu_FwJNRUq23AfFSOKCqDQ8_eeLMaV9yup5s=",
    "image",
  ],
  [
    "https://www.worldphoto.org/sites/default/files/default-media/Piercy.jpg",
    "image",
  ],
  ["http://diory-demo-content.surge.sh/demo-content.png", "image"],
  [
    "http://diory-demo-content.surge.sh/Diory%20Content/Generic%20content/some-video.mov",
    "video",
  ],
];

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/story" element={<StorySwipes />} />
        <Route path="/diory" element={<DiorySwipes />} />
        <Route path="/story-content" element={<StoryContentSwipes />} />
        <Route path="/content" element={<ContentSwipes />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/*" element={"Not found"} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
