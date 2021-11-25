import {MigrationInterface, QueryRunner} from "typeorm";

export class generate1636457001144 implements MigrationInterface {
    name = 'generate1636457001144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`second-dose\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_018b9e1e5d70805e0135e42ec9\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`univ-comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` enum ('T1', 'T2', 'T3', 'T4', 'T5') NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`univId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`univ\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`location\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(255) NOT NULL, \`latitude\` decimal(7,5) NOT NULL DEFAULT '0.00000', \`longitude\` decimal(9,6) NOT NULL DEFAULT '0.000000', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`operation-hour\` (\`id\` int NOT NULL AUTO_INCREMENT, \`weekdayOpen\` datetime NOT NULL, \`weekdayClose\` datetime NOT NULL, \`saturdayOpen\` datetime NOT NULL, \`saturdayClose\` datetime NOT NULL, \`sundayOpen\` datetime NOT NULL, \`sundayClose\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`check-up\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` timestamp NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, \`clinicId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clinic\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`label\` enum ('TEMPORARY', 'PERMANENT') NULL, \`address\` varchar(255) NOT NULL, \`latitude\` decimal(7,5) NOT NULL DEFAULT '0.00000', \`longitude\` decimal(9,6) NOT NULL DEFAULT '0.000000', \`telephone\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`operationHourId\` int NULL, UNIQUE INDEX \`REL_125e5f9563191449304a49953d\` (\`operationHourId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clinic-comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` enum ('T1', 'T2', 'T3', 'T4', 'T5') NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`clinicId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nickname\` varchar(255) NOT NULL, \`kakaoAccount\` varchar(255) NOT NULL, \`refreshToken\` text NULL, \`vaccination\` enum ('YES', 'NO') NULL, \`deviceId\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`locationId\` int NULL, \`univId\` int NULL, UNIQUE INDEX \`REL_93e37a8413a5745a9b52bc3c0c\` (\`locationId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`check-up-result\` (\`id\` int NOT NULL AUTO_INCREMENT, \`startTime\` timestamp NOT NULL, \`finishTime\` timestamp NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`second-dose\` ADD CONSTRAINT \`FK_018b9e1e5d70805e0135e42ec9d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`univ-comment\` ADD CONSTRAINT \`FK_924c3e089f54bda03025e249a48\` FOREIGN KEY (\`univId\`) REFERENCES \`univ\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`univ-comment\` ADD CONSTRAINT \`FK_590f581e3f18a9988c6c6a5d63b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`check-up\` ADD CONSTRAINT \`FK_d027a2b69a6916f9b30c46563dc\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`check-up\` ADD CONSTRAINT \`FK_76b3b2f0d2e1dacbc24f688b585\` FOREIGN KEY (\`clinicId\`) REFERENCES \`clinic\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`clinic\` ADD CONSTRAINT \`FK_125e5f9563191449304a49953dc\` FOREIGN KEY (\`operationHourId\`) REFERENCES \`operation-hour\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`clinic-comment\` ADD CONSTRAINT \`FK_dfbbdafc5669b5e5632914bda62\` FOREIGN KEY (\`clinicId\`) REFERENCES \`clinic\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`clinic-comment\` ADD CONSTRAINT \`FK_692c457d283e99325290da772a5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_93e37a8413a5745a9b52bc3c0c1\` FOREIGN KEY (\`locationId\`) REFERENCES \`location\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_05c22deb86c8390713a1d4488ab\` FOREIGN KEY (\`univId\`) REFERENCES \`univ\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`check-up-result\` ADD CONSTRAINT \`FK_252ab71a3dbee9428002c319e74\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`check-up-result\` DROP FOREIGN KEY \`FK_252ab71a3dbee9428002c319e74\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_05c22deb86c8390713a1d4488ab\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_93e37a8413a5745a9b52bc3c0c1\``);
        await queryRunner.query(`ALTER TABLE \`clinic-comment\` DROP FOREIGN KEY \`FK_692c457d283e99325290da772a5\``);
        await queryRunner.query(`ALTER TABLE \`clinic-comment\` DROP FOREIGN KEY \`FK_dfbbdafc5669b5e5632914bda62\``);
        await queryRunner.query(`ALTER TABLE \`clinic\` DROP FOREIGN KEY \`FK_125e5f9563191449304a49953dc\``);
        await queryRunner.query(`ALTER TABLE \`check-up\` DROP FOREIGN KEY \`FK_76b3b2f0d2e1dacbc24f688b585\``);
        await queryRunner.query(`ALTER TABLE \`check-up\` DROP FOREIGN KEY \`FK_d027a2b69a6916f9b30c46563dc\``);
        await queryRunner.query(`ALTER TABLE \`univ-comment\` DROP FOREIGN KEY \`FK_590f581e3f18a9988c6c6a5d63b\``);
        await queryRunner.query(`ALTER TABLE \`univ-comment\` DROP FOREIGN KEY \`FK_924c3e089f54bda03025e249a48\``);
        await queryRunner.query(`ALTER TABLE \`second-dose\` DROP FOREIGN KEY \`FK_018b9e1e5d70805e0135e42ec9d\``);
        await queryRunner.query(`DROP TABLE \`check-up-result\``);
        await queryRunner.query(`DROP INDEX \`REL_93e37a8413a5745a9b52bc3c0c\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`clinic-comment\``);
        await queryRunner.query(`DROP INDEX \`REL_125e5f9563191449304a49953d\` ON \`clinic\``);
        await queryRunner.query(`DROP TABLE \`clinic\``);
        await queryRunner.query(`DROP TABLE \`check-up\``);
        await queryRunner.query(`DROP TABLE \`operation-hour\``);
        await queryRunner.query(`DROP TABLE \`location\``);
        await queryRunner.query(`DROP TABLE \`univ\``);
        await queryRunner.query(`DROP TABLE \`univ-comment\``);
        await queryRunner.query(`DROP INDEX \`REL_018b9e1e5d70805e0135e42ec9\` ON \`second-dose\``);
        await queryRunner.query(`DROP TABLE \`second-dose\``);
    }

}
