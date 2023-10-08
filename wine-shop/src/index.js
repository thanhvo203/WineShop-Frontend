import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './component/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailWine from './component/DetailWine';
import ListWine from './component/ListWines';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path="/home/detail/:id" element={<DetailWine />}></Route>
      <Route path='/home/wines' element={<ListWine />}></Route>
    </Routes>
  </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
