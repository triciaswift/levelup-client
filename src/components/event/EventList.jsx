import { useEffect, useState } from "react";
import { getEvents } from "../managers/EventManager";

export const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((gameArr) => {
      setEvents(gameArr);
    });
  }, []);

  const displayEvents = () => {
    if (events && events.length) {
      return events.map((event) => (
        <div className="event--container card" key={event.id}>
          <div className="event--name text-center font-bold text-lg mb-2">
            {event.name}
          </div>
          <div className="event--date flex items-center">
            <label className="mr-2 text-lg">Date: </label>
            <div>{event.date}</div>
          </div>
          <div className="event--time flex items-center">
            <label className="mr-2 text-lg">Time: </label>
            <div>{event.time}</div>
          </div>
          <div className="event--game flex items-center">
            <label className="mr-2 text-lg">Game: </label>
            <div>{event.game.name}</div>
          </div>
          <div className="event--organizer flex items-center">
            <label className="mr-2 text-lg">Organizer: </label>
            <div>{event.organizer.full_name}</div>
          </div>
        </div>
      ));
    }
  };

  return (
    <article className="games">
      <h1 className="text-center text-4xl mb-10">Event List</h1>
      <div className="games--container flex flex-wrap justify-around mx-3">
        {displayEvents()}
      </div>
    </article>
  );
};
