import express from "express";
import { getLogin } from "./DAL";

export const routes = express.Router();

routes.get("/login/:username/:password", async (req, res) => {
  const username = req.params.username;
  const password = req.params.password;
  if (!username && !password) {
    return res.status(400).send("ERROR: Incorrect parameters");
  }

  try {
    const consultDataBase = await getLogin(username, password);
    console.log(consultDataBase);
    return res.status(200).send(consultDataBase);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Usuário ou senha incorretas");
  }
});
