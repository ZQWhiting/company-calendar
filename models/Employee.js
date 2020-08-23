const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Employee extends Model {
	checkPassword(loginPw) {
		return bcrypt.compareSync(loginPw, this.password);
	}
}

Employee.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		firstname: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlpha: true,
			},
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlpha: true,
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
			  isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4],
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'employee',
		hooks: {
			async beforeBulkCreate(employees) {
				for (const employee of employees) {
					const { password } = employee;
					employee.password = await bcrypt.hash(password, 10);
				}
			},
			async beforeCreate(newEmployeeData) {
				newEmployeeData.password = await bcrypt.hash(
					newEmployeeData.password,
					10
				);
				return newEmployeeData;
			},
			async beforeUpdate(updatedEmployeeData) {
				updatedEmployeeData.password = await bcrypt.hash(
					updatedEmployeeData.password,
					10
				);
				return updatedEmployeeData;
			},
		},
	}
);

module.exports = Employee;
