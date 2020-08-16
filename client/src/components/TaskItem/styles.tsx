import styled from "styled-components";

export const TaskItem = styled.button`
  background: #eee;
  margin: 1rem;
  
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export const Title = styled.p<{ completed: boolean }>`
  text-decoration: ${({ completed }) => completed && `line-through`};
`;