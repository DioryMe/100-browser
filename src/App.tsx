import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./homePage";
import "./App.css";
import ContentSwipes from "./ContentSwipes";
import DiorySwipes from "./DiorySwipes";

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
