import axios from 'axios';
import * as firebase from 'firebase';
import { urls } from '../config/';

const T_GRADE = 0;
const T_SUBJECTS = 1;
const T_TEACHERS = 2;


const getFromFirebasePath = async (path) => {
  const ref = firebase.database().ref(path);
  const data = await ref.once('value');
  return data.val();
};

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
      query = '';
  }
  const results = await axios.get(`${urls.firebase}/searchByName?name=${name.toLowerCase()}&${query}`);
  return results.data;
};


export const getTeacherFromFirebase = async (teacher) => {
  const ref = firebase.database().ref(`/ehu/teachers/${teacher.code}_${teacher.grade}`);
  const data = await ref.once('value');
  const res = data.val();
  return res;
};

export const getSubjectFromFirebase = async (subject) => {
  const ref = firebase.database().ref(`/ehu/subjects/${subject.code}_${subject.grade}`);
  const data = await ref.once('value');
  return data.val();
};

export const getGradeFromFirebase = (grade, school, campus) => {
  const path = `/ehu/grades/${campus}/${school}/${grade}`;
  return getFromFirebasePath(path);
};

export const loginOnFirebase = async (credentials) => {
  const user =
    await firebase.auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password);
  const {
    email,
    displayName,
    emailVerified,
    uid,
  } = user;
  const profile = await firebase.database().ref('users').child(uid).once('value');
  const { role } = profile.val(); // TODO: Add more user data
  return {
    email,
    displayName,
    emailVerified,
    uid,
    role,
  };
};

export const signUpOnFirebase = async (userDetail) => {
  const user = await firebase.auth()
    .createUserWithEmailAndPassword(userDetail.email, userDetail.password);
  await user.updateProfile({
    displayName: `${userDetail.name} ${userDetail.surname}`,
  });
  const {
    email, displayName, emailVerified, uid,
  } = user;
  return {
    email,
    displayName,
    emailVerified,
    uid,
  };
};

export const resetPassword = async email => firebase.auth().sendPasswordResetEmail(email);

export const getProfileFromFirebase = async (uid) => {
  if (!uid && firebase.auth().currentUser === null) throw new Error('You must be logged in');
  uid = uid || firebase.auth().currentUser.uid;
  const profileRef = firebase.database().ref('users').child(uid);
  const {
    data, teachers, subjects, grade,
  } = (await profileRef.once('value')).val();
  return {
    data,
    teachers: teachers || {},
    subjects: subjects || {},
    grade: grade || '',
  };
};

export const editProfileOnFirebase = async (profile) => {
  if (firebase.auth().currentUser === null) throw new Error('You must be logged in');
  const { uid } = firebase.auth().currentUser;
  const ref = firebase.database().ref('users').child(uid).child('data');
  await ref.update(profile);
};

export const addSubscriptionOnFirebase = async (path, data) => {
  if (firebase.auth().currentUser === null) throw new Error('You must be logged in');
  const { uid } = firebase.auth().currentUser;
  const ref = firebase.database().ref('users').child(uid).child(path);
  return ref.update(data);
};

export const deleteSubscriptionOnFirebase = async (path, key) => {
  if (firebase.auth().currentUser === null) throw new Error('You must be logged in');
  const { uid } = firebase.auth().currentUser;
  const ref = firebase.database().ref('users').child(uid).child(path)
    .child(key);
  return ref.remove();
};

export const updatePasswordOnFirebase = async (email, oldPass, nextPass) => {
  const credential = firebase.auth.EmailAuthProvider.credential(email, oldPass);
  const user = firebase.auth().currentUser;
  await user.reauthenticateWithCredential(credential);
  return user.updatePassword(nextPass);
};

export const getFirebaseUID = () => firebase.auth().currentUser.uid;

export const logoutFromFirebase = async () => firebase.auth().signOut();

export const getCalendarFromFirebase = async (path) => {
  const ref = firebase.database().ref('ehu').child('calendars').child(path);
  const calendarSnap = await ref.once('value');
  return calendarSnap.val();
};

export const addDateOnFirebase = async (date, name, type) => {
  const ref = firebase.database()
    .ref('ehu')
    .child('calendars')
    .child(name)
    .child(type);
  const { key } = ref.push();
  await ref.child(key).set(date);
  return key;
};

export const deleteDateFromFirebase = async (calendar, type, id) =>
  firebase.database()
    .ref('ehu')
    .child('calendars')
    .child(calendar)
    .child(type)
    .child(id)
    .remove();
