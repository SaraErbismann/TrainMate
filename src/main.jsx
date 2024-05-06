import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './components/Home'; 
import Trainings from './components/Trainings'; 
import Customers from './components/Customers';
import Error from './components/Error.jsx';
import Calendar from './components/Calendar.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// create BrowseRouter usint the createBrowseRouter function
const router = createBrowserRouter([
  { //root route to render the App component
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true //index route
      },
      {
        path: "trainings",
        element: <Trainings />,
      },
      {
        path: "customers",
        element: <Customers />
      },
      {
        path: 'calendar',
        element: <Calendar />
      }
    ]
  }
]);

const theme = createTheme({
  palette: {
    primary: {
      main: '#304f6d', // Your primary color
    },
    secondary: {
      main: '#899481', // Your first secondary color
      light: '#e07d54', // Your second secondary color
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
