import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1700740558980 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE Product ADD COLUMN qunatity'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
