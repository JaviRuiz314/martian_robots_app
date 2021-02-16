'use strict';

module.exports = function (sequelize, DataTypes) {
	const MarsTerrain = sequelize.define('MarsTerrain', {
		Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		Dimension_X: {
			type: DataTypes.INTEGER,
			field: 'dimension_x'
		},
		Dimension_Y: {
			type: DataTypes.INTEGER,
			field: 'dimension_y'
		}
	}, {
		tableName: 'marsterrain',
		timestamps: false
	});

	MarsTerrain.associate = function (models) {
		MarsTerrain.hasMany(models.MarsTerrain2Robot, {
			foreingKey: 'MarsTerrainId',
			targetKey: 'Id'
		});
	};
	return MarsTerrain;
}