import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDiograph, setDiograph } from "./store/diorySlice";
import { RootState, AppDispatch } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Grid from "./Grid";
import HomePage from "./homePage";
import diograph from "../diograph.json";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const { diograph } = useSelector((state: RootState) => state.diory);

  // Load the diograph only once when the App mounts
  useEffect(() => {
    if (!diograph) {
      dispatch(setDiograph(diograph));
    }
  }, [diograph, dispatch]);

  // You might want to show a loading indicator until the diograph is loaded
  if (!diograph) {
    return <div>Loading diograph...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diory/:focusId/grid" element={<Grid />} />
        {/* <Route path="/diory/:focusId/content" element={<ContentSwipes />} /> */}
        <Route path="/*" element={"Not found"} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
