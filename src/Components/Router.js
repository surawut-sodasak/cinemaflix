import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Lists from "./Cinema/Lists/Lists";
import Detail from "./Cinema/Detail/Detail";
import Theater from "./Cinema/Reservation/Theater";

export default(
    <BrowserRouter>
        <Route component={ Lists } exact path='/'/>
        <Route component={ Detail } exact path="/detail/:id" />
        <Route component={ Theater } exact path="/reservation/:id" />
    </BrowserRouter>
)