import express from "express";
import {
  getLogin,
  getModules,
  getCurrentModule,
  getClass,
  postRegister,
  postCreateModulesUser,
  putFinishClass,
  getTest,
  getCurrentRanking,
  postRanking,
  putRanking,
  getRankings,
  putUser,
} from "./DAL";

import { decrypt, encrypt } from "./encrypt";

export const routes = express.Router();

routes.post("/login", async (req, res) => {
  const { email, password } = req.body.auth;
  if (!email && !password) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const consultDataBase = await getLogin(email);

    const decryptPasswordDataBase = decrypt(consultDataBase.password);

    if (String(password) === String(decryptPasswordDataBase)) {
      return res.status(200).send(consultDataBase);
    } else {
      return res.status(400).send("Usuário ou senha incorretas");
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send("Usuário ou senha incorretas");
  }
});

routes.post("/modules", async (req, res) => {
  const { email } = req.body.auth;
  if (!email) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const consultDataBase = await getModules(email);
    return res.status(200).send(consultDataBase);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Houve um Erro ao criar os Módulos!");
  }
});

routes.get("/rankings/:rankingPage", async (req, res) => {
  try {
    const rankingPage = req.params.rankingPage;
    const consultDataBase = await getRankings(Number(rankingPage));
    return res.status(200).send(consultDataBase);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Houve um Erro ao trazer os Rankings!");
  }
});

routes.post("/profile", async (req, res) => {
  const { email } = req.body.auth;
  if (!email) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const consultDataBase = await getLogin(email);

    if (consultDataBase) {
      return res.status(200).send(consultDataBase);
    } else {
      return res.status(400).send("Usuário não encontrado");
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send("Usuário não encontrado");
  }
});

routes.post("/currentModule", async (req, res) => {
  const { module, email } = req.body.auth;
  if (!email || !module) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const consultDataBase = await getCurrentModule(module, email);
    return res.status(200).send(consultDataBase);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Houve um Erro ao carregar o Módulo!");
  }
});

routes.post("/class", async (req, res) => {
  const { title } = req.body.auth;
  if (!title) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const consultDataBase = await getClass(title);
    return res.status(200).send(consultDataBase);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Houve um Erro ao carregar a Aula!");
  }
});

routes.post("/test", async (req, res) => {
  const { module } = req.body.auth;
  if (!module) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const consultDataBase = await getTest(module);
    return res.status(200).send(consultDataBase);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Houve um Erro ao carregar a Revisão!");
  }
});

routes.post("/checkRanking", async (req, res) => {
  const { email, module } = req.body.auth;
  if (!email || !module) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const consultDataBase = await getCurrentRanking(email, module);
    return res.status(200).send(consultDataBase);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Houve um Erro ao buscar os Rankings!");
  }
});

routes.post("/register", async (req, res) => {
  const { name, email, password, username, image } = req.body.auth;
  if (!name || !email || !password || !username) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  const encryptedPassword = encrypt(password);

  try {
    const insertDataBase = await postRegister(
      name,
      email,
      encryptedPassword,
      username,
      image
    );
    return res.status(200).send("Inserido com sucesso!");
  } catch (e) {
    console.log(e);
    return res.status(400).send("Houve um Erro ao cadastrar!");
  }
});

routes.post("/createModulesUser", async (req, res) => {
  const { email } = req.body.auth;
  if (!email) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const insertDataBase = await postCreateModulesUser(email);
    return res.status(200).send("Módulos inseridos com sucesso!");
  } catch (e) {
    console.log(e);
    return res.status(400).send("Houve um Erro ao criar os Módulos!");
  }
});

routes.post("/insertRanking", async (req, res) => {
  const { email, ranking, module } = req.body.auth;
  if (!email || !ranking || !module) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const insertDataBase = await postRanking(email, ranking, module);
    return res.status(200).send("Ranking inserido com sucesso!");
  } catch (e) {
    console.log(e);
    return res.status(400).send("Houve um Erro ao criar o Ranking!");
  }
});

routes.put("/finishClass", async (req, res) => {
  const { classesWatched, email, title, module } = req.body.auth;
  if (!email || !classesWatched || !title || !module) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const updateDataBase = await putFinishClass(
      classesWatched,
      email,
      title,
      module
    );
    return res.status(200).send("Aula Finalizada com sucesso!");
  } catch (e) {
    console.log(e);
    return res.status(400).send("Houve um Erro ao finalizar a Aula!");
  }
});

routes.put("/updateRanking", async (req, res) => {
  const { email, ranking, module } = req.body.auth;
  if (!email || !ranking || !module) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const updateDataBase = await putRanking(email, ranking, module);
    return res.status(200).send("Ranking atualizado com sucesso!");
  } catch (e) {
    console.log(e);
    return res.status(400).send("Houve um Erro ao atualizar o Ranking!");
  }
});

routes.put("/updateUser", async (req, res) => {
  const { email, fullName, oldPassword, newPassword, photo } = req.body.auth;
  if (!email || !fullName || !oldPassword || !newPassword) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const consultDataBase = await getLogin(email);
    const decryptPasswordDataBase = decrypt(consultDataBase.password);

    if (oldPassword !== decryptPasswordDataBase) {
      return res.status(400).send("Senha atual incorreta!");
    }

    const encryptedNewPassword = encrypt(newPassword);

    const updateDataBase = await putUser(
      email,
      fullName,
      encryptedNewPassword,
      photo
    );
    return res.status(200).send("Usuário atualizado com sucesso!");
  } catch (e) {
    console.log(e);
    return res.status(400).send("Houve um Erro ao atualizar o usuário!");
  }
});
