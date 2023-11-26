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
      main: "#fcfcfc",
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
    border: {
      card: "#d5e0d5"
    },
    neutral: {
      main: '#00000099'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fcfcfc"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 1px 0.5px #d5e0d5",
        }
      }
    }
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    body1: {
      fontSize: '1rem',
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
      fontWeight: 600
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
      fontFamily: '\'Plus Jakarta Sans\', sans-serif',
      fontWeight: 500,
      fontSize: '1.5rem',
      '@media (max-width:800px)': {
        fontSize: '1.3rem',
      },
      '@media (max-width:500px)': {
        fontSize: '1.15rem',
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
