import { useEffect, useState } from "react";
import { getGames } from "../managers/GameManager";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById, updateEvent } from "../managers/EventManager";

export const UpdateEvent = () => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({});

  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getGames().then((gameArr) => {
      setGames(gameArr);
    });
  }, []);

  useEffect(() => {
    getEventById(eventId).then((eventObj) => {
      setCurrentEvent(eventObj);
    });
  }, [eventId]);

  const changeGameState = (domEvent) => {
    setCurrentEvent({
      ...currentEvent,
      [domEvent.target.name]: domEvent.target.value,
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const updatedEvent = {
      id: currentEvent.id,
      name: currentEvent.name,
      date: currentEvent.date,
      time: currentEvent.time,
      location: currentEvent.location,
      game: currentEvent.game.id ? currentEvent.game.id : currentEvent.game,
    };

    await updateEvent(updatedEvent);

    navigate(`/events/details/${eventId}`);
  };

  function convertTo24HourFormat(timeString) {
    if (!timeString) {
      return ""; // Add a default value or handle the case where time is undefined
    }
    const [time, period] = timeString.split(" ");
    const [hour, minute] = time.split(":");
    let formattedHour = parseInt(hour);

    if (period === "PM") {
      formattedHour += 12;
    }

    return `${formattedHour}:${minute}`;
  }

  return (
    <form className="eventForm">
      <h2 className="eventForm__name text-center text-2xl mb-6">
        Update Event
      </h2>
      <fieldset>
        <div className="form-group mx-6 my-3">
          <label htmlFor="name" className="text-md">
            Name:{" "}
          </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="form-control"
            value={currentEvent.name}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group mx-6 my-3">
          <label htmlFor="date" className="text-md">
            Date:{" "}
          </label>
          <input
            type="date"
            name="date"
            required
            autoFocus
            className="form-control"
            value={currentEvent.date}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group mx-6 my-3">
          <label htmlFor="time" className="text-md">
            Start Time:{" "}
          </label>
          <input
            type="time"
            name="time"
            required
            autoFocus
            className="form-control"
            value={convertTo24HourFormat(currentEvent.time)}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group mx-6 my-3">
          <label htmlFor="location" className="text-md">
            Location:{" "}
          </label>
          <input
            type="text"
            name="location"
            required
            autoFocus
            className="form-control"
            value={currentEvent.location}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group mx-6 my-3">
          <label htmlFor="game" className="text-md">
            Game:{" "}
          </label>
          <select
            name="game"
            className="form-control"
            value={currentEvent.game?.id}
            onChange={changeGameState}
          >
            <option value={0}>- Select a game -</option>
            {games.map((g) => (
              <option key={`game-${g.id}`} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <div className="flex justify-end mt-3 w-[94%]">
        <button
          type="submit"
          onClick={handleSave}
          className="btn btn--form mr-6"
        >
          Save
        </button>
      </div>
    </form>
  );
};
