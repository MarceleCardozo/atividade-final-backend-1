import express, { request, response } from "express";
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
    const saltRounds = 10;

    //Criptografando senha com bcrypt
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      if (hash) {
        users.push({
          id: Math.floor(Math.random() * 6767),
          name: user.name,
          email: user.email,
          password: hash,
        });
        return response.status(201).json("Conta criada com sucesso!");
      } else {
        return response.status(400).json("Ocorreu um erro:" + err);
      }
    });
  }
);

//Login
app.post("/users/login", (request, response) => {
  const login = request.body;
  const email = login.email;
  const password = login.password;

  const user = users.find((user) => user.email === email);
  if (!user) {
    return response.status(402).json("Por favor, digite um email válido!");
  }
  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      return response.status(200).json("Usuário logado.");
    } else {
      return response
        .status(402)
        .json("O endereço de email ou a senha que você inseriu não é válido");
    }
  });
});

app.get("/", (request, response) => {
  return response.json("OK");
});

app.listen(8080, () => console.log("Servidor iniciado"));
