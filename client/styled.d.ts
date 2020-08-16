import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      defaultBackground: string;
      white: string;
      black: string;
    };
  }
}
