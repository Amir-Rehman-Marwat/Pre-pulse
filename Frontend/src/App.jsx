import React from 'react'
import "./index.scss"
import { RouterProvider } from 'react-router'
import { router } from './routes'
export default function App() {
  return (
    <RouterProvider router={router} /> 
  )
}
