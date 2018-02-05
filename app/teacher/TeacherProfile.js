import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TeacherProfileScreen } from './screens';

class TeacherProfileContainer extends Component{
	render(){
		return (<TeacherProfileScreen />);
	}
}

const mapStateToProps = (state, action) => ({
	
});

export const TeacherProfile = connect(mapStateToProps)(TeacherProfileContainer);
