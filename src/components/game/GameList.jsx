import { useEffect, useState } from "react";
import { getGames } from "../managers/GameManager";
import { useNavigate } from "react-router-dom";

export const GameList = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then((gameArr) => {
      setGames(gameArr);
    });
  }, []);

  const displayGames = () => {
    if (games && games.length) {
      return games.map((game) => (
        <div
          className="game--container card"
          key={game.id}
          onClick={() => {
            navigate({ pathname: `/games/details/${game.id}` });
          }}
        >
          <div className="game--name text-center font-bold text-lg mb-2">
            {game.name}
          </div>
        </div>
      ));
    }
  };

  return (
    <article className="games">
      <h1 className="flex flex-col justify-center items-center">
        <div className="text-4xl mb-4">Game List</div>
        <div className="mb-10">
          <button
            className="btn"
            onClick={() => {
              navigate({ pathname: "/games/new" });
            }}
          >
            Register New Game
          </button>
        </div>
      </h1>
      <div className="games--container flex flex-wrap justify-around gap-x-px gap-y-8">
        {displayGames()}
      </div>
    </article>
  );
};
