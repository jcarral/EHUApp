import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DegreeProfileScreen } from './screens';
import { getDegree } from './degree.action';

class DegreeProfileContainer extends Component {

	constructor(props){
		super(props);
		this.state = {
			selectedIndex : 0,
			teachers : {},
			subjects : {}
		};
	}

	changeTab = (i) => {
		this.setState({selectedIndex: i});
	}

	goToPath = (path, params) => {

	};
	
	filterTeacher = (txt) => {
		let copy = this.props.degree.teachers;
		console.log(txt, copy);
		Object.keys(this.props.degree.teachers).forEach(key => {
			if(!this.props.degree.teachers[key].toLowerCase().includes(txt.toLowerCase())) delete copy[key];
		});
		
		this.setState({
			...this.state,
			teachers: copy
		})
	};

	filterSubjects = (txt) => {

	};

	componentWillReceiveProps = (nextProps) => {
		console.log(nextProps)
		this.setState({
			...this.state,
			subjects: nextProps.degree.subjects,
			teachers: nextProps.degree.teachers
		});
	}
	
	componentWillMount = () => {
		const { params } = this.props.navigation.state;
		this.props.dispatch(getDegree(params.params));
	}

	render() {
		const buttons = ['Información', 'Asignaturas', 'Profesores'];
		console.log(this.props.degree.teachers)
		return (<DegreeProfileScreen 
			buttons={buttons}
			searching={this.props.searching}
			error={this.props.error}
			degreeData={this.props.degree.data}
			teachers={this.state.teachers}
			goToPath={this.goToPath}
			selectedIndex={this.state.selectedIndex}
			changeTab={this.changeTab}
			filterTeacher={this.filterTeacher}
			filterSubjects={this.filterSubjects}
		/>);
	}	
}

const mapStateToProps = (state, action) => ({
	degree: state.degree.degree,
	error: state.degree.error,
	searching: state.degree.searching
});

export const DegreeProfile = connect(mapStateToProps)(DegreeProfileContainer);
