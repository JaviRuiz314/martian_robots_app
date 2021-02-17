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
		LostGridPosition: {
			type: DataTypes.ARRAY((DataTypes.INTEGER)),
			field: 'lost_grid_position'
		},
		LostGridOrientation: {
			type: DataTypes.STRING,
			field: 'lost_grid_orientation'
		},
		LastKnownCommand: {
			type: DataTypes.STRING,
			field: 'last_known_command'
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