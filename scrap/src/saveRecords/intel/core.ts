import { CoreEntity } from "@pc/entities";
import { AppDataSource } from "../../db";
import { handleError } from "../../global/functions";

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
		handleError(error, "Error saving Core Ix processors")
	} finally {
		await queryRunner.release();
	}
}