import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGameById, getGameTypes, updateGame } from "../managers/GameManager";

export const UpdateGame = () => {
  const [currentGame, setCurrentGame] = useState({});
  const [gameTypes, setGameTypes] = useState([]);

  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getGameTypes().then((gameArr) => {
      setGameTypes(gameArr);
    });
  }, []);

  useEffect(() => {
    getGameById(gameId).then((gameObj) => {
      setCurrentGame(gameObj);
    });
  }, [gameId]);

  const changeGameState = (domEvent) => {
    setCurrentGame({
      ...currentGame,
      [domEvent.target.name]: domEvent.target.value,
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const updatedGame = {
      id: currentGame.id,
      name: currentGame.name,
      manufacturer: currentGame.manufacturer,
      number_of_players: currentGame.number_of_players,
      type: currentGame.type.id ? currentGame.type.id : currentGame.type,
    };

    await updateGame(updatedGame);

    navigate(`/games/details/${gameId}`);
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__name text-center text-2xl mb-6">Update Game</h2>
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
            value={currentGame.type?.id}
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
          onClick={handleSave}
          className="btn btn--form mr-6"
        >
          Save
        </button>
      </div>
    </form>
  );
};
