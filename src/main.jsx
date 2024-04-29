import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './components/Home'; // Adjust the path accordingly
import Trainings from './components/Trainings'; // Adjust the path accordingly
import Customers from './components/Customers';
import Error from './components/Error.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider router={router} />

  </React.StrictMode>
)
