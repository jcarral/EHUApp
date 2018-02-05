import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DegreeProfileScreen } from './screens';

class DegreeProfileContainer extends Component {
	render() {
		return (<DegreeProfileScreen />);
	}
}

const mapStateToProps = (state, action) => ({

});

export const DegreeProfile = connect(mapStateToProps)(DegreeProfileContainer);
