import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './components/protectedRoutes'
import FeedPage from './pages/feedPage'
import LoginPage from './pages/loginPage'
import SignUpPage from './pages/signUpPage'
import ProfilePage from './pages/ProfilePage'
import Home from './pages'
import WeatherPage from './pages/WeatherPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        <Route path="/feed" element={<ProtectedRoute><FeedPage /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App