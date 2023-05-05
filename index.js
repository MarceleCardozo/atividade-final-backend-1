import express from "express";
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());

//Middleware para validar dados inseridos pelo usuário para criação de conta
function validateEnteredDataForAccountCreation(request, response, next) {
  const name = request.body.name;
  const email = request.body.email;
  const password = request.body.password;

  if (!name || !email || !password) {
    return response.status(401).json("Por favor, preencha todos os campos.");
  } else {
    next();
  }
}

let users = [];

//Criação de conta
app.post(
  "/users",
  validateEnteredDataForAccountCreation,
  (request, response) => {
    const user = request.body;
    users.push({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return response.status(201).json("Conta criada com sucesso!");
  }
);

app.get("/", (request, response) => {
  return response.json("OK");
});

app.listen(8080, () => console.log("Servidor iniciado"));
