# atividade-final-backend-1

O código apresentado é um exemplo de como criar um servidor web em Node.js utilizando a biblioteca Express, com o objetivo de criar uma API (Interface de Programação de Aplicativos) para gerenciar usuários e seus respectivos recados.

A API suporta as seguintes funcionalidades:

- Criar uma nova conta de usuário (rota POST /users).
- Listar todos os usuários cadastrados (rota GET /users).
- Realizar login de um usuário (rota POST /users/login).
- Criar um novo recado para um determinado usuário (rota POST /users/:id/messages).
- Listar todos os recados de um determinado usuário (rota GET /users/:id/messages).
- Atualizar um recado específico de um determinado usuário (rota PUT /users/:id/messages/:messageId).
- Deletar um recado específico de um determinado usuário (rota DELETE /users/:id/messages/:messageId).

O código utiliza a biblioteca bcrypt para criptografar as senhas dos usuários antes de salvá-las no banco de dados. Além disso, também são utilizados alguns middlewares para validar os dados inseridos pelos usuários e evitar que múltiplas contas sejam criadas com o mesmo endereço de email.

Por fim, o servidor está configurado para ouvir as requisições na porta 8080 e apresenta uma rota raiz ("/") que retorna a string "OK" para testar se o servidor está funcionando corretamente.
