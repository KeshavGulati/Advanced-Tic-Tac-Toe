import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Home from './Pages/Home.tsx'
import CpuGame from './Pages/CpuGame.tsx'
import Login from './Pages/Login.tsx'
import Signup from './Pages/Signup.tsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { UserIconProvider } from './Components/UserChoiceContext.tsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const router = createBrowserRouter([
    {
	path: '/',
	element: <Navigate to="/Login" replace />
    },
    {
  path: '/Login',
  element: <Login />
    }
    ,
    {
  path: '/Signup',
  element: <Signup /> 
    }
    ,
    {
	path: '/Home/:firstname/:lastname/:username/:email',
	element: <Home />,
    },
    {
	path: '/CpuGame',
	element: <CpuGame />
    }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer />
    <UserIconProvider>
    	<RouterProvider router={router} />
    </UserIconProvider>
  </StrictMode>,
)
