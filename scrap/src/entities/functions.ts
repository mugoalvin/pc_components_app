import { ColumnOptions, ColumnType } from "typeorm";

export function getColumnOptions(columnType?: ColumnType) {
	return {
		type: columnType && columnType,
		nullable: true,
	} as ColumnOptions
}