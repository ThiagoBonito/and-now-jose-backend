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

export const getCurrentModule = async (module: string, email: string) => {
  return database
    .query(
      `select * from modulesdetails md
      where md."module" = '${module}'
      and md."email" = '${email}'`
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err;
    });
};

export const getClass = async (title: string) => {
  return database
    .query(
      `select * from classes c
      where c.title = '${title}'`
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err;
    });
};

export const getTest = async (module: string) => {
  return database
    .query(
      `select * from tests t
      where t."module" = '${module}'`
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

      INSERT INTO modulesDetails ("module", classeswatched, allclasses, classes, email)
      VALUES ('WhatsApp', 0, 10, '[{"id": 1, "title": "Instalando o WhatsApp", "isFinished": true},{"id": 2, "title": "Configurando sua Conta", "isFinished": false}]', '${email}');

      INSERT INTO modules (name, classesWatched, allClasses, email, route)
      VALUES ('Navegação na Internet', 0, 10, '${email}', 'Internet');

      INSERT INTO modulesDetails ("module", classeswatched, allclasses, classes, email)
      VALUES ('Internet', 0, 10, '[{"id": 1, "title": "Conhecendo o Google", "isFinished": true},{"id": 2, "title": "Pesquisas Avançadas", "isFinished": false}]', '${email}');

      INSERT INTO modules (name, classesWatched, allClasses, email, route)
      VALUES ('Segurança na Rede', 0, 10, '${email}', 'Seguranca');
      
      INSERT INTO modulesDetails ("module", classeswatched, allclasses, classes, email)
      VALUES ('Seguranca', 0, 10, '[{"id": 1, "title": "Instalando o Anti-vírus", "isFinished": true},{"id": 2, "title": "Descobrir se um site é confiável", "isFinished": false}]', '${email}');
      `
    )
    .then((result) => {
      return;
    })
    .catch((err) => {
      return err;
    });
};

export const putFinishClass = async (
  classesWatched: number,
  email: string,
  module: string
) => {
  return database
    .query(
      `update modules m set classeswatched = ${classesWatched}
      where m.email = '${email}' and m.route = '${module}';
      
      update modulesDetails md set classeswatched = ${classesWatched}
      where md.email = '${email}' and md."module" = '${module}';
      `
    )
    .then((result) => {
      return;
    })
    .catch((err) => {
      return err;
    });
};
