import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubjectProfileScreen } from './screens';

class SubjectProfileContainer extends Component {
	render() {
		return (<SubjectProfileScreen />);
	}
}

const mapStateToProps = (state, action) => ({

});

export const SubjectProfile = connect(mapStateToProps)(SubjectProfileContainer);
