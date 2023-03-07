const userAuth = require("../middleware/userAuth");

const userController = require("../controllers/user.controller");
const todoController = require("../controllers/todo.controller");

module.exports = (app) => {
  //Users
  app.post("/api/signup", userAuth.checkUserExist, userController.create);
  app.post("/api/login", userController.login);

  //Todos
  app.get("/api/todos", userAuth.checkToken, todoController.getAllTodos);

  //Todo
  app.get("/api/todos/:id", userAuth.checkToken, todoController.getTodo);
  app.post("/api/todos", userAuth.checkToken, todoController.addTodo);
  app.delete("/api/todos/:id", userAuth.checkToken, todoController.deleteTodo);
  app.put("/api/todos/:id", userAuth.checkToken, todoController.updateTodo);
};
