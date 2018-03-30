import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserEditScreen } from './screens';
import { editProfile } from './user.action';

class UserEditPage extends Component {
  handleUpdateProfile = () => {}
  render() {
    return (<UserEditScreen />);
  }
}

const mapStateToProps = (state, action) => ({
  profile: state.profile,
  user: state.auth,
});

const mapDispatchToProps = dispatch => ({
  updateProfile: (uid, profile) => dispatch(editProfile(uid, profile)),
});

export const UserEdit = connect(mapStateToProps, mapDispatchToProps)(UserEditPage);
