import { AppDataSource } from "../../db";
import { ArkEntity } from "../../entities/intel/ark";
import { handleError } from "../../global/functions";

export async function saveIntelArkGraphics(arkGraphicsCards: any[]) {
	const queryRunner = AppDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		for (const ark of arkGraphicsCards) {
			await queryRunner.manager.upsert(
				ArkEntity,
				ark,
				["name"]
			);
		}

		await queryRunner.commitTransaction();
		console.log("\nSuccessfully saved Intel Ark Graphics Cards.")
	} catch (error) {
		await queryRunner.rollbackTransaction();
		handleError(error, "Error saving Intel Ark Graphics Cards");
	} finally {
		await queryRunner.release();
	}
}