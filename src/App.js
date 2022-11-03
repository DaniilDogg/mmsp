import "./App.css";
import React, {useState} from "react";
import {useRoutes } from "react-router-dom"
import { NavBar } from "./components/NavBar";

import Lab1_2 from "./components/lab1_2/Lab1_2";
import Lab3 from "./components/lab3/Lab3";
import Lab4 from "./components/lab4/Lab4";

function App() {
  
  return(
    <>
    <NavBar/>
    {
      useRoutes([
        { path: "/", element: <Lab1_2 /> },
        { path: "/mmsp/", element: <Lab1_2 /> },
        { path: "/lab1-2", element: <Lab1_2 /> },
        { path: "/lab3", element: <Lab3 /> },
        { path: "/lab4", element: <Lab4 /> }
      ])
    }
    </>
  )
}

export default App;
