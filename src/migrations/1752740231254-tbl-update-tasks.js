'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE tasks
      ADD COLUMN IF NOT EXISTS task_deadline TIMESTAMP;
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE tasks
      DROP COLUMN IF EXISTS task_deadline;
    `);
  }
};
