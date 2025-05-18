import { AppDataSource } from "../../db";
import { CoreEntity } from "../../entities/intel/core";

export async function saveIntelCoreIxProcessors(coreIxProcessors: any[]) {
	const queryRunner = AppDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		for (const coreIx of coreIxProcessors) {
			await queryRunner.manager.upsert(
				CoreEntity,
				coreIx,
				["name"]
			);
		}

		await queryRunner.commitTransaction();
		console.log("\nSuccessfully saved Intel Core Processors.")
	} catch (error) {
		console.error("Error saving Core Ix processors:", error);
		await queryRunner.rollbackTransaction();
	} finally {
		await queryRunner.release();
	}
}