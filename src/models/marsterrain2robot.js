'use strict';

module.exports = function (sequelize, DataTypes) {
	const MarsTerrain2Robot = sequelize.define('MarsTerrain2Robot', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		MarsTerrainId: {
			type: DataTypes.INTEGER,
			field: 'marsterrainid'
		},
		RobotId: {
			type: DataTypes.INTEGER,
			field: 'robotid'
		}
	}, {
		tableName: 'marsterrain2robot',
		timestamps: false
	});

	MarsTerrain2Robot.associate = function (models) {
		MarsTerrain2Robot.belongsTo(models.Robot, {
			foreingKey: 'RobotId',
			targetKey: 'Id'
		});
		MarsTerrain2Robot.belongsTo(models.MarsTerrain, {
			foreingKey: 'MarsTerrainId',
			targetKey: 'Id'
		});
	};
	return MarsTerrain2Robot;
}