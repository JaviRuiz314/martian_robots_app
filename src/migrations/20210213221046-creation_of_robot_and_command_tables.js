'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.sequelize.query('CREATE TABLE IF NOT EXISTS robot( '
				+ 'id serial NOT NULL UNIQUE, '
				+ 'status  character varying(250), '
				+ 'name character varying(250), '
				+ 'createdat timestamp without time zone DEFAULT now() NOT NULL, '
				+ 'updatedat timestamp without time zone DEFAULT now() NOT NULL '
				+ ')',
				{ transaction }
			);
      await queryInterface.sequelize.query('CREATE TABLE IF NOT EXISTS command( '
      + 'id serial NOT NULL UNIQUE, '
      + 'name character varying(250), '
      + 'movement_change integer, '
      + 'direction_change integer, '
      + 'createdat timestamp without time zone DEFAULT now() NOT NULL, '
      + 'updatedat timestamp without time zone DEFAULT now() NOT NULL '
      + ')',
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
			await queryInterface.sequelize.query('DROP TABLE robot',
				{ transaction }
			);
      await queryInterface.sequelize.query('DROP TABLE command',
      { transaction }
    );
      transaction.commit();
    } catch (error) {
      transaction.rollback();
    }
  }
};
