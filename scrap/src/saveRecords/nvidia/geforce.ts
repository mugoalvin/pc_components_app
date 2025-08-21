import { AppDataSource } from "../../db";
import { GeForceEntity } from "@pc/entities";
import { handleError } from "../../global/functions";

export async function saveNvidiaGeForceGraphics(geForceGraphics: any[]) {
	const queryRunner = AppDataSource.createQueryRunner()
	try {
		await queryRunner.connect()
		await queryRunner.startTransaction()
		for (const geforce of geForceGraphics) {
			await queryRunner.manager.upsert(
				GeForceEntity,
				geforce,
				["name"]
			)
		}

		await queryRunner.commitTransaction()
	}
	catch (error) {
		await queryRunner.rollbackTransaction()
		handleError(error, "Error saving Nvidia Cards")
	}
	finally {
		await queryRunner.release()
	}
}