import { Routes, Route } from "react-router-dom";


import Home from '../pages/Home';
import Register from "../pages/Register";
import Admin from "../pages/Admin";

import Protection from "./protection";

function RoutesApp() {
     return (
          <Routes>
               <Route
                    //caminho
                    path="/"
                    //componete renderizado 
                    element={<Home />}
               />

               <Route
                    //caminho
                    path="/register"
                    //componete renderizado 
                    element={<Register />}
               />

               <Route
                    //caminho
                    path="/admin"
                    //componete renderizado e protegido pelo componete Protection
                    element={
                         <Protection>
                              <Admin />
                         </Protection>}
               />
          </Routes>
     )

}

export default RoutesApp;