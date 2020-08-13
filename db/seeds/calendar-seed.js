const { Calendar } = require('../../models');

const calendarData = [
	{
		employee_id: 1,
	},
	{
		employee_id: 2,
	},
	{
		employee_id: 3,
	},
	{
		employee_id: 4,
	},
	{
		employee_id: 5,
	},
];

const seedCalendar = () => Calendar.bulkCreate(calendarData);

module.exports = seedCalendar;
