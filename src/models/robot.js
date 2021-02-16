'use strict';

module.exports = function (sequelize, DataTypes) {
	const Robot = sequelize.define('Robot', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		Name: {
			type: DataTypes.STRING,
			field: 'name'
		},
		Status: {
			type: DataTypes.STRING,
			field: 'status'
		},
		Lost_Grid_Position_X: {
			type: DataTypes.INTEGER,
			field: 'lost_grid_position_x'
		},
		Lost_Grid_Position_Y: {
			type: DataTypes.INTEGER,
			field: 'lost_grid_position_y'
		},
		updateAt: {
			type: DataTypes.DATE,
			field: 'updatedat'
		},
		createdAt: {
			type: DataTypes.DATE,
			field: 'createdat'
		}
	}, {
		tableName: 'robot',
		timestamps: false
	});

	Robot.associate = function (models) {
		Robot.hasMany(models.MarsTerrain2Robot, {
			foreingKey: 'RobotId',
			targetKey: 'Id'
		});
	};
	return Robot;
}