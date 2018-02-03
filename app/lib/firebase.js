import firebase from 'react-native-firebase';

export const searchText = async (text) => {
	let results = [];
	console.log(firebase)
	const ref = firebase.firestore().collection('subjects');

	const snap = await ref.get().where('name', '==', true);
	snap.forEach(function(doc){
		results.push(doc.name);
	});
	return results;
};	
