import React, { useState } from "react";
import styled from "styled-components";
import { RiTodoFill, RiDeleteBin2Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import Modal from "./Modal";
const Todo = ({ todo, onDeleteTodo, onToggle, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [changeText, setchangeText] = useState(todo.text);

  // эта функция для того что бы открывать и закрывать модалку delete (переводит значение isOpen)
  const deleteTodo = () => {
    setIsOpen((prev) => !prev);
  };

  // эта функция для того что бы открывать и закрывать модалку Edit
  const editTodo = () => {
    setEdit((prev) => !prev);
  };
  // с помощю этой функции мы контролируем значение инпута в модальном окне Edit
  const changeTextValue = (e) => {
    setchangeText(e.target.value);
  };

  // при нажатии на кнопу спрабатывает эта функция
  const changeTextBtn = () => {
    onUpdate(todo.id, changeText); //для того что бы отправлять новый id и todo
    setEdit((prev) => !prev); //эта функция для того что бы закрывать измененную задачу
  };

  return (
    <TodoContainer className={todo?.isCompleted ? "completedTodo" : ""}>
      <TodoIcon onClick={changeTextBtn} className="todoIcon" />
      <TodoText>{todo?.text}</TodoText>
      <Date>{todo.date}</Date>
      <DeleteIcon onClick={deleteTodo} className="deleteIcon" />
      {isOpen && (
        <Modal onClose={deleteTodo}>
          <h2>Are you sure?</h2>
          <Button onClick={() => onDeleteTodo(todo.id)}>yes</Button>
        </Modal>
      )}

      {edit && (
        <Modal onClose={editTodo}>
          <h3>Enter your update todo ...</h3>
          <input type="text" value={changeText} onChange={changeTextValue} />
          <Button onClick={changeTextBtn}>add</Button>
        </Modal>
      )}

      <CheckIcon onClick={() => onToggle(todo.id)} className="checkIcon" />
    </TodoContainer>
  );
};
export default Todo;
const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin: 15px 0;
  font-size: 1.5rem;
  border-radius: 5px;
  border: 2px solid #555;
  color: #112d49;
  background-color: #fbfef9;
  &.completedTodo {
    background-color: unset;
    border-color: gray;
    color: gray;
  }
  &.completedTodo .todoIcon,
  &.completedTodo .checkIcon,
  &.completedTodo .deleteIcon {
    color: gray;
  }
`;
const TodoText = styled.div`
  width: 100%;
  text-align: left;
`;
const TodoIcon = styled(RiTodoFill)`
  font-size: 1.8rem;
  margin-right: 10px;
  color: teal;
`;
const DeleteIcon = styled(RiDeleteBin2Line)`
  cursor: pointer;
  color: lightgrey;
  padding: 0 7px;
  font-size: 40px;
  transition: transform 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.3);
    color: red;
  }
`;
const CheckIcon = styled(FaCheck)`
  cursor: pointer;
  color: lightgrey;
  padding: 0 7px;
  font-size: 40px;
  transition: transform 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.3);
    color: green;
  }
`;
const Date = styled.p`
  font-size: small;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: #03c603;
`;
