import express from "express";
import {
  getLogin,
  getModules,
  postRegister,
  postCreateModulesUser,
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

routes.get("/modules", async (req, res) => {
  const { email } = req.body;
  console.log(email);
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
