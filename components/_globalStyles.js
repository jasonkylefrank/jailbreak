import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        ${'' /* font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; */}
        font-family: Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    p {
        line-height: 1.6;
    }

    a {
        color: inherit;
        text-decoration: none;
        /* :hover {
        text-decoration: underline;
        } */
    }

    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyle;