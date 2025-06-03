import { AppDataSource } from "../../db";
import { RyzenEntity } from "../../entities/amd/ryzen";
import { throwError } from "../../global/functions";

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
		throwError(error, "Error saving Ryzen cards");
	} finally {
		await queryRunner.release();
	}
}