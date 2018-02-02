import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './app/config/store';
import EHUApp from './app/config/routes';


export default class App extends Component {
  render() {
    return (
			<Provider store={store}>
				<EHUApp />
			</Provider>
    );
  }
}


