import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from "react";
import {User} from "./model/User.ts";
import GuestRoom from "./components/GuestRoom.tsx";
import Chat from "./components/Chat.tsx";

function App() {

    const [user, setUser] = useState<User | null>(null);

  return (
      <BrowserRouter>
          <Routes>
              {/*<Route path="/" element={<Navigate to="/login" replace />} />*/}
              <Route path="/" element={user ? <Chat user={user} /> : <GuestRoom setUser={setUser} />} />
              <Route path="/guest" element={<GuestRoom setUser={setUser} />} />
              <Route path="/game/:id" element={user ? <Chat user={user} /> : <GuestRoom setUser={setUser} />} />

          </Routes>
      </BrowserRouter>
  )
}

export default App
