import { Pool } from "pg";

export const database = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "campeao1",
  port: 5432,
});
