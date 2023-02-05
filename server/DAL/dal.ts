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

export const getModules = async (email: string) => {
  return database
    .query(
      `select * from modules m
      where m.email = '${email}'`
    )
    .then((result) => {
      return result.rows;
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

export const postCreateModulesUser = async (email: string) => {
  return database
    .query(
      `INSERT INTO modules (name, classesWatched, allClasses, email, route)
      VALUES ('Básico do WhatsApp', 0, 10, '${email}', 'WhatsApp');

      INSERT INTO modules (name, classesWatched, allClasses, email, route)
      VALUES ('Navegação na Internet', 0, 10, '${email}', 'Internet');

      INSERT INTO modules (name, classesWatched, allClasses, email, route)
      VALUES ('Segurança na Rede', 0, 10, '${email}', 'Seguranca');`
    )
    .then((result) => {
      return;
    })
    .catch((err) => {
      return err;
    });
};
