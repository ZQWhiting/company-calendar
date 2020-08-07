const Employee = require('./Employee');
const Calendar = require('./Calendar');
const Event = require('./Event');

Employee.hasOne(Calendar, {
	foreignKey: 'employee_id',
});

Calendar.hasMany(Event, {
	foreignKey: 'calendar_id',
});
Calendar.belongsTo(Employee, {
	foreignKey: 'employee_id',
});

Event.belongsTo(Calendar, {
	foreignKey: 'calendar_id',
});

module.exports = {
	Employee,
	Calendar,
	Event,
};
