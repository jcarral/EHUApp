import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GradeProfileScreen } from './screens';
import { getGrade } from './grade.action';
import { Translate } from '../lib';

class GradeProfileContainer extends Component {

	constructor(props){
		super(props);
		this.state = {
			selectedIndex : 0,
			teachers : {},
			subjects : {},
			code: '',
			modalVisible: false
		};
	}

	changeTab = (i) => {
		this.setState({selectedIndex: i});
	}

	goToPath = (path, key) => {
		if(this.selectedIndex === 0) return;

		this.props.navigation.navigate(path, { params : {
				code: key,
				grade: this.state.code
			}
		});
	};


	openModal = () => {
		this.setState({ modalVisible: true });
	}

	closeModal = () => {
		this.setState({ modalVisible: false });
	}
	
	filterTeacher = (txt) => {
		const teachers = this.props.grade.teachers
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
		const subjects = this.props.grade.subjects;
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
			subjects: nextProps.grade.subjects,
			teachers: nextProps.grade.teachers
		});
	}
	
	componentWillMount = () => {
		const { params } = this.props.navigation.state;
		this.props.dispatch(getGrade(params.params));
		this.setState({
			...this.state,
			code: params.params.code
		});
	}

	render() {
		const buttons = [
      Translate.t('grade.profile.info'), 
      Translate.t('grade.profile.subjects'),
      Translate.t('grade.profile.teachers'),
    ];
		const modal = {
			visible: this.state.modalVisible,
			openModal: this.openModal,
			closeModal: this.closeModal
		};
		return (<GradeProfileScreen 
			buttons={buttons}
			searching={this.props.searching}
			error={this.props.error}
			gradeData={this.props.grade.data}
			teachers={this.state.teachers}
			subjects={this.state.subjects}
			goToPath={this.goToPath}
			selectedIndex={this.state.selectedIndex}
			changeTab={this.changeTab}
			filterTeacher={this.filterTeacher}
			filterSubjects={this.filterSubjects}
			modal={modal}
		/>);
	}	
}

const mapStateToProps = (state, action) => ({
	grade: state.grade.grade,
	error: state.grade.error,
	searching: state.grade.searching
});

export const GradeProfile = connect(mapStateToProps)(GradeProfileContainer);
