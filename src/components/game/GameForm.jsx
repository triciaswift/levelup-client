import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createGame, getGameTypes } from "../managers/GameManager";

export const GameForm = () => {
  const navigate = useNavigate();
  const [gameTypes, setGameTypes] = useState([]);

  // Decision: Should you provide initial property values?
  const [currentGame, setCurrentGame] = useState({
    name: "",
    manufacturer: "",
    number_of_players: 0,
  });

  useEffect(() => {
    getGameTypes().then((typeArr) => {
      setGameTypes(typeArr);
    });
  }, []);

  const changeGameState = (domEvent) => {
    setCurrentGame({
      ...currentGame,
      [domEvent.target.name]: domEvent.target.value,
    });
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__name text-center text-2xl mb-6">
        Register New Game
      </h2>
      <fieldset>
        <div className="form-group mx-6 my-3">
          <label htmlFor="name" className="text-md">
            Title:{" "}
          </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="form-control"
            value={currentGame.name}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      {/* TODO: create the rest of the input fields */}
      <fieldset>
        <div className="form-group mx-6 my-3">
          <label htmlFor="manufacturer" className="text-md">
            Created By:{" "}
          </label>
          <input
            type="text"
            name="manufacturer"
            required
            autoFocus
            className="form-control"
            value={currentGame.manufacturer}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group mx-6 my-3">
          <label htmlFor="number_of_players" className="text-md">
            Max Number of Players:{" "}
          </label>
          <input
            type="number"
            name="number_of_players"
            required
            autoFocus
            className="form-control"
            value={currentGame.number_of_players}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group mx-6 my-3">
          <label htmlFor="type" className="text-md">
            Type:{" "}
          </label>
          <select
            name="type"
            className="form-control"
            onChange={changeGameState}
          >
            <option value={0}>- Select a type -</option>
            {gameTypes.map((t) => (
              <option key={`type-${t.id}`} value={t.id}>
                {t.label}
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
            await createGame(currentGame);
            // Navigate to /games on success
            navigate("/");
          }}
          className="btn mr-6"
        >
          Create
        </button>
      </div>
    </form>
  );
};
