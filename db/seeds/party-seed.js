const { Party } = require('../../models');

const partyData = [
	{ name: 'group1' },
	{ name: 'group2' },
	{ name: 'group3' },
	{ name: 'group4' },
];

const seedParty = () => Party.bulkCreate(partyData);

module.exports = seedParty;
