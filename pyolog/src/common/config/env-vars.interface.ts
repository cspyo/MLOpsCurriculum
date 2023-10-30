export interface EnvVars {
  APP_ENV: string;
  PORT: number;
  ADMIN_USER: string;
  ADMIN_PASSWORD: string;

  // database
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;

  // postgres
  POSTGRES_DB: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
}
