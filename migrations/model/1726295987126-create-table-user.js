const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class CreateTableUser1726295987126 {
  async up(queryRunner) {
    await queryRunner.query(
      `
            CREATE TABLE "user"(
                id serial primary key,
                created_at timestamptz default current_timestamp,
                updated_at timestamptz default current_timestamp,
                deleted_at timestamptz null,
                email varchar(255) not null unique,
                password varchar(255) not null,
                is_active boolean default false not null,
                first_name varchar(255) null,
                last_name varchar(255) null
            );
    `,
    );
  }

  async down(queryRunner) {
    await queryRunner.query('DROP TABLE "user";');
  }
};
