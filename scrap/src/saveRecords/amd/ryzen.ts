import { AppDataSource } from "../../db";
import { RyzenEntity } from "../../entities/amd/ryzen";

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
		console.error("Error saving Ryzen cards:", error);
		await queryRunner.rollbackTransaction();
	} finally {
		await queryRunner.release();
	}
}