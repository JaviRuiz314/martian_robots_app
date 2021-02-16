'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Command', {
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
        Movement_change: {
            type: DataTypes.INTEGER,
            field: 'movement_change'
        },
        Direction_change: {
            type: DataTypes.INTEGER,
            field: 'direction_change'
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
        tableName: 'command',
        timestamps: false
    });
}