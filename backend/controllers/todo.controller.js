const moment = require("moment");
const Todo = require("../models").todo;

const getAllTodos = async (req, res) => {
  console.log("Valor de todo");
  Todo.findAll()
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        message: "Error trying to get all todos",
        error,
      });
    });
};

const getTodo = async (req, res) => {
  const { id } = req.params;

  Todo.findOne({ where: { id } })
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error });
    });
};

const addTodo = async (req, res) => {
  const { name } = req.body;
  const todo = {
    name,
    created_at: moment().format("DD-MM-YYYY HH:MM:SS"),
  };

  Todo.create(todo)
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: "Error creating todo", error });
    });
};

const updateTodo = async (req, res) => {
  const { name, complete } = req.body;
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  Todo.destroy({ where: { id } })
    .then((result) => {
      if (result == 1) {
        return res.status(200).json({ message: "Todo deleted" });
      } else {
        return res.status(404).json({ message: "No todo" });
      }
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error ocurred tryint to delete the todo", error });
    });
};

module.exports = {
  getAllTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
