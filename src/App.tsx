import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import QuizRoom from "./components/QuizRoom.tsx";
import GuestLogin from "./components/GuestLogin.tsx";
import Login from "./components/Login.tsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/guest" element={<GuestLogin />} />
              <Route path="/game/:id" element={<QuizRoom />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
