import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserEditScreen } from './screens';
import { LoadingScreen } from '../components';
import { editProfile, fetchProfile } from './user.action';
import { Translate, navigateTo } from '../lib';

class UserEditPage extends Component {
  constructor() {
    super();
    this.state = {
      gender: '',
      displayName: '',
      birthdate: '',
    };
  }

  componentWillMount = () => {
    const { gender, birthdate, displayName } = this.props;
    this.setState({
      gender: gender || 'other',
      displayName: displayName || '',
      birthdate: birthdate || '1900-01-01',
    });
  }
  handleUpdateProfile = async () => {
    const { navigation, updateProfile } = this.props;
    await updateProfile(this.state);
    navigateTo('UserNavigator', navigation);
  }

  handleNavigation = (path) => {
    const { navigation } = this.props;
    navigation.navigate(path);
  }

  handleChangeText = (key, value) => {
    const tmpState = {};
    tmpState[key] = value;
    this.setState(Object.assign({}, this.state, tmpState));
  }

  render() {
    const { fetching } = this.props;
    const genders = [
      {
        label: Translate.t('user.edit.male'),
        value: 'male',
      },
      {
        label: Translate.t('user.edit.female'),
        value: 'female',
      },
      {
        label: Translate.t('user.edit.other'),
        value: 'other',
      },
    ];
    if (fetching) return (<LoadingScreen />);
    return (
      <UserEditScreen
        genders={genders}
        values={this.state}
        handleChangeText={this.handleChangeText}
        handleNavigation={this.handleNavigation}
        handleUpdateProfile={this.handleUpdateProfile}
      />);
  }
}

const mapStateToProps = (state, action) => ({
  displayName: (state.profile.data) ? state.profile.data.displayName : undefined,
  birthdate: (state.profile.data) ? state.profile.data.birthdate : undefined,
  gender: (state.profile.data) ? state.profile.data.gender : undefined,
  loading: state.profile.data.fetching,
  user: state.auth,
});

const mapDispatchToProps = dispatch => ({
  updateProfile: profile => dispatch(editProfile(profile)),
  handleFetchProfile: () => dispatch(fetchProfile()),
});

export const UserEdit = connect(mapStateToProps, mapDispatchToProps)(UserEditPage);
