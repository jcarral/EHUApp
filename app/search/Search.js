import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SearchScreen } from './screens';
import { search, changeTab } from '.';

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
		console.log('Changing');
		this.props.dispatch(changeTab(this.state.text, selectedIndex));
	}

	searchItems = async () => {
		const results = await searchByName(this.state.text, this.state.selectedIndex);
		this.setState({ results, loading: false });
	}

	goToPath = (path, index) => {
		let selectedItem;
		if(this.state.selectedIndex === 0){
			selectedItem = this.props.degrees[index];
		}else if(this.state.selectedItem === 1){
			selectedItem = this.props.subjects[index];
		}else{
			selectedItem = this.props.teachers[index];
		};

		this.props.navigation.navigate(path,{
			title: selectedItem.name,
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
