
import React from "react";
import { Route, Routes } from "react-router";
import DetailView from "./DetailView";
import ListView from "./ListView";
import MainStepper from "./MainStepper";

const MainContent = (props)=>{

        return (
                <Routes>
                    <Route path="/" element={<ListView/>} />
                    <Route path="/new" element={<MainStepper/>} />
                    <Route path="/details/:name" element={<DetailView/>} />
                </Routes>            
        ) ;
}

export default MainContent;