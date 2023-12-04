/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add } = todoList();

describe("Todolist Test Suite", () => {
  test("Should add new todo", () => {
    expect(all.length).toBe(0);
    let dt = new Date();
    dt = dt.toISOString().split("T")[0];
    add({
      title: "Test todo",
      completed: false,
      dueDate: dt,
    });
    expect(all.length).toBe(1);
  });

  test("markAsComplete is working or not", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
});
