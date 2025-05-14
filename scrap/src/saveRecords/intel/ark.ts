import { AppDataSource } from "../../db";
import { Ark } from "../../entities/intel/ark";

export async function saveIntelArkGraphics(coreIxProcessors: any[]) {
	const queryRunner = AppDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		for (const coreIx of coreIxProcessors) {
			await queryRunner.manager.save(
				Ark,
				queryRunner.manager.create(Ark, coreIx)
			);
		}

		await queryRunner.commitTransaction();
		console.log("Successfully saved Intel Ark Graphics Cards.");
	} catch (error) {
		console.error("Error saving Intel Ark Graphics Cards:", error);
		await queryRunner.rollbackTransaction();
	} finally {
		await queryRunner.release();
	}
}