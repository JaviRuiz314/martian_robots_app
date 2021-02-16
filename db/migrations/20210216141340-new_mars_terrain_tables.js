'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query('CREATE TABLE IF NOT EXISTS marsterrain( '
        + 'id serial NOT NULL UNIQUE, '
        + 'dimension_x integer, '
        + 'dimension_y integer '
        + ')',
        { transaction }
      );
      await queryInterface.sequelize.query('CREATE TABLE IF NOT EXISTS marsterrain2robot( '
        + 'id serial NOT NULL UNIQUE, '
        + 'marsterrainid integer, '
        + 'robotid integer '
        + ')',
        { transaction }
      );
      await queryInterface.sequelize.query('ALTER TABLE IF EXISTS robot '
        + 'ADD COLUMN lost_grid_position_x  integer, '
        + 'ADD COLUMN lost_grid_position_y  integer ',
        { transaction }
      );
      transaction.commit();
    } catch (error) {
      transaction.rollback();
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query('DROP TABLE marsterrain',
        { transaction }
      );
      await queryInterface.sequelize.query('DROP TABLE marsterrain2robot',
        { transaction }
      );
      await queryInterface.sequelize.query('ALTER TABLE robot '
        + 'DROP COLUMN lost_grid_position_x, ',
        + 'DROP COLUMN lost_grid_position_y ',
      { transaction }
    );
      transaction.commit();
    } catch (error) {
      transaction.rollback();
    }
  }
};
