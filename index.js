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
          messages: [],
        });
        return response.status(201).json("Conta criada com sucesso!");
      } else {
        return response.status(400).json("Ocorreu um erro:" + err);
      }
    });
  }
);

//Leitura dos usuários para pegar o id
app.get("/users", (request, response) => {
  return response.status(200).json(users);
});

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
      return response
        .status(200)
        .json({ message: "Usuário logado!", id: user.id });
    } else {
      return response
        .status(402)
        .json("O endereço de email ou a senha que você inseriu não é válido");
    }
  });
});

//Criar recado
app.post("/users/:id/messages", (request, response) => {
  const newMessage = request.body;
  const id = Number(request.params.id);

  const idUsers = users.findIndex((user) => user.id === id);
  if (idUsers === -1) {
    return response.status(404).json("Usuário não encontrado.");
  }

  users[idUsers].messages.push({
    messageId: Math.floor(Math.random() * 5454),
    title: newMessage.title,
    description: newMessage.description,
  });
  return response.status(201).json("Recado criado com sucesso!");
});

//Ler/listar recados
app.get("/users/:id/messages", (request, response) => {
  const id = Number(request.params.id);

  const idUsers = users.filter((user) => user.id === id);

  if (idUsers.length === 0) {
    return response.status(404).json("Usuário não encontrado");
  }

  return response.status(200).json(idUsers[0].messages);
});

//Atualização de recados
app.put("/users/:id/messages/:messageId", (request, response) => {
  const id = Number(request.params.id);
  const messageId = Number(request.params.messageId);

  const idUsers = users.filter((user) => user.id === id);

  if (idUsers.length === 0) {
    return response.status(404).json("Usuário não encontrado.");
  }

  const message = idUsers[0].messages.find(
    (message) => message.messageId === messageId
  );

  if (!message) {
    return response.status(404).json("Recado não encontrado.");
  }

  message.title = request.body.title;
  message.description = request.body.description;

  const updatedMessage = {
    messageId: message.messageId,
    title: message.title,
    description: message.description,
  };

  return response.status(200).json("Recado atualizado com sucesso!");
});

//Deletar recados
app.delete("/users/:id/messages/:messageId", (request, response) => {
  const id = Number(request.params.id);
  const messageId = Number(request.params.messageId);

  const idUsers = users.filter((user) => user.id === id);

  if (idUsers.length === 0) {
    return response.status(404).json("Usuário não encontrado");
  }

  const message = idUsers[0].messages.find(
    (message) => message.messageId === messageId
  );

  if (!message) {
    return response.status(404).json("Recado não encontrado");
  }

  idUsers[0].messages.splice(idUsers[0].messages.indexOf(message), 1);
  return response.status(200).json("Recado deletado com sucesso!");
});

app.get("/", (request, response) => {
  return response.json("OK");
});

app.listen(8080, () => console.log("Servidor iniciado"));
