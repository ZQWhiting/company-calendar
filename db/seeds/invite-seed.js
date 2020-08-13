const { Invite } = require('../../models');

const inviteData = [
	{ inbox_id: '1', type: 'event' },
	{ inbox_id: '2', type: 'event' },
	{ inbox_id: '3', type: 'event' },
	{ inbox_id: '2', type: 'group' },
	{ inbox_id: '4', type: 'event' },
	{ inbox_id: '5', type: 'group' },
	{ inbox_id: '4', type: 'group' },
];

const seedInvite = () => Invite.bulkCreate(inviteData);

module.exports = seedInvite;
