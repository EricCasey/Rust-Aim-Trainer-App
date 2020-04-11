// VANILLA REACT STUFF
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "./semantic/dist/semantic.min.css";

import registerServiceWorker from './registerServiceWorker';

// REDUX STUFF / REACT-REDUX STUFF
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import reducers from './rr_reducers';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-80545425-3');
ReactGA.pageview(window.location.pathname + window.location.search);

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
                <Provider store={createStoreWithMiddleware(reducers)}>
                  <App />
                </Provider>, document.getElementById('root')
              );
registerServiceWorker();




