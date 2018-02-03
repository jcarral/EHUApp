import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SearchScreen } from './screens';
import { searchText } from '../../lib';

class SearchContainer extends Component{

	constructor(props){
		super(props);

		this.state = {
			text : '',
			results : []
		};


	}

	onFinish = async () => {
		const results = await searchText(this.state.text);
		this.setState({results});
	}

	onChange = (input) => {
		this.setState({
			text: input,
			results : []
		})
	}

	render(){
		return (<SearchScreen onChange={this.onChange} onFinish={this.onFinish} results={this.state.results}/>);
	}
}

const mapStateToProps = (state, action) => ({

});

export const Search = connect(mapStateToProps)(SearchContainer);
