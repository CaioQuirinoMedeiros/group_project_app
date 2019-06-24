import React from 'react';
import './config/StatusBarConfig';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
