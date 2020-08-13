const seedCalendar = require('./calendar-seed');
const seedEmployee = require('./employee-seed');
const seedParty = require('./party-seed');
const seedEvent = require('./event-seed');
const seedInbox = require('./inbox-seed');
const seedInvite = require('./invite-seed');

const sequelize = require('../../config/connection');

const seedAll = async () => {
	await sequelize.sync({ force: true });
	console.log('\n----- DATABASE SYNCED -----\n');

	await seedParty();
	console.log('\n----- PARTIES SEEDED -----\n');

	await seedEmployee();
	console.log('\n----- EMPLOYEES SEEDED -----\n');

	await seedCalendar();
	console.log('\n----- CALENDAR SEEDED -----\n');

	await seedInbox();
	console.log('\n----- INBOXES SEEDED -----\n');

	await seedInvite();
	console.log('\n----- INVITES SEEDED -----\n');

	await seedEvent();
	console.log('\n----- EVENTS SEEDED -----\n');

	process.exit(0);
};

seedAll();
