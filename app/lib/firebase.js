import axios from 'axios';
import * as firebase from 'firebase';
import { urls } from '../config/';

const T_GRADE = 0, T_SUBJECTS = 1, T_TEACHERS = 2;

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
  console.log(teacher)
  const ref = firebase.database().ref(`/ehu/teachers/${teacher.code}_${teacher.grade}`);
  const data = await ref.once('value');
  return data.val();
};

export const getSubjectFromFirebase = async (subject) => {
  const ref = firebase.database().ref(`/ehu/subjects/${subject.code}_${subject.grade}`);
  const data = await ref.once('value');
  return data.val();
};

export const getGradeFromFirebase = (grade, school, campus) => {
  const path = `/ehu/degrees/${campus}/${school}/${grade}`; //TODO: Update path to /ehu/grades/
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
  const { email, displayName, emailVerified, uid } = user;
  return {
    email,
    displayName,
    emailVerified,
    uid,
  };
};

export const getProfileFromFirebase = async uid => {
	const profileRef = firebase.database().ref('users').child(uid);
	const { data, teachers, subjects, grade, } = (await profileRef.once('value')).val(); 
  return {
		data,
		teachers: teachers || {},
		subjects: subjects || {},
		grade: grade || '',
	};
};

export const editProfileOnFirebase = async (uid, profile) => {

};

export const addSubscriptionOnFirebase = async (path, data) => {
	if (firebase.auth().currentUser === null) throw new Error('You must be logged in');
	const { uid, } = firebase.auth().currentUser;
	const ref = firebase.database().ref('users').child(uid).child(path);
	return await ref.update(data);
};

export const deleteSubscriptionOnFirebase = async (path, key) => {
	if (firebase.auth().currentUser === null) throw new Error('You must be logged in');
	const { uid, } = firebase.auth().currentUser;
	const ref = firebase.database().ref('users').child(uid).child(path).child(key);
	return await ref.remove();
};

export const updatePasswordOnFirebase = async (email, oldPass, nextPass) => {
	console.log(email, oldPass, nextPass)
	const credential = firebase.auth.EmailAuthProvider.credential(email, oldPass);
	const user = firebase.auth().currentUser;
	await user.reauthenticateWithCredential(credential);
	return user.updatePassword(nextPass);
};

const getFromFirebasePath = async (path) => {
  const ref = firebase.database().ref(path);
  const data = await ref.once('value');
  return data.val();
};

