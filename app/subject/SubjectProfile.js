import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubjectProfileScreen } from './screens';
import { getSubject } from './subject.action';
import { startSearching } from '../teacher';
import { Translate } from '../lib';
import { addNewSub, deleteSubscription } from '../user';

class SubjectProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      following: false,
      subjectCode: '',
    };
  }

  componentWillMount = () => {
    const { params } = this.props.navigation.state;
    const { getSubjectAction } = this.props;
    const subjectCode = `${params.params.code}_${params.params.grade}`;
    this.setState({ subjectCode });
    getSubjectAction(params.params);
  }

  componentWillReceiveProps = (nextProps) => {
    const { userSubjects = {} } = nextProps;
    const { following, subjectCode } = this.state;

    this.setState({ following: Object.keys(userSubjects).includes(subjectCode) });
  }


  changeTab = (index) => {
    this.setState({ selectedIndex: index });
  }

  goToPath = (code, grade) => {
    const { startSearchingAction } = this.props;
    startSearchingAction();
    this.props.navigation.navigate('TeacherProfile', {
      params: {
        code,
        grade,
      },
    });
  }

  handleToggleSubscription = async () => {
    const {
      addNewSubAction,
      deleteSubscriptionAction,
      subject,
    } = this.props;
    const { following, subjectCode } = this.state;
    const tmpSub = {};
    if (!following) {
      tmpSub[subjectCode] = (subject.detail) ? subject.detail.name : '';
      await addNewSubAction('subjects', tmpSub);
    } else {
      await deleteSubscriptionAction('subjects', subjectCode);
    }
  }

  render() {
    const { following } = this.state;
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
      handleToggleSubscription={this.handleToggleSubscription}
      following={following}
    />);
  }
}

const mapStateToProps = (state, action) => ({
  subject: state.subject.subject,
  searching: state.subject.searching,
  error: state.subject.error,
  userSubjects: state.profile.subjects,
});

const mapDispatchToProps = dispatch => ({
  addNewSubAction: (type, data) => dispatch(addNewSub(type, data)),
  deleteSubscriptionAction: (type, key) => dispatch(deleteSubscription(type, key)),
  startSearchingAction: () => dispatch(startSearching()),
  getSubjectAction: params => dispatch(getSubject(params)),
});

export const SubjectProfile = connect(mapStateToProps, mapDispatchToProps)(SubjectProfileContainer);
