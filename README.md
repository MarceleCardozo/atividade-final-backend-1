# atividade-final-backend-1

O código apresentado é um exemplo de como criar uma API em Node.js usando a biblioteca Express para gerenciar usuários e seus respectivos recados. A API permite criar novas contas de usuário, listar usuários cadastrados, realizar login, criar novos recados, listar todos os recados de um usuário, atualizar um recado específico e deletar um recado específico.

A biblioteca bcrypt é utilizada para criptografar as senhas dos usuários antes de salvá-las no banco de dados, garantindo a segurança das informações. Além disso, alguns middlewares são utilizados para validar os dados inseridos pelos usuários e evitar a criação de múltiplas contas com o mesmo endereço de email, garantindo a integridade dos dados.

O servidor responde às seguintes rotas:

POST /users: Cria um novo usuário com o nome, email e senha fornecidos no corpo da requisição. A senha é criptografada antes de ser armazenada. O servidor verifica se o email fornecido já está sendo usado por outro usuário antes de criar a nova conta.
GET /users: Retorna a lista de todos os usuários cadastrados no servidor.
POST /users/login: Permite que um usuário faça login no servidor com seu email e senha. O servidor verifica se o email e senha fornecidos correspondem a um usuário cadastrado e, se sim, retorna um token de autenticação.
POST /users/:id/messages: Cria uma nova mensagem para o usuário com o ID fornecido. A mensagem deve ter um título e uma descrição. O servidor verifica se o usuário com o ID fornecido existe antes de criar a mensagem.
GET /users/:id/messages: Retorna a lista de mensagens do usuário com o ID fornecido.
PUT /users/:id/messages/:messageId: Atualiza o título e/ou descrição da mensagem com o ID fornecido, pertencente ao usuário com o ID fornecido. O servidor verifica se o usuário e a mensagem existem antes de fazer a atualização.
DELETE /users/:id/messages/:messageId: Deleta a mensagem com o ID fornecido, pertencente ao usuário com o ID fornecido. O servidor verifica se o usuário e a mensagem existem antes de fazer a deleção.

O servidor é configurado para ouvir as requisições na porta 8080 e apresenta uma rota raiz ("/") que retorna a string "OK" para testar se o servidor está funcionando corretamente.

Para testar a API, você pode fazer requisições usando o Postman ou qualquer outra ferramenta de teste de APIs. O link para acessar a API é https://atividade-final-backend-1-vmfy.onrender.com. Certifique-se de seguir a documentação da API para saber como utilizar cada rota e seus respectivos parâmetros.
