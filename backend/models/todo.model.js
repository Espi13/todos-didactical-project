const { DataTypes, Model, Sequelize } = require("sequelize");
const db = require("./index");
const moment = require("moment");

class Todo extends Model {}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      get: function () {
        return moment(this.getDataValue("created_at")).format(
          "DD-MM-YYYY HH:MM:SS"
        );
      },
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
      get: function () {
        return moment(this.getDataValue("deleted_at")).format(
          "DD/MM/YYYY HH:MM:SS"
        );
      },
    },
  },
  {
    timestamps: false,
    sequelize: db,
    modelName: "todo",
  }
);

module.exports = Todo;
