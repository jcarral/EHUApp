import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	HomepageScreen
} from './screens';

class HomepageContainer extends Component {
	render(){
		return (<HomepageScreen />);
	}
}

const mapStateToProps = (state, action) => ({

});

export const Homepage = connect(mapStateToProps)(HomepageContainer);
