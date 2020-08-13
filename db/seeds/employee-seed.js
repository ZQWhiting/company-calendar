const { Employee } = require('../../models');

const employeeData = [
	{
		firstname: 'Adam',
		lastname: 'Adamson',
		email: 'adam@email.com',
		password: 'password',
	},
	{
		firstname: 'Beth',
		lastname: 'Bethson',
		email: 'beth@email.com',
		password: 'password',
	},
	{
		firstname: 'Carl',
		lastname: 'Carlson',
		email: 'carl@email.com',
		password: 'password',
	},
	{
		firstname: 'Daniel',
		lastname: 'Danielson',
		email: 'daniel@email.com',
		password: 'password',
	},
	{
		firstname: 'Eden',
		lastname: 'Edenson',
		email: 'eden@email.com',
		password: 'password',
	},
];

const seedEmployee = () => Employee.bulkCreate(employeeData);

module.exports = seedEmployee;
