import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./homePage";
import "./App.css";
import ContentSwipes from "./ContentSwipes";
import DiorySwipes from "./DiorySwipes";
import { DiosphereProvider } from "./DiosphereContext";

import diograph from "../mary-json.json";
export const storyDiories = [diograph["e07c2f1d-5f5a-488a-a505-34f7b9f55105"]];
export const contentDiories = storyDiories[0].links.map(
  (link) => diograph[link.id]
);

const App = () => {
  return (
    <DiosphereProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/diory/:focusId" element={<DiorySwipes />} />
          <Route path="/diory/:focusId/content" element={<ContentSwipes />} />
          <Route path="/*" element={"Not found"} />
        </Routes>
      </BrowserRouter>
    </DiosphereProvider>
  );
};

export default App;
