import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { SubjectProfileScreen, SubscribeModal } from './screens';
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
      isVisible: false,
      selectedGroup: null,
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
    const { userSubjects = {}, subject } = nextProps;
    const { following, subjectCode } = this.state;
    const selectedGroup = subject.schedule.groups[0].code || '';
    this.setState({ following: Object.keys(userSubjects).includes(subjectCode), selectedGroup });
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
    const {
      following,
      subjectCode,
      selectedGroup,
    } = this.state;
    const tmpSub = {};
    if (!following) {
      const name = (subject.detail) ? subject.detail.name : '';
      tmpSub[subjectCode] = {
        name,
        group: selectedGroup,
      };
      await addNewSubAction('subjects', tmpSub);
      this.handleToggleModal();
    } else {
      await deleteSubscriptionAction('subjects', subjectCode);
    }
  }

  handleToggleModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  }

  handleChangeGroup = (group) => {
    this.setState({ selectedGroup: group });
  }

  render() {
    const {
      following,
      isVisible,
      selectedGroup,
    } = this.state;
    const buttons = [
      Translate.t('subject.profile.summary'),
      Translate.t('subject.profile.detail'),
      Translate.t('subject.profile.schedule'),
    ];
    let groups = (this.props.subject.schedule) ? this.props.subject.schedule.groups : [];
    groups = groups.map(group => ({ value: group.code, name: group.code }));
    return (
      <SubjectProfileScreen
        searching={this.props.searching}
        error={this.props.error}
        subject={this.props.subject}
        selectedIndex={this.state.selectedIndex}
        changeTab={this.changeTab}
        goToPath={this.goToPath}
        buttons={buttons}
        handleToggleModal={(following) ? this.handleToggleSubscription : this.handleToggleModal}
        following={following}
      >
        <Modal isVisible={isVisible && groups.length > 0}>
          <SubscribeModal
            handleToggleSubscription={this.handleToggleSubscription}
            handleToggleModal={this.handleToggleModal}
            groups={groups}
            selectedGroup={selectedGroup}
            handleChange={this.handleChangeGroup}
          />
        </Modal>
      </SubjectProfileScreen>
    );
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
