import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGames } from "../managers/GameManager";
import { createEvent } from "../managers/EventManager";

export const EventForm = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  // Decision: Should you provide initial property values?
  const [currentEvent, setCurrentEvent] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    game: 0,
  });

  useEffect(() => {
    getGames().then((gameArr) => {
      setGames(gameArr);
    });
  }, []);

  const changeGameState = (domEvent) => {
    setCurrentEvent({
      ...currentEvent,
      [domEvent.target.name]: domEvent.target.value,
    });
  };

  const formInput = (prop, type) => {
    return (
      <input
        type={type}
        name={prop}
        required
        autoFocus
        className="form-control"
        value={currentEvent.prop}
        onChange={changeGameState}
      />
    );
  };

  return (
    <form className="eventForm">
      <h2 className="eventForm__name text-center text-2xl mb-6">
        Register New Event
      </h2>
      <fieldset>
        <div className="form-group mx-6 my-3">
          <label htmlFor="name" className="text-md">
            Name:{" "}
          </label>
          {formInput("name", "text")}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group mx-6 my-3">
          <label htmlFor="date" className="text-md">
            Date:{" "}
          </label>
          {formInput("date", "date")}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group mx-6 my-3">
          <label htmlFor="time" className="text-md">
            Start Time:{" "}
          </label>
          {formInput("time", "time")}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group mx-6 my-3">
          <label htmlFor="location" className="text-md">
            Location:{" "}
          </label>
          {formInput("location", "text")}
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
          onClick={async (evt) => {
            // Prevent form from being submitted
            evt.preventDefault();
            // Send POST request to your API
            await createEvent(currentEvent);
            // Navigate to /games on success
            navigate("/events/all");
          }}
          className="btn btn--form mr-6"
        >
          Create
        </button>
      </div>
    </form>
  );
};
