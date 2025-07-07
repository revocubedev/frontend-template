import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

const router = createBrowserRouter([
  { index: true, element: <h1>Hello World</h1> }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
