import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom"

import Lab1 from "./components/lab1/Lab1";

function App() {
  return (
    <Routes>
      <Route path="/mmsp" element={<Lab1 />} />
      <Route path="/lab1" element={<Lab1 />} />
    </Routes>
  );
}

export default App;
