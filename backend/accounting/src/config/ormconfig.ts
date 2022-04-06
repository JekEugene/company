import { ConnectionOptions } from 'typeorm'

const config: ConnectionOptions = {
  type: `postgres`,
  host: process.env.HOST || `localhost`,
  port: +process.env.DB_PORT || 4001,
  username: process.env.DB_USERNAME || `postgres`,
  password: process.env.DB_PASSWORD || `root`,
  database: process.env.DB_NAME || `accounting`,
  logging: !!process.env.DB_LOGGING || true,
  synchronize: !!process.env.DB_SYNC || true,
  migrations: [`dist/db/migration/1649265701776-seed.js`],
  entities: [`src/modules/**/**.model.{ts, js}`],
  cli: {
    migrationsDir: `src/db/migration`,
    entitiesDir: `src/modules/**/**.model.{ts, js}`
  },
}

export = config