import { ArkEntity } from "@pc/entities";
import { AppDataSource } from "../../db";
import { handleError } from "../../global/functions";

export async function saveIntelArkGraphics(arkGraphicsCards: any[]) {
	const queryRunner = AppDataSource.createQueryRunner();
	try {
		await queryRunner.connect();
		await queryRunner.startTransaction();
		for (const ark of arkGraphicsCards) {
			await queryRunner.manager.upsert(
				ArkEntity,
				ark,
				["name"]
			);
		}

		await queryRunner.commitTransaction();
	} catch (error) {
		await queryRunner.rollbackTransaction();
		handleError(error, "Error saving Intel Ark Graphics Cards");
	} finally {
		await queryRunner.release();
	}
}