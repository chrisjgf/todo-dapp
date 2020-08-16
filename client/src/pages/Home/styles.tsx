import styled from "styled-components";
import { mediaQueries } from "../../theme";

export const Home = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  padding-bottom: 5rem;
`;

export const TaskWrapper = styled.div`
  transition: all 0.5s ease-in;
  width: 95%;

  ${mediaQueries("lg")`
    width: 66%;
  `};

  ${mediaQueries("xl")`
    width: 50%;
  `};
`;
