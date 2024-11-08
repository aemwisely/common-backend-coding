const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AlterTableUserAddColumnProfile1731079601398 {
  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN profile_image_id int4 references media_object(id) null`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN profile_image_id`);
  }
};
