import { database } from "./datasources";

export const getLogin = async (email: string) => {
  return database
    .query(
      `select * from users u
      where u.email = '${email}'`
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

export const getRankings = async (rankingPage = 0) => {
  if (rankingPage === 1) {
    return database
      .query(
        `
        select u.name, u.image, b.data, b.totalpoints:: int from (
          SELECT a.email, a.data, SUM((elem->>'points')::int) AS totalpoints
          FROM (
            SELECT ra.email, jsonb_agg(row_to_json(r)) AS data
            FROM (
              SELECT email, ranking, module, 
                SUM(
                CASE 
                  WHEN ranking = 5 THEN 5
                  WHEN ranking = 4 THEN 10
                  WHEN ranking = 3 THEN 15
                  WHEN ranking = 2 THEN 20
                  WHEN ranking = 1 THEN 25
                  ELSE 0
                END
                ) AS points
              FROM rankings ra
              GROUP BY email, ranking, module 
              ) r
            INNER JOIN rankings ra ON r.email = ra.email AND r.module = ra.module
            GROUP BY ra.email
              ) a
            CROSS JOIN LATERAL jsonb_array_elements(a.data) AS elem
            GROUP BY a.email, a.data
          ) b
        INNER JOIN users u ON u.email = b.email
        order by b.totalpoints desc;
      `
      )
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  } else {
    return database
      .query(
        `
        select u.name, u.image, b.data, b.totalpoints:: int from (
          SELECT a.email, a.data, SUM((elem->>'points')::int) AS totalpoints
          FROM (
            SELECT ra.email, jsonb_agg(row_to_json(r)) AS data
            FROM (
              SELECT email, ranking, module, 
                SUM(
                CASE 
                  WHEN ranking = 5 THEN 5
                  WHEN ranking = 4 THEN 10
                  WHEN ranking = 3 THEN 15
                  WHEN ranking = 2 THEN 20
                  WHEN ranking = 1 THEN 25
                  ELSE 0
                END
                ) AS points
              FROM rankings ra
              GROUP BY email, ranking, module 
              ) r
            INNER JOIN rankings ra ON r.email = ra.email AND r.module = ra.module
            GROUP BY ra.email
              ) a
            CROSS JOIN LATERAL jsonb_array_elements(a.data) AS elem
            GROUP BY a.email, a.data
          ) b
        INNER JOIN users u ON u.email = b.email
        order by b.totalpoints desc
        limit 6;
      `
      )
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
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
      VALUES ('Básico do WhatsApp', 0, 9, '${email}', 'WhatsApp');

      insert into modulesDetails ("module", classeswatched, allclasses, classes, email)
      values ('WhatsApp', 0, 9, '[{"id": 1, "title": "Instalando o WhatsApp", "isFinished": false},{"id": 2, "title": "Personalizando o WhatsApp", "isFinished": false},{"id": 3, "title": "Iniciando uma Conversa", "isFinished": false},{"id": 4, "title": "Chamadas no WhatsApp", "isFinished": false},{"id": 5, "title": "Meus Emojis e Figurinhas", "isFinished": false},{"id": 6, "title": "Usando Multimídia", "isFinished": false},{"id": 7, "title": "Trabalho em Equipe", "isFinished": false},{"id": 8, "title": "Meu Status", "isFinished": false},{"id": 9, "title": "Segurança no WhatsApp", "isFinished": false}]', '${email}')

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

export const putUser = (
  email: string,
  fullName: string,
  newPassword: string,
  photo: string
) => {
  if (photo) {
    return database
      .query(
        `
        update users  set "name" = '${fullName}', "password" = '${newPassword}', image = '${photo}'
        where email = '${email}'
        `
      )
      .then((result) => {
        return;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  } else {
    return database
      .query(
        `
        update users  set "name" = '${fullName}', "password" = '${newPassword}'
        where email = '${email}'
        `
      )
      .then((result) => {
        return;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
};
