import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import Home from './pages/Home.jsx'
import Recherche from './pages/Recherche.jsx'
import Depot from './pages/Depot.jsx'
import Juridictions from './pages/Juridictions.jsx'
import Actualites from './pages/Actualites.jsx'
import Telechargements from './pages/Telechargements.jsx'
import Contact from './pages/Contact.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'recherche', element: <Recherche /> },
      { path: 'juridictions', element: <Juridictions /> },
      { path: 'actualites', element: <Actualites /> },
      { path: 'telechargements', element: <Telechargements /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
