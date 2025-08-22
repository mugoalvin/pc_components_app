import { XeonEntity } from "@pc/entities";
import { AppDataSource } from "../../db";
import { handleError } from "../../global/functions";

export async function saveIntelXeonProcessors(xeonProcessors: any[]) {
	const queryRunner = AppDataSource.createQueryRunner()
	try {
		await queryRunner.connect()
		await queryRunner.startTransaction()

		for (const xeon of xeonProcessors) {
			await queryRunner.manager.upsert(
				XeonEntity,
				xeon,
				["name"]
			)
		}
		await queryRunner.commitTransaction()
	}
	catch (error) {
		await queryRunner.rollbackTransaction()
		handleError(error, "Error saving Xeon Processors")
	}
	finally {
		await queryRunner.release()
	}
}