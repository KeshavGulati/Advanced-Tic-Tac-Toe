import React, { useEffect, useState } from 'react';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'sonner';
import {toast} from "sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './Pages/Home';
import CpuGame from './Pages/CpuGame';
import Signup from './Pages/Signup';
import Login from './Pages/Login';

const App: React.FC = () => {

  useEffect(() => {
    const timerId = setTimeout(() => {
      toast.success("This is the toast that will be shown.");
    });
  
    return () => {
      clearTimeout(timerId);
    };
  }, []); 

  return (
    <Router>
      <Toaster position='top-right' richColors />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/CpuGame' element={<CpuGame />} />
        <Route path='/Signup' element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App;
