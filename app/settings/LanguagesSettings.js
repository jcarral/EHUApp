import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LanguagesScreen } from './screens';
import { changeLocale } from './settings.action';
import { navigateTo } from '../lib';

class LanguagesPage extends Component {
  componentWillReceiveProps = (nextProps) => {
    const { locale, navigation } = this.props;
    if (locale !== nextProps.locale) navigateTo('Splash', navigation);
  }

  handleChangeLocale = (locale) => {
    this.props.updateLocale(locale);
  };

  render() {
    return <LanguagesScreen handleChangeLocale={this.handleChangeLocale} />;
  }
}

const mapStateToProps = (state, action) => ({
  user: state.auth.user,
  locale: state.settings.locale,
});

const mapDispatchToProps = dispatch => ({
  updateLocale: locale => dispatch(changeLocale(locale)),
});

export const LanguagesSettings = connect(mapStateToProps, mapDispatchToProps)(LanguagesPage);
