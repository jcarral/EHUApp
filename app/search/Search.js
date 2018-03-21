import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SearchScreen } from './screens';
import { search, changeTab } from '.';
import { startSearching as startSearchingTeacher} from '../teacher/';
import { startSearching as startSearchingSubject } from '../subject/';
import { startSearching as startSearchingDegree } from '../degree/';

class SearchContainer extends Component{

	constructor(props){
		super(props);

		this.state = {
			text : ''
		};
	}

	onFinish = () => {
		this.props.dispatch(search(this.state.text));
	}

	onChange = (input) => {
		this.setState({
			text: input
		});
	}

	updateIndex = async (selectedIndex) => {
		this.props.dispatch(changeTab(this.state.text, selectedIndex));
	}

	searchItems = async () => {
		const results = await searchByName(this.state.text, this.state.selectedIndex);
		this.setState({ results, loading: false });
	}

	goToPath = (path, index) => {
		let selectedItem;
		if(this.props.selectedIndex === 0){
			selectedItem = this.props.degrees[index];
		}else if(this.props.selectedIndex === 1){
			selectedItem = this.props.subjects[index];
			this.props.dispatch(startSearchingSubject);
		}else{
			selectedItem = this.props.teachers[index];
			console.log('ss')
			this.props.dispatch(startSearchingTeacher);
		};
		this.props.navigation.navigate(path, {
			params: selectedItem
		});
	}

	render(){
		const buttons = ['Grados', 'Asignaturas', 'Profesores'];
		
		return (<SearchScreen 
			onChange={this.onChange} 
			onFinish={this.onFinish} 
			buttons={buttons}
			updateIndex={this.updateIndex}
			selectedIndex={this.props.selectedIndex}
			loading={this.props.searching}
			subjects={this.props.subjects}
			teachers={this.props.teachers}
			degrees={this.props.degrees}
			goToPath={this.goToPath}
			/>);
	}
}

const mapStateToProps = (state, action) => ({
	subjects : state.search.subjects,
	teachers : state.search.teachers,
	degrees : state.search.degrees,
	searching : state.search.searching,
	selectedIndex : state.search.selectedIndex
});

export const Search = connect(mapStateToProps)(SearchContainer);
