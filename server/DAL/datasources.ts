import { Pool } from "pg";

// export const database = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "campeao1",
//   port: 5432,
// });

export const database = new Pool({
  user: "tiandnowjose",
  host: "dpg-cfjusd5a49903flp0b20-a.ohio-postgres.render.com",
  database: "andnowjose",
  password: "HBAkgMgQgbrbc5A4HvqyhhmdiZ5U0WFm",
  port: 5432,
  ssl: true,
});
