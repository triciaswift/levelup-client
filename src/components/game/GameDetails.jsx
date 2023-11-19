import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGameById } from "../managers/GameManager";

export const GameDetails = () => {
  const [game, setGame] = useState({});

  const navigate = useNavigate();
  const { gameId } = useParams();

  useEffect(() => {
    getGameById(gameId).then((gameObj) => {
      setGame(gameObj);
    });
  }, [gameId]);

  const displayGame = () => {
    return (
      <div>
        <div
          className="game--container card--secondary mx-[20rem]"
          key={game.id}
          onClick={() => {
            navigate({ pathname: `/games/update/${gameId}` });
          }}
        >
          <h1 className="game--name text-center font-bold mb-2 text-2xl tracking-wide">
            {game.name}
          </h1>
          <div className="game--manufacturer">
            Created By: {game.manufacturer}
          </div>
          <div className="game--players">
            Number of players: {game.number_of_players}
          </div>
          <div className="game--type">Type: {game.type?.label}</div>
        </div>
        <div className="mx-[20rem] mt-4 text-center">
          <button
            className="btn"
            onClick={() => {
              navigate(`/games/update/${gameId}`);
            }}
          >
            Update Game
          </button>
        </div>
      </div>
    );
  };

  return <div>{displayGame()}</div>;
};
