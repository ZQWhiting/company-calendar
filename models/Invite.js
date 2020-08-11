const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Invite extends Model {}

Invite.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		inbox_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'inbox',
				key: 'id',
			},
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isIn: [['event', 'group']],
			},
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: 'invite',
	}
);

module.exports = Invite;
