import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useState} from "react";
import JoinRoom from "./components/JoinRoom.tsx";
import Login from "./components/Login.tsx";
import BaseLayout from "./components/BaseLayout.tsx";

function App() {

    const [username, setUsername] = useState<string | null>(null);

  return (
      <BrowserRouter>
          <Routes>
              <Route element={<BaseLayout />}>
              <Route path="/" element={<Navigate to="/game/" replace />} />
              <Route path="/guest/:id?" element={<Login setUsername={setUsername}/>} />
              <Route path="/game/:id?" element={<JoinRoom username={username}/>} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
