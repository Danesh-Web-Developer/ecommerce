import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Favourite from './pages/Favourite.jsx';
import Cart from './pages/Cart.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import MyProvider from './Context/Myprovider.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Order from './pages/Order.jsx';
import Addproduct from './pages/Addproduct.jsx';
import Products from './pages/Products.jsx';
import Productdetails from './pages/Productdetails.jsx';
import Mycontext from './Context/Mycontext.jsx';
import Checkout from './pages/Checkout.jsx';

const publicRoute = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/product', element: <Products /> },
  { path: '/productdetails/:id', element: <Productdetails /> },
];

const user = [
  { path: '/profile', element: <Profile /> },
  { path: '/cart', element: <Cart /> },
  { path: '/favourite', element: <Favourite /> },
  { path: '/checkout', element: <Checkout /> },
];

const admin = [
  { path: '/dashboard/*', element: <Dashboard /> },
  { path: '/order', element: <Order /> },
  { path: '/addproduct', element: <Addproduct /> },
  { path: '/addproduct/:id', element: <Addproduct /> },
];

const App = () => {
  const { role } = useContext(Mycontext);
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          {publicRoute.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          {role === "user" &&
            user.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          {role === "admin" &&
            admin.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
      </BrowserRouter>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(
  <MyProvider>
    <App />
  </MyProvider>
)
