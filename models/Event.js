const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		start_time: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		end_time: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		calendar_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'calendar',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'event',
	}
);

module.exports = Event;
