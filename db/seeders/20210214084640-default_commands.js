'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.sequelize.query('INSERT INTO command '
				+ '(name, movement_change, direction_change) '
				+ 'VALUES '
				+ '(\'F\', 1, 0), '
				+ '(\'L\', 0, -90), '
				+ '(\'R\', 0, +90)',
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
			await queryInterface.sequelize.query('DELETE FROM command '
				+ 'WHERE name IN (\'F\', \'R\', \'L\') ',
				{ transaction }
			);
      transaction.commit();
    } catch (error) {
      transaction.rollback();
    }
  }
};
