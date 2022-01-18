import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { Router } from 'react-router-dom';
import {createBrowserHistory} from 'history';

// since our agent.ts is not a react component, and in order to redirect if 404 not found occures
//use browser history object we would be using  "createBrowserHistory". and instead of "BrowserRouter"
//we would be using "Router" below 
// Note: use earlier git version to view before

export const history = createBrowserHistory();

ReactDOM.render(
  // <React.StrictMode> // disable strict mode to allow depreceted code
  // providing store context to our application
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />,
    </Router>
  </StoreContext.Provider>,

  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
