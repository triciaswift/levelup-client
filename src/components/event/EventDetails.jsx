import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById } from "../managers/EventManager";

export const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState([]);

  useEffect(() => {
    getEventById(eventId).then((eventObj) => {
      setEvent(eventObj);
    });
  }, [eventId]);

  const displayEvent = () => {
    return (
      <div>
        <div className="event--container card--secondary mx-[20rem]">
          <h1 className="event--name text-center font-bold mb-2 text-2xl tracking-wide">
            {event.name}
          </h1>
          <div className="flex flex-col items-center">
            <div className="event--date flex items-center">
              <label className="mr-2 text-lg">Date: </label>
              <div>{event.date}</div>
            </div>
            <div className="event--time flex items-center">
              <label className="mr-2 text-lg">Time: </label>
              <div>{event.time}</div>
            </div>
            <div className="event--location flex items-center">
              <label className="mr-2 text-lg">Location: </label>
              <div>{event.location}</div>
            </div>
            <div className="event--game flex items-center">
              <label className="mr-2 text-lg">Game: </label>
              <div>{event.game?.name}</div>
            </div>
            <div className="event--organizer flex items-center">
              <label className="mr-2 text-lg">Organizer: </label>
              <div>{event.organizer?.full_name}</div>
            </div>
          </div>
          <div className="event--attendees flex items-center mt-6 border rounded-md border-white p-6">
            <label className="mr-2 text-lg font-bold tracking-wider">
              Attending:{" "}
            </label>
            {event.attendees?.map((attendee) => {
              return (
                <div key={attendee.id}>
                  {attendee.full_name ? attendee.full_name : ""}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mx-[20rem] mt-4 text-center">
          <button
            className="btn"
            onClick={() => {
              navigate(`/events/update/${eventId}`);
            }}
          >
            Update Event
          </button>
        </div>
      </div>
    );
  };
  return <>{displayEvent()}</>;
};
