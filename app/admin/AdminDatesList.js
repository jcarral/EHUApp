import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { Translate } from '../lib';
import { colors } from '../config';
import { AdminDatesListScreen } from './screens';
import { deleteDate } from '../calendar';

class AdminDatesListContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${Translate.t('admin.calendar.listTitle')}: ${navigation.state.params.selectedCalendar}`,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colors.white },
    headerStyle: {
      backgroundColor: colors.black,
    },
  });

  handleDeleteItem = (type, id) => {
    const {
      gradesCalendar,
      ehuCalendar,
      navigation,
      deleteDateAction,
    } = this.props;
    const { selectedCalendar } = navigation.state.params;
    const date = (selectedCalendar === 'ehu') ? ehuCalendar[type][id] : gradesCalendar[selectedCalendar][type][id];
    Alert.alert(
      Translate.t('admin.calendar.lisAlert'),
      `${type} => ${date.dateString}`,
      [
        {
          text: 'Yes',
          onPress: async () => deleteDateAction(selectedCalendar, type, id),
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    const { gradesCalendar, ehuCalendar, navigation } = this.props;
    const selectedCalendarName = navigation.state.params.selectedCalendar;
    return (<AdminDatesListScreen
      handleDeleteItem={this.handleDeleteItem}
      dates={selectedCalendarName === 'ehu' ? ehuCalendar : gradesCalendar[selectedCalendarName]}
    />);
  }
}

const mapStateToProps = (state, action) => ({
  loading: state.calendar.fetching,
  gradesCalendar: state.calendar.grades,
  ehuCalendar: state.calendar.ehu,
});

const mapDispatchToProps = dispatch => ({
  deleteDateAction: (calendar, type, id) => dispatch(deleteDate(calendar, type, id)),
});

export const AdminDatesList = connect(mapStateToProps, mapDispatchToProps)(AdminDatesListContainer);
