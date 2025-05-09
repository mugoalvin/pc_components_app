import { AppDataSource } from "../../db";
import { AmdRyzen } from "../../entities/amd/ryzen";

export async function saveRyzenProcessors(ryzenProcessors: any[]) {
	const queryRunner = AppDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		for (const ryzen of ryzenProcessors) {
			await queryRunner.manager.save(
				AmdRyzen,
				queryRunner.manager.create(AmdRyzen, ryzen)
			);
		}

		await queryRunner.commitTransaction();
	} catch (error) {
		console.error("Error saving Ryzen cards:", error);
		await queryRunner.rollbackTransaction();
	} finally {
		await queryRunner.release();
	}
}