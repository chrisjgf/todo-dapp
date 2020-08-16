import React from "react";
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from "styled-components";

export default ({ children }: any) => (
  <ThemeProvider theme={theme}> {children} </ThemeProvider>
);

export const breakpoints = {
  sm: 20,
  md: 30,
  lg: 45,
  xl: 60,
};

export const mediaQueries = (key: keyof typeof breakpoints) => {
  return (style: TemplateStringsArray | String) =>
    `@media (min-width: ${breakpoints[key]}em) { ${style} }`;
};

const theme: DefaultTheme = {
  colors: {
    defaultBackground: "#EEF5EE",
    white: "#fff",
    black: "#000",
  },
};

export const GlobalStyle = createGlobalStyle`
  html { font-family: "Helvetica", "Arial", sans-serif; }
  
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;    
  }

  body > div {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  html {
    font-size: 16px;
    font-variant: none;
    color: ${({ theme }) => theme.colors.black};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background: ${({ theme }) => theme.colors.defaultBackground};
  }

  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }

  input,
  select,
  textarea,
  button {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15; 
    margin: 0; 
    border: 0;
    background: transparent;
  }

  ul {
    margin: 0;
    padding: 0;
  }
`;
