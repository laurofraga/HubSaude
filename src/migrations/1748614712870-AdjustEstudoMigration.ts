import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustEstudoMigration1748614712870 implements MigrationInterface {
    name = 'AdjustEstudoMigration1748614712870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estudo_clinico" DROP CONSTRAINT "FK_da59013ac95413f376c26baf9c6"`);
        await queryRunner.query(`ALTER TABLE "estudo_clinico" ALTER COLUMN "centroClinicoId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "estudo_clinico" ADD CONSTRAINT "FK_da59013ac95413f376c26baf9c6" FOREIGN KEY ("centroClinicoId") REFERENCES "centro_clinico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estudo_clinico" DROP CONSTRAINT "FK_da59013ac95413f376c26baf9c6"`);
        await queryRunner.query(`ALTER TABLE "estudo_clinico" ALTER COLUMN "centroClinicoId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "estudo_clinico" ADD CONSTRAINT "FK_da59013ac95413f376c26baf9c6" FOREIGN KEY ("centroClinicoId") REFERENCES "centro_clinico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
