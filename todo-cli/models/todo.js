// models/todo.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueTasks = await Todo.overdue();
      console.log(overdueTasks);

      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const dueTodayList = await Todo.dueToday();
      console.log(dueTodayList);
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const dueLaterList = await Todo.dueLater();
      console.log(dueLaterList);
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const { Op } = require("sequelize");
      let dt = new Date().toISOString().split("T")[0];
      let arr = await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: dt,
          },
        },
      });
      let arr1 = arr.map((todo) => todo.displayableString()).join("\n");
      return arr1;
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const { Op } = require("sequelize");
      let dt = new Date().toISOString().split("T")[0];
      let arr = await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: dt,
          },
        },
      });
      let arr1 = arr.map((todo) => todo.displayableString1()).join("\n");
      return arr1;
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const { Op } = require("sequelize");
      let dt = new Date().toISOString().split("T")[0];
      let arr = await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: dt,
          },
        },
      });
      let arr1 = arr.map((todo) => todo.displayableString()).join("\n");
      return arr1;
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      await Todo.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        },
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
    displayableString1() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};