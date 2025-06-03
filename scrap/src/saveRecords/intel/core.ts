import { AppDataSource } from "../../db";
import { CoreEntity } from "../../entities/intel/core";
import { throwError } from "../../global/functions";

export async function saveIntelCoreIxProcessors(coreIxProcessors: any[]) {
	const queryRunner = AppDataSource.createQueryRunner();
	try {
		await queryRunner.connect();
		await queryRunner.startTransaction();

		for (const coreIx of coreIxProcessors) {
			await queryRunner.manager.upsert(
				CoreEntity,
				coreIx,
				["name"]
			);
		}

		await queryRunner.commitTransaction();
	} catch (error) {
		await queryRunner.rollbackTransaction();
		throwError(error, "Error saving Core Ix processors")
	} finally {
		await queryRunner.release();
	}
}