import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { UserSubscriptionsScreen } from './screens';
import { LoadingScreen } from '../components';
import { Helper } from '../lib';

class UserSubscriptionContainer extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: null,
    };
  }

  componentWillMount = () => {
    this.updateDataSource(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    this.updateDataSource(nextProps);
  }

  updateDataSource = (props) => {
    const { subjects = {}, teachers = {} } = props;
    const subjectsList = Object.keys(subjects).map(key => ({ name: subjects[key].name, type: 'subject', key }));
    const teachersList = Object.keys(teachers).map(key => ({ name: teachers[key], type: 'teacher', key }));
    const categoryMap = {
      subjects: subjectsList,
      teachers: teachersList,
    };
    this.setState({
      dataSource: this.ds.cloneWithRowsAndSections(categoryMap),
    });
  }

  ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
  });

  handleNavigateTo = (type, key) => {
    const { navigation } = this.props;
    const params = key.split('_');
    const navigationParams = {
      code: params[0],
      degree: params[1],
    };
    if (type === 'subject' && Helper.hasProperty(navigationParams, 'code') && Helper.hasProperty(navigationParams, 'degree')) {
      navigation.navigate('SubjectProfile', { params: navigationParams });
    } else if (type === 'teacher' && Helper.hasProperty(navigationParams, 'code') && Helper.hasProperty(navigationParams, 'degree')) {
      navigation.navigate('TeacherProfile', { params: navigationParams });
    }
  }

  render() {
    const { dataSource } = this.state;
    const { loading } = this.props;
    if (loading) return (<LoadingScreen />);
    return (
      <UserSubscriptionsScreen
        dataSource={dataSource}
        handleNavigateTo={this.handleNavigateTo}
      />
    );
  }
}

const mapStateToProps = (state, action) => ({
  subjects: state.profile.subjects,
  teachers: state.profile.teachers,
  loading: state.profile.fetching,
});

const mapDispatchToProps = dispatch => ({

});

export const UserSubscriptions =
  connect(mapStateToProps, mapDispatchToProps)(UserSubscriptionContainer);
