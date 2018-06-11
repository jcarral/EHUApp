import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { fetchCalendar, fetchDegreeCalendar, fetchSchedules } from './calendar.action';
import { MyCalendarScreen } from './screens';
import { Helper, Calendar } from '../lib';

class MyCalendarContainer extends Component {
  state = {
    dates: {},
  };
  componentDidMount = async () => {
    const {
      fetchCalendarAction,
    } = this.props;
    await fetchCalendarAction();
    await this.loadSchedules();
    await this.loadCalendars();
  }

  componentWillReceiveProps = async (nextProps) => {
    // const { loadedCalendars, schedules, loadedSchedules } = nextProps;

    // console.log(loadedSchedules, schedules);
    // console.log('Son iguales', Helper.equalsArray(loadedSchedules,
    // Object.keys(this.props.schedules)));
  }

  loadSchedules = async () => {
    const {
      loadedSchedules,
      subjects,
      fetchSchedulesAction,
    } = this.props;
    const requiredSchedules = Helper.diff(loadedSchedules, Object.keys(subjects));
    let listOfRequired = [];
    for (const code of requiredSchedules) {
      listOfRequired = [...listOfRequired, { code, group: subjects[code].group }];
    }
    await fetchSchedulesAction(listOfRequired);
  }

  loadCalendars = async () => {
    const {
      fetchDegreeCalendarAction,
      subjects,
      loadedCalendars,
    } = this.props;
    let requiredDegrees = Object.keys(subjects).map(sub => sub.split('_')[1]);
    requiredDegrees = Helper.unique(requiredDegrees);
    requiredDegrees = Helper.diff(requiredDegrees, loadedCalendars);
    // requiredDegrees.forEach(degree => fetchDegreeCalendarAction(degree));
    for (const degree of requiredDegrees) {
      await fetchDegreeCalendarAction(degree);
    }
  }

  generateDates = () => {
    const {
      ehuCalendar,
      degreesCalendar,
      schedules,
      subjects,
    } = this.props;
    const dates = Calendar.createUserSchedule(ehuCalendar, degreesCalendar, schedules, subjects);
    this.setState({ dates });
  }
  render() {
    const { dates } = this.state;
    return (
      <MyCalendarScreen
        dates={dates}
        generateCalendar={this.generateDates}
      />
    );
  }
}

const mapStateToProps = (state, action) => ({
  subjects: state.profile.subjects,
  loadedCalendars: state.calendar.loadedCalendars,
  loadedSchedules: state.calendar.loadedSchedules,
  ehuCalendar: state.calendar.ehu,
  degreesCalendar: state.calendar.degrees,
  loading: state.calendar.fetching,
  schedules: state.calendar.schedules,
});

const mapDispatchToProps = dispatch => ({
  fetchCalendarAction: () => dispatch(fetchCalendar()),
  fetchDegreeCalendarAction: type => dispatch(fetchDegreeCalendar(type)),
  fetchSchedulesAction: list => dispatch(fetchSchedules(list)),
});

export const MyCalendar = connect(mapStateToProps, mapDispatchToProps)(MyCalendarContainer);
