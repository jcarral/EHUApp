import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SearchScreen } from './screens';
import { search, changeTab } from '.';
import { startSearching as startSearchingTeacher } from '../teacher/';
import { startSearching as startSearchingSubject } from '../subject/';
import { startSearching as startSearchingGrade } from '../grade/';
import { Translate } from '../lib';

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  onFinish = () => {
    this.props.dispatch(search(this.state.text));
  }

  onChange = (input) => {
    this.setState({
      text: input,
    });
  }

  updateIndex = async (selectedIndex) => {
    this.props.dispatch(changeTab(this.state.text, selectedIndex));
  }

  goToPath = (path, index) => {
    let selectedItem;
    if (this.props.selectedIndex === 0) {
      selectedItem = this.props.grades[index];
    } else if (this.props.selectedIndex === 1) {
      selectedItem = this.props.subjects[index];
      this.props.dispatch(startSearchingSubject);
    } else {
      selectedItem = this.props.teachers[index];
      this.props.dispatch(startSearchingTeacher);
    }
    this.props.navigation.navigate(path, {
      params: selectedItem,
    });
  }

  render() {
    const buttons = [
      Translate.t('search.grades'),
      Translate.t('search.subjects'),
      Translate.t('search.teachers'),
    ];

    return (<SearchScreen
      onChange={this.onChange}
      onFinish={this.onFinish}
      buttons={buttons}
      updateIndex={this.updateIndex}
      selectedIndex={this.props.selectedIndex}
      loading={this.props.searching}
      subjects={this.props.subjects}
      teachers={this.props.teachers}
      grades={this.props.grades}
      goToPath={this.goToPath}
    />);
  }
}

const mapStateToProps = (state, action) => ({
  subjects: state.search.subjects,
  teachers: state.search.teachers,
  grades: state.search.grades,
  searching: state.search.searching,
  selectedIndex: state.search.selectedIndex,
});

export const Search = connect(mapStateToProps)(SearchContainer);
