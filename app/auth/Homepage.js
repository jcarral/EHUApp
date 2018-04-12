import React, { Component } from 'react';
import { connect } from 'react-redux';

import { HomepageScreen } from './screens';
import { signOut } from '.';

class HomepageContainer extends Component {
  handleSignOut = () => {
    this.props.dispatch(signOut());
  }

  render() {
    return (<HomepageScreen signOut={this.handleSignOut} />);
  }
}

const mapStateToProps = () => ({

});

export const Homepage = connect(mapStateToProps)(HomepageContainer);
