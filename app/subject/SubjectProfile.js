import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubjectProfileScreen } from './screens';
import { getSubject } from './subject.action';
import { startSearching } from '../teacher';
import { Translate } from '../lib';

class SubjectProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  componentWillMount = () => {
    const { params } = this.props.navigation.state;
    this.props.dispatch(getSubject(params.params));
  }

  changeTab = (index) => {
    this.setState({ selectedIndex: index });
  }

  goToPath = (code, grade) => {
    this.props.dispatch(startSearching());
    this.props.navigation.navigate('TeacherProfile', {
      params: {
        code,
        grade,
      },
    });
  }

  render() {
    const buttons = [
      Translate.t('subject.profile.summary'),
      Translate.t('subject.profile.detail'),
      Translate.t('subject.profile.schedule'),
    ];
    return (<SubjectProfileScreen
      searching={this.props.searching}
      error={this.props.error}
      subject={this.props.subject}
      selectedIndex={this.state.selectedIndex}
      changeTab={this.changeTab}
      goToPath={this.goToPath}
      buttons={buttons}
    />);
  }
}

const mapStateToProps = (state, action) => ({
  subject: state.subject.subject,
  searching: state.subject.searching,
  error: state.subject.error,
});

export const SubjectProfile = connect(mapStateToProps)(SubjectProfileContainer);
