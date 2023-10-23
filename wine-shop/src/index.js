import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './component/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailWine from './component/DetailWine';
import ListWines from './component/ListWines';
import Login from './component/Login';
import Resigter from './component/Resigter';
import Layout from './component/Layout';
import Cart from './component/Cart';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import History from './component/History';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/resigter' element={<Resigter />} />
        <Route element={<Layout />}>
          <Route path='/home/history/:id' element={<History />} />
          <Route path='/home/cart/:id' element={<Cart />}/>
          <Route path='/home' element={<Home />} />
          <Route path="/home/detail/:id" element={<DetailWine />}></Route>
          <Route path='/home/wines' element={<ListWines  />}></Route>
        </Route>


      </Routes>
    </BrowserRouter>
    </Provider> 
    <ToastContainer />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
