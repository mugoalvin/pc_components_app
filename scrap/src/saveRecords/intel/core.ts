import { AppDataSource } from "../../db";
import { IntelCoreIx } from "../../entities/intel/core";

export async function saveIntelCoreIxProcessors(coreIxProcessors: any[]) {
	const queryRunner = AppDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		for (const coreIx of coreIxProcessors) {
			await queryRunner.manager.save(
				IntelCoreIx,
				queryRunner.manager.create(IntelCoreIx, coreIx)
			);
		}

		await queryRunner.commitTransaction();
		console.log("Done successfully.");
	} catch (error) {
		console.error("Error saving Core Ix processors:", error);
		await queryRunner.rollbackTransaction();
	} finally {
		await queryRunner.release();
	}
}