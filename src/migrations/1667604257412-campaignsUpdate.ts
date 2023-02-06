import { MigrationInterface, QueryRunner } from "typeorm";

export class campaignsUpdate1667604257412 implements MigrationInterface {
    name = 'campaignsUpdate1667604257412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "date_creation" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "date_update" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "institutionId" uuid`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "FK_1ec4b0f32baa39f0f578b071e49" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "FK_1ec4b0f32baa39f0f578b071e49"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "institutionId"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "date_update"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "date_creation"`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
