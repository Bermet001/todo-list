import React from "react";
import Button from "./UI/Button";
import styled from "styled-components";
import { RiDeleteBack2Line, RiRefreshLine } from "react-icons/ri";

const TodoActions = ({
  resetTodosHandler, // для очисти задач
  deleteCompletedTodosHandler, //для удаления завершенных задач
  isExisitingCompletedTodo, // для определения завершенных задач
}) => {
  return (
    <ButtonsContainer>
      <Button onClick={resetTodosHandler}>
        <RiRefreshLine />
      </Button>
      <Button
        onClick={deleteCompletedTodosHandler}
        disabled={!isExisitingCompletedTodo} //для того что бы отключить кнопки, если нет завершенных задач
      >
        <RiDeleteBack2Line />
      </Button>
    </ButtonsContainer>
  );
};

export default TodoActions;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
`;
