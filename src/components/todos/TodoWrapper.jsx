import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useState, useEffect } from "react";
import uuid from "react-uuid";
import TodoActions from "./TodoActions";
import styled from "styled-components";

const TodoWrapper = () => {
  const [todos, setTodos] = useState(getLocalStorage());

  //функция для добавления новой задачи
  const addTodoHandler = (text) => {
    const newTodo = {
      text: text,
      isCompleted: false,
      id: uuid(), //библиотека для генегации уникального id
      date: new Date().toLocaleString(),
    };
    // добавляем новую задачу к сущ списку
    setTodos([...todos, newTodo]);
  };

  // удаление задачи с помощю id
  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((item) => item.id !== id)); //делает фильтр и удаляет по id
  };

  // переключение задачи завершена или не завершена
  const toogleTodoHandler = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted } //изменить задачи наоборот
          : { ...todo };
      })
    );
  };

  // функция для удаление всех задач
  const resetTodosHandler = () => {
    setTodos([]);
  };

  // функция для удаления завершенных задач
  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter((item) => !item.isCompleted)); //фильтрует и удаляет все завершенные задачи
  };

  // для счета выполненных задач
  const completedTodosCount = todos.filter((todo) => todo.isCompleted).length;

  // для изменеия todo (по id)
  const editTodoHandler = (id, changeText) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: changeText,
              date: new Date().toLocaleString(),
            }
          : todo
      )
    );
  };

  function getLocalStorage() {
    const item = localStorage.getItem("todos");
    if (item) {
      return JSON.parse(localStorage.getItem("todos"));
    } else {
      return [];
    }
  }

  //
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <TodoWrapperStyle>
        <Title>Todo App</Title>
        <TodoForm onAddTodo={addTodoHandler} />
        {!!todos.length && (
          <TodoActions
            resetTodosHandler={resetTodosHandler}
            deleteCompletedTodosHandler={deleteCompletedTodosHandler}
            isExisitingCompletedTodo={!!completedTodosCount}
          />
        )}

        <TodoList
          onUpdate={editTodoHandler}
          todos={todos}
          onDeleteTodo={deleteTodoHandler}
          onToggle={toogleTodoHandler}
        />

        {/* если выполнено больше одной задачи то выйдет 'todos' else 'todo' */}
        {!!completedTodosCount > 0 && (
          <h2>
            You have to completed {completedTodosCount}{" "}
            {completedTodosCount > 1 ? "todos" : "todo"}
          </h2>
        )}
      </TodoWrapperStyle>
    </>
  );
};

export default TodoWrapper;

const TodoWrapperStyle = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 40px;
  margin-top: 24px;
`;
