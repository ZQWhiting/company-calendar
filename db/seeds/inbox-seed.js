const { Inbox } = require('../../models');

const inboxData = [
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

const seedInbox = () => Inbox.bulkCreate(inboxData);

module.exports = seedInbox;
