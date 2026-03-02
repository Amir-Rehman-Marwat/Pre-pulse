import React from 'react'
import "./index.scss"
import { RouterProvider } from 'react-router'
import { router } from './routes'
 function App() {
  return (
    
    <RouterProvider router={router} /> 
  )
}
 export default App