import { AppDataSource } from "../../db";
import { IntelUltra } from "../../entities/intel/ultra";

export async function saveIntelUltraProcessors(ultraProcessors: any[]) {
	const queryRunner = AppDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		for (const ultra of ultraProcessors) {
			await queryRunner.manager.save(
				IntelUltra,
				queryRunner.manager.create(IntelUltra, ultra)
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