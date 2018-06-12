import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminCalendarScreen } from './screens';
import { fetchCalendar, addDateToCalendar, fetchDegreeCalendar } from '../calendar/calendar.action';
import { search } from '../search/search.action';
import { Helper, Translate } from '../lib';

class AdminCalendarContainer extends Component {
  state = {
    selectedCalendar: 'ehu',
    selectedIndex: 0,
    holidayText: '',
    weekStartNumber: 0,
  };
  componentWillMount = () => {
    const { fetchCalendarAction, searchDegreesAction } = this.props;
    fetchCalendarAction();
    searchDegreesAction();
  }

  handleAddDate = (date) => {
    const {
      selectedCalendar,
      selectedIndex,
      holidayText,
      weekStartNumber,
    } = this.state;
    const { addDateToCalendarAction } = this.props;
    let dateWithProps;
    let type = 'holidays';
    if (selectedIndex === 0) {
      dateWithProps = Object.assign({}, date, { name: holidayText });
    } else {
      dateWithProps = Object.assign({}, date, { weekStart: weekStartNumber });
      type = 'weekStart';
    }
    addDateToCalendarAction(dateWithProps, selectedCalendar, type);
  }

  handleChangeCalendar = (type) => {
    const { degreesCalendar, fetchDegreeCalendarAction } = this.props;
    this.setState({ selectedCalendar: type });
    if (!Helper.hasProperty(degreesCalendar, type) && type !== 'ehu') fetchDegreeCalendarAction(type);
  }

  handleChangeText = (key, value) => {
    const tmpState = {};
    tmpState[key] = value;
    this.setState(Object.assign({}, this.state, tmpState));
  };

  handleNavigate = () => {
    const { navigation } = this.props;
    const { selectedCalendar } = this.state;
    navigation.navigate('AdminDatesList', {
      selectedCalendar,
    });
  }
  render() {
    const { ehuCalendar, degrees, degreesCalendar } = this.props;
    const {
      selectedCalendar,
      selectedIndex,
      holidayText,
      weekStartNumber,
    } = this.state;
    const listOfCalendars = [...degrees.map(degree => ({ label: degree.name, value: degree.code })), { label: 'EHU', value: 'ehu' }];
    const buttons = [
      Translate.t('admin.calendar.tabHoliday'),
      Translate.t('admin.calendar.tabWeek'),
    ];

    return (
      <AdminCalendarScreen
        ehuCalendar={ehuCalendar}
        handleAddDate={this.handleAddDate}
        listOfCalendars={listOfCalendars}
        selectedCalendar={selectedCalendar}
        handleChangeCalendar={this.handleChangeCalendar}
        selectedCalendarDates={(selectedCalendar === 'ehu') ? ehuCalendar : degreesCalendar[selectedCalendar]}
        buttons={buttons}
        selectedIndex={selectedIndex}
        handleChangeText={this.handleChangeText}
        values={{ weekStartNumber, holidayText }}
        handleNavigate={this.handleNavigate}
      />
    );
  }
}

const mapStateToProps = (state, action) => ({
  ehuCalendar: state.calendar.ehu,
  degrees: state.search.degrees,
  degreesCalendar: state.calendar.degrees,
  loadedCalendars: state.calendar.loadedCalendars,
  loadingCalendar: state.calendar.fetching,
});

const mapDispatchToProps = dispatch => ({
  fetchCalendarAction: () => dispatch(fetchCalendar()),
  searchDegreesAction: () => dispatch(search('Gra', 0)),
  fetchDegreeCalendarAction: code => dispatch(fetchDegreeCalendar(code)),
  addDateToCalendarAction: (date, code, type) => dispatch(addDateToCalendar(date, code, type)),
});

export const AdminCalendar = connect(mapStateToProps, mapDispatchToProps)(AdminCalendarContainer);
