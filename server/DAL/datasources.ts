import { Pool } from "pg";

export const database = new Pool({
  user: "",
  host: "",
  database: "",
  password: "",
  port: 5432,
});
