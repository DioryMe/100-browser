import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDiograph } from "./store/diorySlice";
import { RootState, AppDispatch } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Grid from "./Grid";
import HomePage from "./homePage";
import ContentSwipes from "./ContentSwipes";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { diograph } = useSelector((state: RootState) => state.diory);

  useEffect(() => {
    if (!diograph) {
      dispatch(loadDiograph());
    }
  }, [diograph, dispatch]);

  if (!diograph) {
    return <div>Loading diograph...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diory/:focusId/grid" element={<Grid />} />
        <Route path="/diory/:focusId/content" element={<ContentSwipes />} />
        <Route path="/*" element={"Not found"} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
