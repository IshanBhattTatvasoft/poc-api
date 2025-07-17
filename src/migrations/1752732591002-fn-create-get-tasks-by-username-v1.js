'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION public.get_tasks_by_username_v1(input_username text) 
      RETURNS TABLE(
        id integer, 
        task_name character varying, 
        task_priority character varying, 
        istaskcompleted boolean
      )
      LANGUAGE plpgsql
      AS $function$
      BEGIN
        RETURN QUERY
        SELECT 
          t.id, 
          t.task_name, 
          t.task_priority, 
          t.istaskcompleted
        FROM tasks t
        INNER JOIN users u ON t.user_id = u.id
        WHERE u.username = input_username;
      END;
      $function$;
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS public.get_tasks_by_username_v1(text);
    `);
  }
};
