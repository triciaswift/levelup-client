import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Authorized } from "./Authorized";
import { GameList } from "./game/GameList";
import { GameForm } from "./game/GameForm";
import { EventForm } from "./event/EventForm";
import { EventList } from "./event/EventList";
import { UpdateGame } from "./game/UpdateGame";
import { UpdateEvent } from "./event/UpdateEvent";
import { EventDetails } from "./event/EventDetails";
import { GameDetails } from "./game/GameDetails";

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
            <Route path="details/:gameId" element={<GameDetails />} />
            <Route path="update/:gameId" element={<UpdateGame />} />
          </Route>
          <Route path="events">
            <Route path="all" element={<EventList />} />
            <Route path="details/:eventId" element={<EventDetails />} />
            <Route path="new" element={<EventForm />} />
            <Route path="update/:eventId" element={<UpdateEvent />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
