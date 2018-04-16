import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TeacherProfileScreen } from './screens';
import { getTeacher } from '.';

import { addNewSub, deleteSubscription } from '../user';

class TeacherProfileContainer extends Component {
  state = {
    following: false,
    teacherCode: '',
  };

  componentWillMount = () => {
    const { params } = this.props.navigation.state;
    const { getTeacherAction } = this.props;
    const teacherCode = `${params.params.code}_${params.params.grade}`;
    this.setState({ teacherCode });
    getTeacherAction(params.params);
  }

  componentWillReceiveProps = (nextProps) => {
    const { userTeachers = {} } = nextProps;
    const { following, teacherCode } = this.state;

    this.setState({ following: Object.keys(userTeachers).includes(teacherCode) });
  }

  handleToggleSubscription = async () => {
    const {
      addNewSubAction,
      deleteSubscriptionAction,
      teacher,
      getTeacherAction,
    } = this.props;
    const { params } = this.props.navigation.state;
    const { following, teacherCode } = this.state;
    const tmpSub = {};
    if (!following) {
      tmpSub[teacherCode] = teacher.name;
      await addNewSubAction('teachers', tmpSub);
    } else {
      await deleteSubscriptionAction('teachers', teacherCode);
    }
  }

  render() {
    const { following } = this.state;
    return (<TeacherProfileScreen
      searching={this.props.searching}
      data={this.props.teacher}
      error={this.props.error}
      handleToggleSubscription={this.handleToggleSubscription}
      following={following}
    />);
  }
}

const mapStateToProps = (state, action) => ({
  searching: state.teacher.searching,
  teacher: state.teacher.teacherData,
  userTeachers: state.profile.teachers,
  error: state.teacher.error,
});

const mapDispatchToProps = dispatch => ({
  getTeacherAction: params => dispatch(getTeacher(params)),
  addNewSubAction: (type, data) => dispatch(addNewSub(type, data)),
  deleteSubscriptionAction: (type, key) => dispatch(deleteSubscription(type, key)),
});

export const TeacherProfile = connect(mapStateToProps, mapDispatchToProps)(TeacherProfileContainer);
