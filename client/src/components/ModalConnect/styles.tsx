import styled from "styled-components";

export const ModalConnect = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

export const Button = styled.button`
  margin-bottom: 1rem;
  width: 100%;
  padding: 1rem;
  height: auto;
  margin: 0.5rem;
  border-radius: 1rem;
  font-weight: bold;

  img {
    height: 2rem;
    width: 2rem;
  }

  p {
    margin: 0.5rem 0 0;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    transition: background 0.1s ease-in;
  }
`;
