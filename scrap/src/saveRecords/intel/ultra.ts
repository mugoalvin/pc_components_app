import { AppDataSource } from "../../db";
import { UltraEntity } from "../../entities/intel/ultra";

export async function saveIntelUltraProcessors(ultraProcessors: any[]) {
	const queryRunner = AppDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		for (const ultra of ultraProcessors) {
			await queryRunner.manager.upsert(
				UltraEntity,
				ultra,
				["name"]
			);
		}
		await queryRunner.commitTransaction();
		console.log("\nSuccessfully saved Intel Ultra Processors.")
	} catch (error) {
		console.error("Error saving Ultra Processors:", error);
		await queryRunner.rollbackTransaction();
	} finally {
		await queryRunner.release();
	}
}