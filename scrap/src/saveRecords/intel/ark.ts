import { AppDataSource } from "../../db";
import { ArkEntity } from "../../entities/intel/ark";
import { throwError } from "../../global/functions";

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
		throwError(error, "Error saving Intel Ark Graphics Cards");
	} finally {
		await queryRunner.release();
	}
}