import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1664065171646 implements MigrationInterface {
    name = 'initial1664065171646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "color" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_229c1a96f14d7187fccf3684ecc" UNIQUE ("name"), CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "year" integer, "brandId" integer, "model" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brand" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicles_colors" ("vehicle_id" integer NOT NULL, "color_id" integer NOT NULL, CONSTRAINT "PK_bd87b6da28b2481630dd986eff3" PRIMARY KEY ("vehicle_id", "color_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f4369387059b2babbb5724c150" ON "vehicles_colors" ("vehicle_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c79a23f3dc57a8d7acfd285478" ON "vehicles_colors" ("color_id") `);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_42dbf3ac91a7ef82780fed6f407" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles_colors" ADD CONSTRAINT "FK_f4369387059b2babbb5724c1500" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicles_colors" ADD CONSTRAINT "FK_c79a23f3dc57a8d7acfd2854784" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles_colors" DROP CONSTRAINT "FK_c79a23f3dc57a8d7acfd2854784"`);
        await queryRunner.query(`ALTER TABLE "vehicles_colors" DROP CONSTRAINT "FK_f4369387059b2babbb5724c1500"`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_42dbf3ac91a7ef82780fed6f407"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c79a23f3dc57a8d7acfd285478"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f4369387059b2babbb5724c150"`);
        await queryRunner.query(`DROP TABLE "vehicles_colors"`);
        await queryRunner.query(`DROP TABLE "brand"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
        await queryRunner.query(`DROP TABLE "color"`);
    }

}
