import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./homePage";
import "./App.css";
import ContentSwipes from "./ContentSwipes";
import DiorySwipes from "./DiorySwipes";

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
        <Route path="/" element={<Navigate replace to="/content" />} />
        <Route path="/diory" element={<DiorySwipes />} />
        <Route
          path="/content"
          element={
            <ContentSwipes />
            // <Navigate replace to="/home" />
          }
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/*" element={"Not found"} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
