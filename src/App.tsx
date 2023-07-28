import { BrowserRouter } from "react-router-dom"
import AppRouter from "./routes/AppRouter"


function App() {

  return (
    <BrowserRouter>
      <div className="app">
        <AppRouter />
        
      </div>
    </BrowserRouter>

  )
}

export default App
