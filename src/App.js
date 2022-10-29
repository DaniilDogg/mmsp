import "./App.css";
import React, {useState} from "react";
import {useRoutes } from "react-router-dom"
import { NavBar } from "./components/NavBar";

import Lab1_2 from "./components/lab1_2/Lab1_2";
import Lab3 from "./components/lab3/Lab3";

function App() {
  
  return(
    <>
    <NavBar/>
    {
      useRoutes([
        { path: "/", element: <Lab1_2 /> },    
        { path: "/mmsp", element: <Lab1_2 /> },
        { path: "/mmsp/lab1", element: <Lab1_2 /> },
        { path: "/mmsp/lab2", element: <Lab3 /> }
      ])
    }
    </>
  )
}

export default App;
