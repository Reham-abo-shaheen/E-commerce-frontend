import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./Css/all.min.css"
import "./Css/bootstrap.min.css"
import "./Css/bootstrap.min.css.map"
import "./Css/components/form.css"
import "./Css/components/button.css"
import "./Css/components/Msg.css"
import "./Css/components/Loading.css"
import "./Css/components/Google.css"
import "./Css/base/media.css"
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import MenuContext from './Context/MenuContext';
import WindowContext from './Context/WindowContext';
import SearchContext from './Context/SearchContext';
import 'react-loading-skeleton/dist/skeleton.css'
import CartContext from './Context/CartContext';
// import "./custom.css"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <CartContext>
          <SearchContext>
            <Router>
              <App />
            </Router>
          </SearchContext>
        </CartContext>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);
