import React, { Component } from 'react';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';

import { firebase as config } from './app/config';
import store from './app/config/store';
import EHUApp from './app/config/routes';

firebase.initializeApp(config);

export default class App extends Component {
  render() {
    return (
			<Provider store={store}>
					<EHUApp />
			</Provider>
    );
  }
}


