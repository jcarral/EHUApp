import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TeacherProfileScreen } from './screens';
import { getTeacher } from '.';

class TeacherProfileContainer extends Component{
	constructor(props){
		super(props);	
	}
	
	componentWillMount = () => {
		const { params } = this.props.navigation.state;
		this.props.dispatch(getTeacher(params.params));
	}

	render(){
		return (<TeacherProfileScreen 
			searching={this.props.searching}
			data={this.props.teacher}
			error={this.props.error}
		/>);
	}
}

const mapStateToProps = (state, action) => ({
	searching: state.teacher.searching,
	teacher: state.teacher.teacherData,
	error: state.teacher.error
});

export const TeacherProfile = connect(mapStateToProps)(TeacherProfileContainer);
