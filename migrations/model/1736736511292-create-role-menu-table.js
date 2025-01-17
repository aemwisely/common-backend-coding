const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class CreateRoleMenuTable1736736511292 {
  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "role_menu" (
                      id serial primary key,
                      created_at timestamptz default current_timestamp,
                      updated_at timestamptz default current_timestamp,
                      deleted_at timestamptz null,
                      role_id int4 references role(id) not null,
                      menu_id int4 references menu(id) not null,
                      is_active boolean default false not null,
                      permission varchar(255) not null default 'ALL'
                  );`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE IF EXISTS "role_menu";`);
  }
};
