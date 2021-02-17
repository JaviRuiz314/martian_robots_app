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
        + 'ADD COLUMN lost_grid_position integer ARRAY, '
        + 'ADD COLUMN lost_grid_orientation character varying(250), '
        + 'ADD COLUMN last_known_command  character varying(250) ',
        { transaction }
      );
      transaction.commit();
    } catch (error) {
      console.log('ERROR: ' + error);
      transaction.rollback();
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query('DROP TABLE marsterrain2robot',
        { transaction }
      );

      await queryInterface.sequelize.query('DROP TABLE marsterrain',
        { transaction }
      );

      await queryInterface.sequelize.query('ALTER TABLE robot '
        + 'DROP COLUMN lost_grid_position, ',
        + 'DROP COLUMN last_known_command ',
        { transaction }
      );
      transaction.commit();
    } catch (error) {
      transaction.rollback();
    }
  }
};
