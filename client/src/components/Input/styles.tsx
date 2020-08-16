import styled from "styled-components";

export const Input = styled.div<{ active: boolean }>`
  background: #fff;
  margin: 1rem;
  height: 5rem;
  box-sizing: border-box;
  border-radius: 1rem;
  padding: 0.75rem 2rem;
  width: 50vw;
  display: flex;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.05);

  input,
  div {
    opacity: ${({ active }) => (active ? 1 : 0.33)};
  }
`;

export const TextInput = styled.input`
  flex: 1;
  font-weight: bold;
  font-size: 1.5rem;
  color: "#000";
`;

export const IconWrapper = styled.div`
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: flex-end;

  img {
    height: 50%;
  }
`;
