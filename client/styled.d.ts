import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    maxWidth: string;

    colors: {
      defaultBackground: string;
      white: string;
      black: string;
    };
  }
}