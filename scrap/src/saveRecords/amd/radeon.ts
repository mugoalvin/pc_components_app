import { AppDataSource } from "../../db";
import { RadeonEntity } from "../../entities/amd/radeon";

export async function saveRadeonCards(radeonCards: any[]) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
        for (const card of radeonCards) {
            await queryRunner.manager.upsert(
                RadeonEntity,
                card,
                ["name"]
            )
        }
        await queryRunner.commitTransaction();
        console.log("\nSuccessfully saved all Radeon Cards.")
    } catch (error) {
        console.error("Error saving Radeon cards:", error);
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
}