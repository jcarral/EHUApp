import { START_SEARCHING, SUBJECTS_FETCH, TEACHERS_FETCH, GRADES_FETCH, CHANGE_TAB, START_SEARCHING_TEACHERS, START_SEARCHING_GRADES, START_SEARCHING_SUBJECTS } from './search.types';

import { searchByName } from '../lib';

const changeToSubjects = async (text, newTab, dispatch, getState) => {
  const { searchSubjectText, selectedIndex } = getState().search;

  if (selectedIndex !== newTab) dispatch({ type: CHANGE_TAB, payload: newTab });
  if (searchSubjectText === text) return;

  dispatch({
    type: START_SEARCHING,
  });
  dispatch({
    type: START_SEARCHING_SUBJECTS,
    payload: text,
  });

  const results = await searchByName(text, newTab);
  dispatch({
    type: SUBJECTS_FETCH,
    payload: results,
  });
};

const changeToTeachers = async (text, newTab, dispatch, getState) => {
  const { searchTeacherText, selectedIndex } = getState().search;

  if (selectedIndex !== newTab) dispatch({ type: CHANGE_TAB, payload: newTab });
  if (searchTeacherText === text) return;
  dispatch({
    type: START_SEARCHING,
  });
  dispatch({
    type: START_SEARCHING_TEACHERS,
    payload: text,
  });

  const results = await searchByName(text, newTab);
  dispatch({
    type: TEACHERS_FETCH,
    payload: results,
  });
};

const changeToGrades = async (text, newTab, dispatch, getState) => {
  const { searchGradeText, selectedIndex } = getState().search;

  if (selectedIndex !== newTab) dispatch({ type: CHANGE_TAB, payload: newTab });
  if (searchGradeText === text) return;
  dispatch({
    type: START_SEARCHING,
  });
  dispatch({
    type: START_SEARCHING_GRADES,
    payload: text,
  });

  const results = await searchByName(text, newTab);

  dispatch({
    type: GRADES_FETCH,
    payload: results,
  });
};

export const search = (text, index) => (dispatch, getState) => {
  const selectedIndex = index || getState().search.selectedIndex;
console.log('lll', selectedIndex)
  switch (selectedIndex) {
    case 0:
      return changeToGrades(text, selectedIndex, dispatch, getState);
    case 1:
      return changeToSubjects(text, selectedIndex, dispatch, getState);
    case 2:
      return changeToTeachers(text, selectedIndex, dispatch, getState);
    default:
      return changeToGrades(text, selectedIndex, dispatch, getState);
  }
};

export const changeTab = (text, newTab) => (dispatch, getState) => {
  let nextTab = newTab;
  if (newTab !== 1 && newTab !== 2) {
    nextTab = 0;
  }

  switch (nextTab) {
    case 0:
      return changeToGrades(text, nextTab, dispatch, getState);
    case 1:
      return changeToSubjects(text, nextTab, dispatch, getState);
    case 2:
      return changeToTeachers(text, nextTab, dispatch, getState);
    default:
      return changeToGrades(text, nextTab, dispatch, getState);
  }
};
