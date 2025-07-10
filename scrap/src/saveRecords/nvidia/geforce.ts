import { AppDataSource } from "../../db";
import { GeForce } from "../../entities/nvidia/geforce";
import { handleError } from "../../global/functions";

export async function saveNvidiaGeForceGraphics(geForceGraphics: any[]) {
	const queryRunner = AppDataSource.createQueryRunner()
	try {
		await queryRunner.connect()
		await queryRunner.startTransaction()
		for(const geforce of geForceGraphics) {
			await queryRunner.manager.upsert(
				GeForce,
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