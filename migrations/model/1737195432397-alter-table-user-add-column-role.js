const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AlterTableUserAddColumnRole1737195432397 {
  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN role_id int4 references role(id) null`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN role_id`);
  }
};
