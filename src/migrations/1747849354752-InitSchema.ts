import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1747849354752 implements MigrationInterface {
    name = 'InitSchema1747849354752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" DROP CONSTRAINT "FK_f3ddc60370d605aaf3c6a054160"`);
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" DROP CONSTRAINT "FK_9a55dbbd14b1c861ce67734ac11"`);
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."status_participacao_enum" AS ENUM('Ativo', 'Inativo')`);
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" ADD "status" "public"."status_participacao_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" ALTER COLUMN "estudoClinicoId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" ALTER COLUMN "pacienteId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" ADD CONSTRAINT "FK_f3ddc60370d605aaf3c6a054160" FOREIGN KEY ("estudoClinicoId") REFERENCES "estudo_clinico"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" ADD CONSTRAINT "FK_9a55dbbd14b1c861ce67734ac11" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" DROP CONSTRAINT "FK_9a55dbbd14b1c861ce67734ac11"`);
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" DROP CONSTRAINT "FK_f3ddc60370d605aaf3c6a054160"`);
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" ALTER COLUMN "pacienteId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" ALTER COLUMN "estudoClinicoId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."status_participacao_enum"`);
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" ADD CONSTRAINT "FK_9a55dbbd14b1c861ce67734ac11" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participacao_estudo_clinico" ADD CONSTRAINT "FK_f3ddc60370d605aaf3c6a054160" FOREIGN KEY ("estudoClinicoId") REFERENCES "estudo_clinico"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
