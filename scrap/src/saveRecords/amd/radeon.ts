import { AppDataSource } from "../../db";
import { RadeonEntity } from "../../entities/amd/radeon";
import { throwError } from "../../global/functions";

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
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throwError(error, "Error saving Radeon cards");
    } finally {
        await queryRunner.release();
    }
}