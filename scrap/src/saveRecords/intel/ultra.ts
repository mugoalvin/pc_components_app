import { AppDataSource } from "../../db";
import { UltraEntity } from "@pc/entities";
import { handleError } from "../../global/functions";

export async function saveIntelUltraProcessors(ultraProcessors: any[]) {
	const queryRunner = AppDataSource.createQueryRunner();
	try {
		await queryRunner.connect();
		await queryRunner.startTransaction();

		for (const ultra of ultraProcessors) {
			await queryRunner.manager.upsert(
				UltraEntity,
				ultra,
				["name"]
			);
		}
		await queryRunner.commitTransaction();
	} catch (error) {
		await queryRunner.rollbackTransaction();
		handleError(error, "Error saving Ultra Processors");
	} finally {
		await queryRunner.release();
	}
}