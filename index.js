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

//Middleware não ter mais de uma conta criada com o mesmo email
function emailValidator(request, response, next) {
  const email = request.body.email;

  if (users.some((user) => user.email === email)) {
    return response.status(409).json("O endereço de email digitado já existe!");
  }

  next();
}

let users = [];

let messages = [];

//Criação de conta
app.post(
  "/users",
  validateEnteredDataForAccountCreation,
  emailValidator,
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

//Criar recado
app.post("/users/login/messages", (request, response) => {
  const newMessage = request.body;
  messages.push({
    messageId: Math.floor(Math.random() * 5454),
    title: newMessage.title,
    description: newMessage.description,
  });
  return response.status(201).json("Recado criado com sucesso!");
});

//Ler/listar recados
app.get("/users/login/messages", (request, response) => {
  const email = request.query.email;
  if (email) {
    const res = users.filter((user) => user.email === email);
    return response.status(200).json(messages);
  }
});

//Atualização de recados
app.put("/users/:messageId", (request, response) => {
  const message = request.body;
  const messageId = Number(request.params.messageId);
  const indexMessage = messages.findIndex(
    (message) => message.messageId === messageId
  );
  messages[indexMessage] = {
    messageId: messageId,
    title: message.title,
    description: message.description,
  };
  return response.status(200).json(messages[indexMessage]);
});

//Deletar recados
app.delete("/users/:messageId", (request, response) => {
  const messageId = request.params.messageId;
  const indexMessage = messages.findIndex(
    (message) => message.messageId === Number(messageId)
  );

  messages.splice(indexMessage, 1);
  return response.status(200).json("Recado deletado com sucesso!");
});

app.get("/", (request, response) => {
  return response.json("OK");
});

app.listen(8080, () => console.log("Servidor iniciado"));
