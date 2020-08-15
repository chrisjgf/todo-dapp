import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    maxWidth: string;

    colors: {
      white: string;
      black: string;
    };
  }
}