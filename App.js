import React, { Component } from 'react';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';

import { firebase as config } from './app/config';
import store from './app/config/store';
import EHUApp from './app/config/routes';
import { Calendar } from './app/lib';

firebase.initializeApp(config.credentials);
// Calendar.run();

const App = () => (
  <Provider store={store}>
    <EHUApp />
  </Provider>
);

export default App;
