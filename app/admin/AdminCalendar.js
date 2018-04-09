import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminCalendarScreen } from './screens';
import { fetchCalendar } from '../calendar/calendar.action';
import { search } from '../search/search.action';

class AdminCalendarContainer extends Component {
  componentWillMount = () => {
    const { fetchCalendarAction, searchGradesAction } = this.props;
    fetchCalendarAction();
    searchGradesAction();
  }

  handleAddDate = (date) => {
    console.log(date);
  }

  render() {
    const { ehuCalendar, grades } = this.props;
    const listOfCalendars = [...grades.map(grade => ({ label: grade.name, value: grade.code })), { label: 'EHU', value: 'ehu' }];
    console.log(listOfCalendars)
    return (
      <AdminCalendarScreen
        ehuCalendar={ehuCalendar}
        handleAddDate={this.handleAddDate}
        listOfCalendars={listOfCalendars}
      />
    );
  }
}

const mapStateToProps = (state, action) => ({
  ehuCalendar: state.calendar.ehu,
  grades: state.search.grades,
});

const mapDispatchToProps = dispatch => ({
  fetchCalendarAction: () => dispatch(fetchCalendar()),
  searchGradesAction: () => dispatch(search('Gr', 0)),
});

export const AdminCalendar = connect(mapStateToProps, mapDispatchToProps)(AdminCalendarContainer);
