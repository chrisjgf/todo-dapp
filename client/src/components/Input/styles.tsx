import styled from "styled-components";
import { mediaQueries } from "../../theme";

export const Input = styled.div<{ active: boolean }>`
  background: #fff;
  margin: 1rem;
  height: 5rem;
  box-sizing: border-box;
  padding: 0.75rem 2rem;
  border-radius: 1rem;
  display: flex;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.05);
  overflow: hidden;
  width: 95%;

  ${mediaQueries("lg")`
    width: 66%;
  `};

  ${mediaQueries("xl")`
    width: 50%;
  `};

  input,
  div {
    opacity: ${({ active }) => (active ? 1 : 0.33)};
  }
`;

export const TextInput = styled.input`
  font-weight: bold;
  color: #000;
  width: 100%;
  font-size: 1.5rem;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    opacity: 0;

    ${mediaQueries("md")`
      opacity: 1;
    `};
  }
`;
