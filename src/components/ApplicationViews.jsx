import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Authorized } from "./Authorized";
import { GameList } from "./game/GameList";
import { EventList } from "./event/EventList";
import { GameForm } from "./game/GameForm";

export const ApplicationViews = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<GameList />} />
          <Route path="games">
            <Route path="new" element={<GameForm />} />
          </Route>
          <Route path="events" element={<EventList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
