import { ColumnOptions, ColumnType } from "typeorm";

export function getColumnOptions(columnType?: ColumnType, extraOptions?: Partial<ColumnOptions>) {
	return {
		type: columnType && columnType,
		nullable: true,
		...extraOptions
	} as ColumnOptions
}