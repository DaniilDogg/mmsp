import React from "react";

export const NavBar = ({ title }) => {
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
            >
              <span className="lead">
                Лабораторная работа №1-2
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
            Open
            </button>            
        </div>
        <h4 className="title text-center my-4" style={{flexGrow: '3'}}>{title}</h4>
        <div className="helper-div d-sm-block d-none flex-grow-1"></div>      
      </div>
      
    </div>
  );
};