import pg from "pg";
const DbUrl = process.env.DATABASE_URL;
if (!DbUrl) {
  throw new Error("DATABASE_URL não definida no .env");
}

const { Pool } = pg;

export const pool = new Pool({
  connectionString: DbUrl,
});
