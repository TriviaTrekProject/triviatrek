import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useState} from "react";
import GameRoute from "./components/GameRoute.tsx";
import GuestRoom from "./components/GuestRoom.tsx";

function App() {

    const [username, setUsername] = useState<string | null>(null);

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate to="/game/" replace />} />
              <Route path="/guest/:id?" element={<GuestRoom setUsername={setUsername}/>} />
              <Route path="/game/:id?" element={<GameRoute username={username}/>} />

          </Routes>
      </BrowserRouter>
  )
}

export default App
