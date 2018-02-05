export const sortByDate = (dates) => {
	dates = dates.map((obj) => {
		obj['date-start'] = customDateToDate(obj['date-start']);
		obj['date-end'] = customDateToDate(obj['date-end']);
		return obj;
	});
	let oldDates = dates;
	dates = dates.sort((a, b) => {
		return new Date(a['date-start']) - new Date(b['date-start']);
	});
	
	let currentDate = new Date();
	dates = dates.filter(obj => currentDate < new Date(obj['date-start']));
	
	return dates;
};

const customDateToDate = date => {
	date = date.split('T');
	let calendar = date[0].split('-');
	let time = date[1].split(':');
	return new Date(calendar[0], calendar[1], calendar[2], time[0], time[1]).toDateString();
};
