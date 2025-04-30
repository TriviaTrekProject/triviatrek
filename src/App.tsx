import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import GuestLogin from "./components/GuestLogin.tsx";
import Login from "./components/Login.tsx";
import ChatRoom from "./components/ChatRoom.tsx";
import {useState} from "react";

function App() {

    const [username, setUsername] = useState<string | null>(null);
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/guest" element={<GuestLogin setUsername={setUsername} />} />
              <Route path="/game/:id" element={username ? <ChatRoom username={username}/> : <GuestLogin setUsername={setUsername} />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
