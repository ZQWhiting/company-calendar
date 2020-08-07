const Employee = require('./Employee');
const Calendar = require('./Calendar');

Employee.hasOne(Calendar, {
	foreignKey: 'employee_id',
});

Calendar.belongsTo(Employee, {
	foreignKey: 'employee_id',
});

module.exports = {
	Employee,
	Calendar,
};
