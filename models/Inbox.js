const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Inbox extends Model {}

Inbox.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		employee_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'employee',
				key: 'id',
			},
		},
	},
	{
		name: {
			singular: 'inbox',
			plural: 'inboxes',
		},
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'inbox',
	}
);

module.exports = Inbox;
