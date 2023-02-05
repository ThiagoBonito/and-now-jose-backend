import { database } from "./datasources";

export const getLogin = async (username: string, password: string) => {
  console.log("login");
  database
    .query("SELECT * FROM USERS")
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  return { username: username, password: password };
};
