import axios from 'axios';
import * as firebase from 'firebase';
import { urls } from '../config/';

const T_DEGREE = 0, T_SUBJECTS = 1, T_TEACHERS = 2;

export const searchByName = async (name, type) => {
	let query;
	switch(type){
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
	const ref = firebase.database().ref(`/ehu/teachers/${teacher.code}_${teacher.degree}`);
	const data = await ref.once('value');
	console.log('Mis datos', data.val());
	return data.val();
};
