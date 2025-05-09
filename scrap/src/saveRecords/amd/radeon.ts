import { AppDataSource } from "../../db";
import { AmdRadeon } from "../../entities/amd/radeon";

export async function saveRadeonCards(radeonCards: any[]) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
        for (const card of radeonCards) {
            await queryRunner.manager.save(
				AmdRadeon,
				queryRunner.manager.create(AmdRadeon, card)
			);
        }

        await queryRunner.commitTransaction();
    } catch (error) {
        console.error("Error saving Radeon cards:", error);
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
}