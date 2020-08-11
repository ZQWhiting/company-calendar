const Employee = require('./Employee');
const Calendar = require('./Calendar');
const Event = require('./Event');
const Inbox = require('./Inbox');
const Invite = require('./Invite');
const Group = require('./Group');

// Employee has one calendar
// calendar belongs to one employee
Employee.hasOne(Calendar);
Calendar.belongsTo(Employee, {
	foreignKey: 'employee_id',
});

// Employee has one inbox
// inbox belongs to one employee
Employee.hasOne(Inbox);
Inbox.belongsTo(Employee, {
	foreignKey: 'employee_id',
});

// Group has many employees
// Employee belongs to many groups
Group.belongsToMany(Employee, {
	through: 'employee_group',
	foreignKey: 'employee_id',
});
Employee.belongsToMany(Group, {
	through: 'employee_group',
	foreignKey: 'group_id',
});

// Inbox has many invites
// Invites belong to one inbox
Inbox.hasMany(Invite);
Invite.belongsTo(Inbox, {
	foreignKey: 'inbox_id',
});

// calendar has many events
// event belongs to many calendars
Calendar.belongsToMany(Event, {
	through: 'calendar_event',
	foreignKey: 'event_id',
});
Event.belongsToMany(Calendar, {
	through: 'calendar_event',
	foreignKey: 'calendar_id',
});

module.exports = {
	Employee,
	Calendar,
	Event,
	Inbox,
	Invite,
	Group,
};
