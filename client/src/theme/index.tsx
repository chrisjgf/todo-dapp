import React from "react";
import { createGlobalStyle, DefaultTheme, ThemeProvider } from "styled-components";

export default ({ children }: any) =>
  <ThemeProvider theme={theme}> {children} </ThemeProvider>

const theme: DefaultTheme = {
  maxWidth: "640px",

  colors: {
    white: "#fff",
    black: "#000",
  }
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');
  html { font-family: 'Inter', sans-serif; }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  }
  
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