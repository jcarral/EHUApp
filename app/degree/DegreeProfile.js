import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DegreeProfileScreen } from './screens';
import { getDegree } from './degree.action';
import { Translate } from '../lib';

class DegreeProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      teachers: {},
      subjects: {},
      code: '',
      modalVisible: false,
    };
  }

  componentWillMount = () => {
    const { params } = this.props.navigation.state;
    this.props.dispatch(getDegree(params.params));
    this.setState({
      ...this.state,
      code: params.params.code,
    });
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      ...this.state,
      subjects: nextProps.degree.subjects,
      teachers: nextProps.degree.teachers,
    });
  }

  changeTab = (i) => {
    this.setState({ selectedIndex: i });
  }

  goToPath = (path, key) => {
    if (this.selectedIndex === 0) return;

    this.props.navigation.navigate(path, {
      params: {
        code: key,
        degree: this.state.code,
      },
    });
  };

  openModal = () => {
    this.setState({ modalVisible: true });
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
  }

  filterTeacher = (txt) => {
    const { teachers } = this.props.degree;
    const copy = Object.assign({}, teachers);
    Object.keys(teachers).forEach((key) => {
      if (!teachers[key].toLowerCase().includes(txt.toLowerCase())) delete copy[key];
    });

    this.setState({
      ...this.state,
      teachers: copy,
    });
  };

  filterSubjects = (txt) => {
    const { subjects } = this.props.degree;
    const copy = Object.assign({}, subjects);
    Object.keys(subjects).forEach((key) => {
      if (!subjects[key].toLowerCase().includes(txt.toLowerCase())) delete copy[key];
    });

    this.setState({
      ...this.state,
      subjects: copy,
    });
  };

  render() {
    const buttons = [
      Translate.t('degree.profile.info'),
      Translate.t('degree.profile.subjects'),
      Translate.t('degree.profile.teachers'),
    ];
    const modal = {
      visible: this.state.modalVisible,
      openModal: this.openModal,
      closeModal: this.closeModal,
    };
    return (
      <DegreeProfileScreen
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
        modal={modal}
      />);
  }
}

const mapStateToProps = (state, action) => ({
  degree: state.degree.degree,
  error: state.degree.error,
  searching: state.degree.searching,
});

export const DegreeProfile = connect(mapStateToProps)(DegreeProfileContainer);
