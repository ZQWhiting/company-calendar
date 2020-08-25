module.exports = {
	format_date_long: (date) => {
		var month = new Array();
		month[0] = 'January';
		month[1] = 'February';
		month[2] = 'March';
		month[3] = 'April';
		month[4] = 'May';
		month[5] = 'June';
		month[6] = 'July';
		month[7] = 'August';
		month[8] = 'September';
		month[9] = 'October';
		month[10] = 'November';
		month[11] = 'December';

		return `
		${month[new Date(date).getMonth()]}, ${new Date(date).getDate() + 1} ${new Date(
			date
		).getFullYear()}`;
	},

	format_date_short: (date) => {
		return `
		${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
			date
		).getFullYear()}`;
	},

	format_time: (time) => {
		AMorPM = 'AM';

		time = time.split(':');
		if (time[0] >= 12) {
			time[0] -= 12;
			AMorPM = 'PM';
		}

		return `${time[0]}:${time[1]} ${AMorPM}`;
	},

	user_authentication: (user_id, employee_id) => {
		if (user_id !== employee_id) {
			return false;
		}
		return true;
	},
};
