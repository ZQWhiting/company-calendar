module.exports = {
	format_date: (date) => {
		return `${new Date(date).getMonth() + 1}/${new Date(
			date
		).getDate()}/${new Date(date).getFullYear()}`;
	},

	user_authentication: (user_id, employee_id) => {
		if (user_id !== employee_id) {
			return false;
		}
		return true;
	},
};
