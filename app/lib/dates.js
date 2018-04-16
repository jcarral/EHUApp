import { Helper } from '.';

const customDateToDate = (date) => {
  try {
    date = date.split('T');
    const calendar = date[0].split('-');
    const time = date[1].split(':');
    return new Date(calendar[0], calendar[1], calendar[2], time[0], time[1]).toDateString();
  } catch (err) {
    return '-1';
  }
};

export const sortByDate = (inDates) => {
  let dates = inDates.map((obj) => {
    const copy = Object.assign({}, obj);
    copy['date-start'] = customDateToDate(copy['date-start']);
    copy['date-end'] = customDateToDate(copy['date-end']);
    return copy;
  });
  dates = dates.filter(obj => (obj['date-start'] !== '-1' && obj['date-end'] !== '-1'));
  const oldDates = dates;
  dates = dates.sort((a, b) => new Date(a['date-start']) - new Date(b['date-start']));
  const currentDate = new Date();
  dates = dates.filter(obj => currentDate < new Date(obj['date-start']));
  return dates;
};

const selectColor = (key) => {
  switch (key) {
    case 'holidays':
      return 'orange';
    case 'weekStart':
      return '#A9DFA5';
    default:
      return 'red';
  }
};
const flatten = arr =>
  arr.reduce((acc, next) => acc.concat(Array.isArray(next) ? flatten(next) : next), []);

const getHour = date => date.split('T')[1];
const getDay = date => date.split('T')[0];

export class Dates {
  static calendarToDate = calendar =>
    new Date(calendar.year, calendar.month, calendar.day, calendar.hour, calendar.minutes);

  static dateToCalendar = (date: Date) => {
    const calendar = {};
    calendar.day = date.getUTCDate();
    calendar.month = date.getUTCMonth() + 1;
    calendar.year = date.getFullYear();
    calendar.hour = date.getHours();
    calendar.minutes = date.getMinutes();
    calendar.timestamp = date.getTime();
    calendar.dateString = `${calendar.year}-${Dates.getStringTime(calendar.month)}-${Date.getStringTime(calendar.day)}`;
    return calendar;
  }

  static getStringTime = time => (time < 10 ? `0${time.toString()}` : time.toString());
  static isCalendar = calendar => (typeof calendar === typeof {} && Helper.hasProperties(calendar, ['day', 'month', 'year']));
  static datesToComponent = (calendar = {}) => {
    let currentType;
    const listOfCalendars =
      Object.keys(calendar).map((key) => {
        const dates = Object.keys(calendar[key]).map(id => calendar[key][id].dateString);
        return {
          color: selectColor(key),
          dates,
        };
      });
    const calendarsByType = listOfCalendars.map((cal) => {
      const typeCalendar = {};
      cal.dates.forEach((day) => {
        typeCalendar[day] = {
          disabled: false,
          startingDay: true,
          color: cal.color,
          endingDay: true,
          textColor: 'gray',
        };
      });
      return typeCalendar;
    });
    const flattenList = Object.assign({}, ...calendarsByType);
    return flattenList;
  };
  static scheduleToCalendar = (schedule = []) => {
    const calendar = {};
    schedule.forEach((item) => {
      const day = getDay(item['date-start']);
      const tutorship = {
        start: getHour(item['date-start']),
        end: getHour(item['date-end']),
        day,
      };
      if (Helper.hasProperty(calendar, day)) {
        calendar[day] = [...calendar[day], tutorship];
      } else {
        calendar[day] = [tutorship];
      }
    });
    return calendar;
  };
}

/**
 * Calendar Object example:
 * {
  day: 1,     // day of month (1-31)
  month: 1,   // month of year (1-12)
  year: 2017, // year
  timestamp,   // UTC timestamp representing 00:00 AM of this date
  dateString: '2016-05-13' // date formatted as 'YYYY-MM-DD' string
}
*/
