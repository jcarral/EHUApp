import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AdminScreen } from './screens';

class AdminContainer extends Component {
  handleNavigateTo = (path) => {
    const { navigation } = this.props;
    navigation.navigate(path);
  }
  render() {
    return (<AdminScreen
      handleNavigateTo={this.handleNavigateTo}
    />);
  }
}
const mapStateToProps = (state, action) => ({

});

const mapDispatchToProps = dispatch => ({

});

export const AdminPage = connect(mapStateToProps, mapDispatchToProps)(AdminContainer);
