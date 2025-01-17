const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class CreateMenuTable1736736420693 {
  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "menu" (
                id serial primary key,
                created_at timestamptz default current_timestamp,
                updated_at timestamptz default current_timestamp,
                deleted_at timestamptz null,
                title varchar(255) not null,
                code varchar(255) null,
                is_active boolean default false not null
            );`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE IF EXISTS "menu";`);
  }
};
