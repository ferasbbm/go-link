type DatabaseType = 'mysql' | 'postgres';

export const databaseConfig = () => ({
  type: process.env.DB_TYPE as DatabaseType,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'go_link',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  autoLoadEntities: true,
});
