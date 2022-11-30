import "./App.css";
import React, {useState} from "react";
import {useRoutes } from "react-router-dom"
import { NavBar } from "./labs/NavBar";

import Lab1_2 from "./labs/lab1_2/Lab1_2";
import Lab3 from "./labs/lab3/Lab3";
import Lab4 from "./labs/lab4/Lab4";
import Lab5 from "./labs/lab5/Lab5";
import Lab6 from "./labs/lab6/Lab6";
import Lab7 from "./labs/lab7/Lab7";
import Lab8 from "./labs/lab8/Lab8";
import Lab9 from "./labs/lab9/Lab9";

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
        { path: "/lab4", element: <Lab4 /> },
        { path: "/lab5", element: <Lab5 /> },
        { path: "/lab6", element: <Lab6 /> },
        { path: "/lab7", element: <Lab7 /> },
        { path: "/lab8", element: <Lab8 /> },
        { path: "/lab9", element: <Lab9 /> },
      ])
    }
    </>
  )
}

export default App;
