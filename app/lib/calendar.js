import { Dates, Helper, Color } from '.';

const getWeekStart = (index, listOfWeeks) =>
  Object.keys(listOfWeeks).map(id => listOfWeeks[id]).filter(obj => obj.weekStart === index);

const getEventObject = data => ({
  start: data.hours.split('-')[0],
  end: data.hours.split('-')[1],
  type: data.type,
});
const createOrAddDate = (weekDate, days, tmp, gap) => {
  const tmpDate = new Date(weekDate.year, weekDate.month - 1, weekDate.day);
  tmpDate.setDate(tmpDate.getDate() + gap);
  const dateString = `${tmpDate.getFullYear()}-${Dates.getStringTime(tmpDate.getUTCMonth() + 1)}-${Dates.getStringTime(tmpDate.getDate())}`;
  if (tmp[dateString]) {
    tmp[dateString].hours = tmp[dateString].hours.concat(days.map(day => getEventObject(day)));
  } else {
    tmp[dateString] = {};
    tmp[dateString].hours = [days.map(day => getEventObject(day))];
  }
  return tmp;
};

const getDatesByRange = (data, listOfWeeks) => {
  const tmpDates = {};
  const weeks = data.weeks.split('-');
  if (Helper.isNaN(weeks[0]) || Helper.isNaN(weeks[1])) {
    return {};
  }
  const firstWeek = parseInt(weeks[0], 10);
  const lastWeek = parseInt(weeks[1], 10);

  for (let i = firstWeek; i <= lastWeek; i++) {
    const weekDate = getWeekStart(i, listOfWeeks).find(a => a);
    if (Object.keys(weekDate).length > 0) {
      if (data.monday) createOrAddDate(weekDate, data.monday, tmpDates, 0);
      if (data.tuesday) createOrAddDate(weekDate, data.tuesday, tmpDates, 1);
      if (data.wednesday) createOrAddDate(weekDate, data.wednesday, tmpDates, 2);
      if (data.thursday) createOrAddDate(weekDate, data.thursday, tmpDates, 3);
      if (data.friday) createOrAddDate(weekDate, data.friday, tmpDates, 4);
    }
  }
  return tmpDates;
};

const removeHolidays = (calendar = {}, holidays = {}) => {
  const copy = Object.assign({}, calendar);
  for (const id of Object.keys(holidays)) {
    const day = holidays[id].dateString;
    if (copy[day]) {
      copy[day] = [{
        type: 'holiday',
        name: holidays[id].name || '',
      }];
    }
  }
  return copy;
};

export class Calendar {
  static createUserScheduleAux = (ehu = {}, gradesCalendar = {}, schedules = {}, subjects = {}) => {
    const dates = {};
    let datesArray = [];
    // Paso 1: Juntar todos los horarios
    for (const key of Object.keys(schedules)) {
      const color = Color.randomColor();
      const grade = key.split('_')[1];
      // Calendario de una asignatura. Una lista de objetos por semanas
      const schedule = schedules[key];
      // Lista de objetos donde cada uno esta formado por los días con sus horas
      const parsedSchedule = schedule
        .map(weeksRange => getDatesByRange(weeksRange, gradesCalendar[grade].weekStart));
      // Objeto con todos los días juntos y la información añadida,
      // es decir, nombre de la asignatura y color.
      const infoSchedule = parsedSchedule
        .map((rangeSchedule) => {
          for (const day of Object.keys(rangeSchedule)) {
            // Actualiza los objetos con horas añadiendole color, nombre asignatura y código.
            rangeSchedule[day].hours = rangeSchedule[day].hours.find(a => a)
              .map(hour => Object.assign({}, hour, { color, code: key, name: subjects[key] }));
          }
          return rangeSchedule;
        })
        .reduce((prev, curr) => {
          const copy = Object.assign({}, prev);
          for (const day of Object.keys(curr)) {
            if (copy[day]) {
              copy[day].hours = copy[day].hours.concat(curr[day].hours);
            } else {
              copy[day] = {};
              copy[day].hours = curr[day].hours;
            }
          }
          return copy;
        }, {});
      datesArray = [...datesArray, infoSchedule];
    }
    const listOfDays = datesArray.reduce((prev, curr) => {
      for (const day of Object.keys(curr)) {
        if (prev[day] && prev[day].hours) {
          prev[day].hours = prev[day].hours.concat(curr[day].hours);
        } else {
          prev[day] = {};
          prev[day].hours = curr[day].hours;
          prev[day].type = 'school';
        }
      }
      return prev;
    }, {});
    // Paso 2: Eliminar festivos
    const cleanObject = removeHolidays(listOfDays, ehu.holidays);
    Object.keys(cleanObject).forEach((day) => {
      cleanObject[day] = [cleanObject[day]];
    });
    return cleanObject;
  }

  static createUserSchedule = (ehu = {}, gradesCalendar = {}, schedules = {}, subjects = {}) => {
    try {
      return Calendar.createUserScheduleAux(ehu, gradesCalendar, schedules, subjects);
    } catch (e) {
      return {};
    }
  }
}
