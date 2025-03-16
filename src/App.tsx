import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./homePage";
import "./App.css";
import ContentSwipes from "./ContentSwipes";
import DiorySwipes from "./DiorySwipes";
import { DiosphereProvider } from "./DiosphereContext";

const App = () => {
  // NOTE: The whole app re-renders when context changes
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
