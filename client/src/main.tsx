import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from './register.tsx';
import Login from './login.tsx';
import ProtectedComponent from './procomp.tsx';
import ProtectedRoute from './protected.tsx';
import { UserProvider } from './userContext.tsx';
import Profile from './profile.tsx';
import Demo from './demo.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: `/:userId/about`,
    element: <Login />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/demo',
    element: <Demo />,
  },

  {
    path: '/protected',
    element: (
      <ProtectedRoute>
        <ProtectedComponent />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
