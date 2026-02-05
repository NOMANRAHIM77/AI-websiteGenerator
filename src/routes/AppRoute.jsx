// src/routes/AppRouter.jsx
import Login from "../authentication/Login"
import Signup from "../authentication/Signup";
import Home from '../pages/Home'


import { BrowserRouter, Routes, Route } from "react-router-dom";


function AppRouter() {

  return (
   <>
    <BrowserRouter>
      <Routes>
       <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
     
    </BrowserRouter>
   </>
  );

}

export default AppRouter;
