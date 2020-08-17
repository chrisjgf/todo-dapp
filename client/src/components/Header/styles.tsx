import styled from "styled-components";

export const Header = styled.div`
  box-sizing: border-box;
  padding: 1.5rem 3.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Account = styled.div<{ active: boolean }>`
  margin: 0 0 0 0.5rem;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;

  p {
    margin: 0;
    padding: ${({ active }) => active && `0 0.625rem`};
    font-weight: bold;
    color: "#000";
    padding: ${({ active }) => active && `0.625rem 0.875rem`};
  }

  button {
    align-self: center;
    border-radius: 0.625rem;
    padding: 0.625rem 0.875rem;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.65);

    :hover,
    :active,
    :visited {
      cursor: ${({ active }) => (active ? `cursor` : `pointer`)};
      background-color: ${({ active }) =>
        active ? "none" : "rgba(255, 255, 255, 0.75)"};
    }
  }
`;
