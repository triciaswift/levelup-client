import { useEffect, useState } from "react";

export const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    let url = "http://localhost:8000/games";
    fetch(url, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("levelup_token")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((gameArr) => {
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
      <h1 className="text-center text-4xl mb-10">Game List</h1>
      <div className="games--container flex flex-wrap justify-around mx-3">
        {displayGames()}
      </div>
    </article>
  );
};
