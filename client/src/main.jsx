import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme({
  palette: {
    primary: {
      main: "#0abd61",
    },
    secondary: {
      main: "#ffccff",
    },
    text: {
      primary: "#000000",
    },
    background: {
      paper: "#fffeff",
    },
    accent: {
      primary: "#216b38",
    },
    neutral: {
      main: '#00000099'
    }
  },
  components: {
    MuiButton: {
      
      styleOverrides: {
        root: {
          color: "#fcfcfc",
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
          '&:active': {
            boxShadow: 'none',
          },
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {

        // root: {
        //   // '& fieldset': {
        //   //   borderColor: '#b8b4b48f !important',
        //   //    borderWidth: 2,
        //   // },
        //   // '&:focus-within fieldset': {
        //   //   borderColor: '#009B4D !important',
        //   // },

        // },
      },
    },
  },
  typography: {
    fontFamily: '\'Poppins\', sans-serif',
    body1: {
      fontSize: '0.92rem',
      fontWeight: 400,
      '@media (max-width:800px)': {
        fontSize: '0.95rem',
      },
      '@media (max-width:500px)': {
        fontSize: '0.9rem',
      },
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57
    },
    button: {
      fontWeight: 500,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.57
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase'
    },
    h1: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 500,
      fontSize: '3.5rem',
      lineHeight: 1.2
    },
    h2: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 500,
      fontSize: '3rem',
      lineHeight: 1.2
    },
    h3: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 500,
      fontSize: '2.25rem',
      lineHeight: 1.2
    },
    h4: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 500,
      fontSize: '2rem',
      '@media (max-width:800px)': {
        fontSize: '1.5rem',
      },
      '@media (max-width:500px)': {
        fontSize: '1.3rem',
      },
      lineHeight: 1.2
    },
    h5: {
      fontFamily: '\'Poppins\', sans-serif',
      fontSize: '1.2rem',
      '@media (max-width:800px)': {
        fontSize: '1.1rem',
      },
      '@media (max-width:500px)': {
        fontSize: '1.05rem',
      },
      lineHeight: 1.2
    },
    h6: {
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 500,
      fontSize: '1.2rem',
      lineHeight: 1.2,
      '@media (max-width:800px)': {
        fontSize: '1rem',
      },
      '@media (max-width:500px)': {
        fontSize: '0.86rem',
      },
    }
  }
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
