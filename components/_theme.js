// A custom styling theme that (attempts to) use the Material UI (MUI) theme structure so
//  that I can pass it to both MUI and the Styled Component theme wrappers.
//  The MUI theme API is defined here: https://mui.com/customization/theming/
const muiCompatibleTheme = {
    palette: {        
        primary: {
            main: '#06a5eb',
            //contrastText: '#fff'
        },
        text: {
            primary: 'rgba(0,0,0,0.87)', // normal
            secondary: 'rgba(0,0,0,0.54)', // subdued
            disabled: 'rgba(0,0,0,0.3)'
        }
    }
};

export default muiCompatibleTheme;