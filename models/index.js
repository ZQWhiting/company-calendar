const Employee = require('./Employee');
const Calendar = require('./Calendar');
const Event = require('./Event');
const Inbox = require('./Inbox');
const Invite = require('./Invite');
const Group = require('./Group');
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};

if (config.use_env_variable) {
	var sequelize = new Sequelize(process.env[config.use_env_variable]);
  } else {
	var sequelize = new Sequelize(
	  config.database,
	  config.username,
	  config.password,
	  config
	);
  }
  
  fs.readdirSync(__dirname)
	.filter(function(file) {
	  return (
		file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
	  );
	})
	.forEach(function(file) {
	  var model = sequelize.import(path.join(__dirname, file));
	  db[model.name] = model;
	});
  
  Object.keys(db).forEach(function(modelName) {
	if (db[modelName].associate) {
	  db[modelName].associate(db);
	}
  });
  
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  
  module.exports = db;

// Employee has one calendar
// calendar belongs to one employee
Employee.hasOne(Calendar);
Calendar.belongsTo(Employee, {
	foreignKey: 'employee_id',
});

// event belongs to employee
// employee as many events
Event.belongsTo(Employee, {
	foreignKey: 'employee_id'
});
Employee.hasMany(Event, {
	foreignKey: 'employee_id'
});

// calendar has many events
// event belongs to calendar
Calendar.hasMany(Event, {
	foreignKey: 'calendar_id'
});
Event.belongsTo(Calendar, {
	foreignKey: 'calendar_id',
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

module.exports = {
	Employee,
	Calendar,
	Event,
	Inbox,
	Invite,
	Group,
};
