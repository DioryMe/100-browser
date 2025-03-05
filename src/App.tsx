import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./homePage";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate replace to="/home" />
          }
        />
        <Route
          path="/home"
          element={
            <HomePage />
          }
        />
        <Route
          path="/*"
          element={
            "Not found"
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
