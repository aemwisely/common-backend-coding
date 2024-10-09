const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateMediaObject1728449874723 {

    async up(queryRunner) {
        await queryRunner.query(
            `CREATE TABLE media_object (
            id serial primary key,
            created_at timestamptz default current_timestamp,
            updated_at timestamptz default current_timestamp,
            deleted_at timestamptz null,
            filename varchar(255) not null ,
            original_filename varchar(255) null,
            alternative_text varchar(255) null,
            width varchar(255) null,
            height varchar(255) null,
            mime_type varchar(255) null,
            key varchar(255) null,
            size int4 null ,
            due_date timestamptz null,
            path varchar(255) null,
            url text null
            );
            `
        )
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE media_object;`);
    }

}
