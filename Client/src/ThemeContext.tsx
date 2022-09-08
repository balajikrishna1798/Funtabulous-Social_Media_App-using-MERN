import {createGlobalStyle} from 'styled-components'


export const GlobalStyles = createGlobalStyle`

body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', sans-serif;
    transition: all .5s linear;
  }`;

export const lightTheme = {
    body:"fff"
};
export const darkTheme = {
    body:"#121212"
}


