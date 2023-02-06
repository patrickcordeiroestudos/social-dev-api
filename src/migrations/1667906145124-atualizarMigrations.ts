import { MigrationInterface, QueryRunner } from "typeorm";

export class atualizarMigrations1667906145124 implements MigrationInterface {
    name = 'atualizarMigrations1667906145124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "homeless" DROP CONSTRAINT "FK_068d87e9f0dc8a0473d59edb9e8"`);
        await queryRunner.query(`ALTER TABLE "institutions" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Address" ALTER COLUMN "number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Address" ALTER COLUMN "complement" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD CONSTRAINT "FK_068d87e9f0dc8a0473d59edb9e8" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "homeless" DROP CONSTRAINT "FK_068d87e9f0dc8a0473d59edb9e8"`);
        await queryRunner.query(`ALTER TABLE "Address" ALTER COLUMN "complement" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Address" ALTER COLUMN "number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "institutions" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD CONSTRAINT "FK_068d87e9f0dc8a0473d59edb9e8" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
