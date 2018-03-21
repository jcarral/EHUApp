import axios from 'axios';
import * as firebase from 'firebase';
import { urls } from '../config/';

const T_DEGREE = 0, T_SUBJECTS = 1, T_TEACHERS = 2;

export const searchByName = async (name, type) => {
  let query;
  switch (type) {
    case T_SUBJECTS:
      query = 'subject=null';
      break;
    case T_TEACHERS:
      query = 'teacher=null';
      break;
    default:
      query = ''
  }
  const results = await axios.get(`${urls.firebase}/searchByName?name=${name.toLowerCase()}&${query}`);
  return results.data;
};


export const getTeacherFromFirebase = async (teacher) => {
  console.log('Searching teacher...', teacher);
  const ref = firebase.database().ref(`/ehu/teachers/${teacher.code}_${teacher.degree}`);
  const data = await ref.once('value');
  return data.val();
};

export const getSubjectFromFirebase = async (subject) => {
  console.log(`/ehu/subjects/${subject.code}_${subject.degree}`)
  const ref = firebase.database().ref(`/ehu/subjects/${subject.code}_${subject.degree}`);
  const data = await ref.once('value');
  console.log('respionse', data.val())
  return data.val();
};

export const getDegreeFromFirebase = (degree, school, campus) => {
  const path = `/ehu/degrees/${campus}/${school}/${degree}`;
  return getFromFirebasePath(path);
};

export const loginOnFirebase = async credentials => {
  const user = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
  const { email, displayName, emailVerified, uid } = user;
  return {
    email,
    displayName,
    emailVerified,
    uid,
  };
};

export const signUpOnFirebase = async userDetail => {
  const user = await firebase.auth().createUserWithEmailAndPassword(userDetail.email, userDetail.password);
  await user.updateProfile({
    displayName : `${userDetail.name} ${userDetail.surname}`,
  });
  return user;
};

const getFromFirebasePath = async (path) => {
  const ref = firebase.database().ref(path);
  const data = await ref.once('value');
  return data.val();
};

