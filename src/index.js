import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App';

import { Login } from './components/index';


function Router(){

  return(
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login/>} />
            <Route exact path='/movies' element={<App />}/>
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Router />
);
