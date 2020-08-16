import styled from "styled-components";

export const TaskItem = styled.button`
  background: rgba(255, 255, 255, 0.65);
  margin: 1rem;
  border-radius: 0.5rem;

  :hover {
    background: rgba(255, 255, 255, 0.45);
    cursor: pointer;

    p {
      text-decoration: line-through;
      opacity: 1;
    }
  }
`;

export const Title = styled.p<{ completed: boolean }>`
  text-decoration: ${({ completed }) => completed && `line-through`};
  opacity: 0.65;
  color: #000;
  font-weight: bold;
  padding: 0 0.5rem;
`;
