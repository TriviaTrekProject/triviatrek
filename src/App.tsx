import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import GuestLogin from "./components/GuestLogin.tsx";
import Login from "./components/Login.tsx";
import ChatRoom from "./components/ChatRoom.tsx";
import {useState} from "react";
import {User} from "./model/User.ts";

function App() {

    const [user, setUser] = useState<User | null>(null);

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/guest" element={<GuestLogin setUser={setUser} />} />
              <Route path="/game/:id" element={user ? <ChatRoom user={user}/> : <GuestLogin setUser={setUser} />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
