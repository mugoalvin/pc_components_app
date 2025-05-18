import { AppDataSource } from "../../db";
import { ArkEntity } from "../../entities/intel/ark";

export async function saveIntelArkGraphics(coreIxProcessors: any[]) {
	const queryRunner = AppDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		for (const coreIx of coreIxProcessors) {
			await queryRunner.manager.upsert(
				ArkEntity,
				coreIx,
				["name"]
			);
		}

		await queryRunner.commitTransaction();
		console.log("\nSuccessfully saved Intel Ark Graphics Cards.")
	} catch (error) {
		console.error("Error saving Intel Ark Graphics Cards:", error);
		await queryRunner.rollbackTransaction();
	} finally {
		await queryRunner.release();
	}
}