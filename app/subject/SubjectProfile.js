import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubjectProfileScreen } from './screens';
import { getSubject } from './subject.action';
import { startSearching } from '../teacher';

class SubjectProfileContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIndex : 0
		}
	}

	componentWillMount = () => {
		const { params } = this.props.navigation.state;
		this.props.dispatch(getSubject(params.params));
	}

	changeTab = (index) => {
		this.setState({selectedIndex: index});
	}

	goToPath = (code, degree) => {
		this.props.dispatch(startSearching());
		this.props.navigation.navigate('TeacherProfile', {
			params: {
				code,
				degree 
			}
		});
	}

	render() {
		console.log(this.props.subject, this.props.searching, this.props.error);
		return (<SubjectProfileScreen 
			searching={this.props.searching}
			error={this.props.error}
			subject={this.props.subject}
			selectedIndex={this.state.selectedIndex}
			changeTab={this.changeTab}
			goToPath={this.goToPath}
		/>);
	}
}

const mapStateToProps = (state, action) => ({
	subject : state.subject.subject,
	searching: state.subject.searching,
	error: state.subject.error
});

export const SubjectProfile = connect(mapStateToProps)(SubjectProfileContainer);
