import express from "express";

const app = express();

app.use(express.json());

let users = [];

//Criação de conta
app.post("/users", (request, response) => {
  const user = request.body;
  users.push({
    name: user.name,
    email: user.email,
    password: user.password,
  });
  return response.status(201).json("Conta criada com sucesso!");
});

app.get("/", (request, response) => {
  return response.json("OK");
});

app.listen(8080, () => console.log("Servidor iniciado"));
