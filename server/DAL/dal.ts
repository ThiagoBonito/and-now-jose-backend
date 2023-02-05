import { database } from "./datasources";

export const getLogin = async (email: string, password: string) => {
  return database
    .query(
      `select * from users u
      where u.email = '${email}'
      and u.password = '${password}'`
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return err;
    });
};

export const postRegister = async (
  name: string,
  email: string,
  password: string,
  username: string,
  image = null
) => {
  return database
    .query(
      `INSERT INTO users (name, email, password, username, image)
      VALUES ('${name}', '${email}', '${password}', '${username}', ${image})`
    )
    .then((result) => {
      return;
    })
    .catch((err) => {
      return err;
    });
};
