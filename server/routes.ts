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
} from "./DAL";

export const routes = express.Router();

routes.post("/login", async (req, res) => {
  const { email, password } = req.body.auth;
  if (!email && !password) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const consultDataBase = await getLogin(email, password);
    if (!consultDataBase) {
      return res.status(400).send("Usuário ou senha incorretas");
    } else {
      return res.status(200).send(consultDataBase);
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

routes.post("/register", async (req, res) => {
  const { name, email, password, username, image } = req.body.auth;
  if (!name || !email || !password || !username) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const insertDataBase = await postRegister(
      name,
      email,
      password,
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

routes.put("/finishClass", async (req, res) => {
  const { classesWatched, email, module } = req.body.auth;
  if (!email || !classesWatched || !module) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const updateDataBase = await putFinishClass(classesWatched, email, module);
    return res.status(200).send("Aula Finalizada com sucesso!");
  } catch (e) {
    console.log(e);
    return res.status(400).send("Houve um Erro ao finalizar a Aula!");
  }
});
