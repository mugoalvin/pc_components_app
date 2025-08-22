import { RyzenEntity } from "@pc/entities";
import { AppDataSource } from "../../db";
import { handleError } from "../../global/functions";

export async function saveRyzenProcessors(ryzenProcessors: any[]) {
	const queryRunner = AppDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		for (const ryzen of ryzenProcessors) {
			await queryRunner.manager.upsert(
				RyzenEntity,
				ryzen,
				["name"]
			);
		}

		await queryRunner.commitTransaction();
		console.log("\nSuccessfully saved all Ryzen Processors")
	} catch (error) {
		await queryRunner.rollbackTransaction();
		handleError(error, "Error saving Ryzen cards");
	} finally {
		await queryRunner.release();
	}
}