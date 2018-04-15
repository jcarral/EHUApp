import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { fetchCalendar, fetchGradeCalendar, fetchSchedules } from './calendar.action';
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
      fetchGradeCalendarAction,
      subjects,
      loadedCalendars,
    } = this.props;
    let requiredGrades = Object.keys(subjects).map(sub => sub.split('_')[1]);
    requiredGrades = Helper.unique(requiredGrades);
    requiredGrades = Helper.diff(requiredGrades, loadedCalendars);
    // requiredGrades.forEach(grade => fetchGradeCalendarAction(grade));
    for (const grade of requiredGrades) {
      await fetchGradeCalendarAction(grade);
    }
  }

  generateDates = () => {
    const {
      ehuCalendar,
      gradesCalendar,
      schedules,
      subjects,
    } = this.props;
    const dates = Calendar.createUserSchedule(ehuCalendar, gradesCalendar, schedules, subjects);
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
  gradesCalendar: state.calendar.grades,
  loading: state.calendar.fetching,
  schedules: state.calendar.schedules,
});

const mapDispatchToProps = dispatch => ({
  fetchCalendarAction: () => dispatch(fetchCalendar()),
  fetchGradeCalendarAction: type => dispatch(fetchGradeCalendar(type)),
  fetchSchedulesAction: list => dispatch(fetchSchedules(list)),
});

export const MyCalendar = connect(mapStateToProps, mapDispatchToProps)(MyCalendarContainer);
