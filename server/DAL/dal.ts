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
      console.log(err);
      return err;
    });
};

export const getModules = async (email: string) => {
  return database
    .query(
      `select * from modules m
      where m.email = '${email}'
      order by id`
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
      return err;
    });
};

export const getCurrentRanking = async (email: string, module: string) => {
  return database
    .query(
      `select * from rankings r
      where r.email = '${email}'
      and r.module = '${module}'`
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err);
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
      console.log(err);
      return err;
    });
};

export const postCreateModulesUser = async (email: string) => {
  return database
    .query(
      `INSERT INTO modules (name, classeswatched, allclasses, email, route)
      VALUES ('Básico do WhatsApp', 0, 10, '${email}', 'WhatsApp');

      INSERT INTO modulesdetails ("module", classeswatched, allclasses, classes, email)
      VALUES ('WhatsApp', 0, 10, '[{"id": 1, "title": "Instalando o WhatsApp", "isFinished": true},{"id": 2, "title": "Configurando sua Conta", "isFinished": false}]', '${email}');

      INSERT INTO modules (name, classeswatched, allclasses, email, route)
      VALUES ('Navegação na Internet', 0, 10, '${email}', 'Internet');

      INSERT INTO modulesdetails ("module", classeswatched, allclasses, classes, email)
      VALUES ('Internet', 0, 10, '[{"id": 1, "title": "Conhecendo o Google", "isFinished": true},{"id": 2, "title": "Pesquisas Avançadas", "isFinished": false}]', '${email}');

      INSERT INTO modules (name, classeswatched, allclasses, email, route)
      VALUES ('Segurança na Rede', 0, 10, '${email}', 'Seguranca');
      
      INSERT INTO modulesdetails ("module", classeswatched, allclasses, classes, email)
      VALUES ('Seguranca', 0, 10, '[{"id": 1, "title": "Instalando o Anti-vírus", "isFinished": true},{"id": 2, "title": "Descobrir se um site é confiável", "isFinished": false}]', '${email}');
      `
    )
    .then((result) => {
      return;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const postRanking = async (
  email: string,
  ranking: number,
  module: string
) => {
  return database
    .query(
      `
      insert into rankings (module, ranking, email)
      values ('${module}', ${ranking}, '${email}')
      `
    )
    .then((result) => {
      return;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const putFinishClass = async (
  classesWatched: number,
  email: string,
  title: string,
  module: string
) => {
  return database
    .query(
      `update modules m set classeswatched = ${classesWatched}
      where m.email = '${email}' and m.route = '${module}';
      
      update modulesDetails md set classeswatched = ${classesWatched}
      where md.email = '${email}' and md."module" = '${module}';

      UPDATE modulesDetails
      SET classes = subquery.new_classes
      FROM (
      SELECT jsonb_agg(
      CASE 
      WHEN c->>'title' = '${title}' 
      THEN jsonb_set(c, '{isFinished}', 'true'::jsonb) 
      ELSE c 
      END
    ) AS new_classes
    FROM modulesDetails, jsonb_array_elements(classes) AS c
    WHERE classes @> '[{"title": "${title}"}]' AND email = '${email}' AND module = '${module}'
    ) AS subquery
    WHERE modulesDetails.email = '${email}' AND modulesDetails.module = '${module}';
      `
    )
    .then((result) => {
      return;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const putRanking = (email: string, ranking: number, module: string) => {
  return database
    .query(
      `
      update rankings set ranking = ${ranking}
      where email = '${email}'
      and module = '${module}'
      `
    )
    .then((result) => {
      return;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
