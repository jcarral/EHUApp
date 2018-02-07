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
			subjects : {},
			code: ''
		};
	}

	changeTab = (i) => {
		this.setState({selectedIndex: i});
	}

	goToPath = (path, key) => {
		if(this.selectedIndex === 0) return;

		this.props.navigation.navigate(path, { params : {
				code: key,
				degree: this.state.code
			}
		});
	};
	
	filterTeacher = (txt) => {
		const teachers = this.props.degree.teachers
		let copy = Object.assign({}, teachers);
		Object.keys(teachers).forEach(key => {
			if(!teachers[key].toLowerCase().includes(txt.toLowerCase())) delete copy[key];
		});
		
		this.setState({
			...this.state,
			teachers: copy
		})
	};

	filterSubjects = (txt) => {
		const subjects = this.props.degree.subjects;
		let copy = Object.assign({}, subjects);
		Object.keys(subjects).forEach(key => {
			if(!subjects[key].toLowerCase().includes(txt.toLowerCase())) delete copy[key];
		});

		this.setState({
			...this.state,
			subjects: copy
		});
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
		this.setState({
			...this.state,
			code: params.params.code
		});
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
			subjects={this.state.subjects}
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
