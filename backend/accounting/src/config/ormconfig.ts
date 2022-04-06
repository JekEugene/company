import { DataSource } from 'typeorm'

export const dataSource: DataSource = new DataSource({
	type: `postgres`,
	host: process.env.HOST || `localhost`,
	port: +process.env.DB_PORT || 4001,
	username: process.env.DB_USERNAME || `postgres`,
	password: process.env.DB_PASSWORD || `root`,
	database: process.env.DB_NAME || `accounting`,
	logging: !!process.env.DB_LOGGING || true,
	synchronize: !!process.env.DB_SYNC || true,
	entities: [`./src/modules/**/*.model.ts`],
})
