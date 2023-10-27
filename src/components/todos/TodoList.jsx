import React from "react";
import styled from "styled-components";
import Todo from "./Todo";

const TodoList = ({ todos, onDeleteTodo, onToggle, onUpdate,  }) => {
  return (
    <TodoListContainer>
      {todos.map((todo) => (
        <Todo
      
          todo={todo} // передаем информацию о задаче
          key={todo.id} // уникальный ключ для каждой задачи
          onDeleteTodo={onDeleteTodo} // передаем функцию onDeleteTodo для удаления задачи
          onUpdate={onUpdate} //передаем функцию onUpdate для измения задачи
          onToggle={onToggle} // передаем функцию onToggle для изменеия статуса задачи
        />
      ))}
    </TodoListContainer>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
  padding: 10px;
`;
