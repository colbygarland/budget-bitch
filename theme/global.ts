import { createGlobalStyle } from 'styled-components';
import { typography } from './typography';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${typography.family}!important;
  }
`;
