import { useEffect, useState } from "react";
import { getEvents } from "../managers/EventManager";
import { useNavigate } from "react-router-dom";

export const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((gameArr) => {
      setEvents(gameArr);
    });
  }, []);

  const displayEvents = () => {
    if (events && events.length) {
      return events.map((event) => (
        <div
          className="event--container card"
          key={event.id}
          onClick={() => {
            navigate({ pathname: `/events/details/${event.id}` });
          }}
        >
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
    <article className="events">
      <h1 className="flex flex-col justify-center items-center">
        <div className="text-4xl mb-4">Event List</div>
        <div className="mb-10">
          <button
            className="btn"
            onClick={() => {
              navigate({ pathname: "/events/new" });
            }}
          >
            Register New Event
          </button>
        </div>
      </h1>
      <div className="events--container flex flex-wrap justify-around gap-x-px gap-y-8">
        {displayEvents()}
      </div>
    </article>
  );
};
