import express from "express";
import {
  getLogin,
  getModules,
  getCurrentModule,
  getClass,
  postRegister,
  postCreateModulesUser,
  putFinishClass,
} from "./DAL";

export const routes = express.Router();

routes.get("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const consultDataBase = await getLogin(email, password);
    return res.status(200).send(consultDataBase);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Usuário ou senha incorretas");
  }
});

routes.get("/modules", async (req, res) => {
  const { email } = req.body;
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

routes.get("/currentModule", async (req, res) => {
  const { module, email } = req.body;
  if (!email || !module) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const consultDataBase = await getCurrentModule(module, email);
    return res.status(200).send(consultDataBase);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Houve um Erro ao criar os Módulos!");
  }
});

routes.get("/class", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const consultDataBase = await getClass(title);
    return res.status(200).send(consultDataBase);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Houve um Erro ao criar os Módulos!");
  }
});

routes.post("/register", async (req, res) => {
  const { name, email, password, username, image } = req.body;
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
  const { email } = req.body;
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
  const { classesWatched, email, module } = req.body;
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
