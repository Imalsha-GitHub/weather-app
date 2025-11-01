import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DetailPage from "./pages/DetailPage"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          
        }
        />
        <Route 
          path="/weather/:cityId" 
          element={
            <ProtectedRoute>
              <DetailPage />
            </ProtectedRoute>
          }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
