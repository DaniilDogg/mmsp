import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const NavBar = () => {
  const [title, setTitle] = useState()
  const navigate = useNavigate();
  const location = useLocation();

  const titles = [
    'Модель колебательного контура',
    'Примеры моделирования физических процессов',
    'Моделирование колебательного контура',
    'Пример моделирования физического процесса «Шахтная клеть»',
    'Пример моделирования физического процесса «Шахтная клеть» (Продолжение)',
    'Моделирование интенсивности гамма-излучения',
    'Разработка модели определения содержания полезного компонента',
    'Математическая модель интенсивности рассеянного гамма-излучения',
    '',
    '',
  ]

  useEffect(()=>{
    if (["/", "/mmsp", "/mmsp/", "/lab1-2"].includes(location.pathname)){
      setTitle(titles[0])
      return
    }
    if (location.pathname == "/lab3"){
      setTitle(titles[1])
      return
    }
    if (location.pathname == "/lab4"){
      setTitle(titles[2])
      return
    }
    if (location.pathname == "/lab5"){
      setTitle(titles[3])
      return
    }
    if (location.pathname == "/lab6"){
      setTitle(titles[4])
      return
    }
    if (location.pathname == "/lab7"){
      setTitle(titles[5])
      return
    }
    if (location.pathname == "/lab8"){
      setTitle(titles[6])
      return
    }
    if (location.pathname == "/lab9"){
      setTitle(titles[7])
      return
    }
    setTitle("Page not found")
  }, [location])

  return (
    <div>

      <div className="offcanvas offcanvas-start" id="demo">
        <div className="offcanvas-header">
          <h3 className="offcanvas-title">Лабораторные Работы</h3>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">

          <div className="d-flex border-bottom border-secondary border-opacity-50">
            <button
              type="button"
              className="btn text-reset flex-grow-1 text-start py-2"
              data-bs-dismiss="offcanvas"
              onClick={()=>{
                navigate("/lab1-2");
              }}
            >
              <span className="lead">
                Лабораторная работа №1-2
              </span>              
            </button>
          </div>

          <div className="d-flex border-bottom border-secondary border-opacity-50">
            <button
              type="button"
              className="btn text-reset flex-grow-1 text-start py-2"
              data-bs-dismiss="offcanvas"
              onClick={()=>{
                navigate("/lab3");
              }}
            >
              <span className="lead">
                Лабораторная работа №3
              </span>
            </button>
          </div>

          <div className="d-flex border-bottom border-secondary border-opacity-50">
            <button
              type="button"
              className="btn text-reset flex-grow-1 text-start py-2"
              data-bs-dismiss="offcanvas"
              onClick={()=>{
                navigate("/lab4");
              }}
            >
              <span className="lead">
                Лабораторная работа №4
              </span>
            </button>
          </div>

          <div className="d-flex border-bottom border-secondary border-opacity-50">
            <button
              type="button"
              className="btn text-reset flex-grow-1 text-start py-2"
              data-bs-dismiss="offcanvas"
              onClick={()=>{
                navigate("/lab5");
              }}
            >
              <span className="lead">
                Лабораторная работа №5
              </span>
            </button>
          </div>

          <div className="d-flex border-bottom border-secondary border-opacity-50">
            <button
              type="button"
              className="btn text-reset flex-grow-1 text-start py-2"
              data-bs-dismiss="offcanvas"
              onClick={()=>{
                navigate("/lab6");
              }}
            >
              <span className="lead">
                Лабораторная работа №6
              </span>
            </button>
          </div>

          <div className="d-flex border-bottom border-secondary border-opacity-50">
            <button
              type="button"
              className="btn text-reset flex-grow-1 text-start py-2"
              data-bs-dismiss="offcanvas"
              onClick={()=>{
                navigate("/lab7");
              }}
            >
              <span className="lead">
                Лабораторная работа №7
              </span>
            </button>
          </div>

          <div className="d-flex border-bottom border-secondary border-opacity-50">
            <button
              type="button"
              className="btn text-reset flex-grow-1 text-start py-2"
              data-bs-dismiss="offcanvas"
              onClick={()=>{
                navigate("/lab8");
              }}
            >
              <span className="lead">
                Лабораторная работа №8
              </span>
            </button>
          </div>

          <div className="d-flex border-bottom border-secondary border-opacity-50">
            <button
              type="button"
              className="btn text-reset flex-grow-1 text-start py-2"
              data-bs-dismiss="offcanvas"
              onClick={()=>{
                navigate("/lab9");
              }}
            >
              <span className="lead">
                Лабораторная работа №9
              </span>
            </button>
          </div>

        </div>
      </div>

      <div className="header d-sm-grid d-flex border-bottom border-secondary rounded border-opacity-50" style={{gridTemplateColumns: '1fr 3fr 1fr'}}>
        <div className="btn-container d-grid align-items-center justify-content-start px-4">
            <button
            className="btn btn-outline-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#demo"
            >
           Меню
            </button>            
        </div>
        <h4 className="title text-center my-4" style={{flexGrow: '3'}}>{title}</h4>
        <div className="helper-div d-sm-block d-none flex-grow-1"></div>      
      </div>
      
    </div>
  );
};