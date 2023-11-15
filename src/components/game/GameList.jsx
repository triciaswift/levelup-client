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
        <div className="game--container card" key={game.id}>
          <div className="game--name text-center font-bold text-lg mb-2">
            {game.name}
          </div>
          <div className="game--manufacturer">
            Created By: {game.manufacturer}
          </div>
          <div className="game--players">
            Number of players: {game.number_of_players}
          </div>
          <div className="game--type">Type: {game.type.label}</div>
        </div>
      ));
    }
  };

  return (
    <article className="games">
      <h1 className="text-center text-4xl mb-10">
        <button
          className="btn btn-2 btn-sep icon-create"
          onClick={() => {
            navigate({ pathname: "/games/new" });
          }}
        >
          Register New Game
        </button>
        Game List
      </h1>
      <div className="games--container flex flex-wrap justify-around mx-3">
        {displayGames()}
      </div>
    </article>
  );
};
