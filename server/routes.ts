import express from "express";
import { getLogin, postRegister } from "./DAL";

export const routes = express.Router();

routes.get("/login/:email/:password", async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
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
