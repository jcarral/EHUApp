import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { UserSubscriptionsScreen } from './screens';
import { LoadingScreen } from '../components';

class UserSubscriptionContainer extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: null,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { subjects, teachers } = nextProps;
    console.log(subjects, teachers);
  }

  handleNavigate = () => {
    const { navigation } = this.props;
  }

  render() {
    const { dataSource } = this.state;
    const { loading } = this.props;
    if (loading) return (<LoadingScreen />);
    return (
      <UserSubscriptionsScreen
        dataSource={dataSource}
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
