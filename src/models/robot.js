'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Robot', {
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
}