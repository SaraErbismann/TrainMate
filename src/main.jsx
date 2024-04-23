import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Home } from './components/Home'; // Adjust the path accordingly
import { Trainings } from './components/Trainings'; // Adjust the path accordingly
import { Customers } from './components/Customers';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "trainigs",
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
  </React.StrictMode>,
)
