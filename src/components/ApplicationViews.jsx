import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Authorized } from "./Authorized";
import { GameList } from "./game/GameList";
import { GameForm } from "./game/GameForm";
import { EventForm } from "./event/EventForm";
import { EventList } from "./event/EventList";

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
          <Route path="events">
            <Route path="all" element={<EventList />} />
            <Route path="new" element={<EventForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
