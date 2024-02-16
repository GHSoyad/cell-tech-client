import { RouterProvider } from "react-router-dom"
import MainRoute from "./routes/MainRoute"

function App() {

  return (
    <RouterProvider router={MainRoute} />
  )
}

export default App
