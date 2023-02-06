import { MigrationInterface, QueryRunner } from "typeorm";

export class gerarTabelas1667599768964 implements MigrationInterface {
    name = 'gerarTabelas1667599768964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "campaigns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "road" character varying(100) NOT NULL, "number" character varying(50) NOT NULL, "complement" character varying(120) NOT NULL, "city" character varying(50) NOT NULL, "state" character varying(2) NOT NULL, "campaignsId" uuid, CONSTRAINT "PK_9034683839599c80ebe9ebb0891" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "institutions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "cnpj" character varying(18) NOT NULL, "address" character varying(150) NOT NULL, "phone" character varying(11) NOT NULL, "email" character varying(60) NOT NULL, "password" character varying(60) NOT NULL, CONSTRAINT "UQ_9e970cb85e04351d5eb97f41f59" UNIQUE ("cnpj"), CONSTRAINT "UQ_8d110b8f5288cfb6d0e10d938cb" UNIQUE ("email"), CONSTRAINT "PK_0be7539dcdba335470dc05e9690" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "homeless" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "age" character varying(3) NOT NULL, "created_at" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), "picture" text, "institutionId" uuid, CONSTRAINT "PK_61c61bccb04a730339fbb73b56e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "volunteers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "cpf" character varying(11) NOT NULL, "email" character varying(60) NOT NULL, "age" character varying(3) NOT NULL, "telephone" character varying(11) NOT NULL, "password" character varying(60) NOT NULL, CONSTRAINT "PK_f4e65e37cf47256e3f580ecee62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "volunteer_campaigns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "volunteerIdId" uuid, CONSTRAINT "PK_d7b58e94f8aadf0a2f39f88acd1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Address" ADD CONSTRAINT "FK_e52ede3ee52d1e5f3ae247fa7ef" FOREIGN KEY ("campaignsId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD CONSTRAINT "FK_068d87e9f0dc8a0473d59edb9e8" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" ADD CONSTRAINT "FK_1d9a1813f26a200578d626d4063" FOREIGN KEY ("volunteerIdId") REFERENCES "volunteers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" DROP CONSTRAINT "FK_1d9a1813f26a200578d626d4063"`);
        await queryRunner.query(`ALTER TABLE "homeless" DROP CONSTRAINT "FK_068d87e9f0dc8a0473d59edb9e8"`);
        await queryRunner.query(`ALTER TABLE "Address" DROP CONSTRAINT "FK_e52ede3ee52d1e5f3ae247fa7ef"`);
        await queryRunner.query(`DROP TABLE "volunteer_campaigns"`);
        await queryRunner.query(`DROP TABLE "volunteers"`);
        await queryRunner.query(`DROP TABLE "homeless"`);
        await queryRunner.query(`DROP TABLE "institutions"`);
        await queryRunner.query(`DROP TABLE "Address"`);
        await queryRunner.query(`DROP TABLE "campaigns"`);
    }

}
