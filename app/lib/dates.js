export const sortByDate = (dates) => {
	dates = dates.map((obj) => {
		obj['date-start'] = customDateToDate(obj['date-start']);
		obj['date-end'] = customDateToDate(obj['date-end']);
		return obj;
	});
	dates = dates.filter((obj) => (obj['date-start'] !== '-1' && obj['date-end'] !== '-1'))
	let oldDates = dates;
	dates = dates.sort((a, b) => {
		return new Date(a['date-start']) - new Date(b['date-start']);
	});
	
	let currentDate = new Date();
	dates = dates.filter(obj => currentDate < new Date(obj['date-start']));
	
	return dates;
};

const customDateToDate = date => {
	try{
		date = date.split('T');
		let calendar = date[0].split('-');
		let time = date[1].split(':');
		return new Date(calendar[0], calendar[1], calendar[2], time[0], time[1]).toDateString();
	}
	catch(err){
		return '-1';
	}
};
