const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class CreateRoleTable1732891110776 {
  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "role" (
            id serial primary key,
            created_at timestamptz default current_timestamp,
            updated_at timestamptz default current_timestamp,
            deleted_at timestamptz null,
            title varchar(255) not null,
            is_active boolean default false not null,
            prefix varchar(255) null
        );`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE IF EXISTS "role"`);
  }
};
