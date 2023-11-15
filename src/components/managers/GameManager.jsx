export const getGames = () => {
  return fetch("http://localhost:8000/games", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("levelup_token")).token
      }`,
    },
  }).then((res) => res.json());
};

export const createGame = (gameObj) => {
  return fetch("http://localhost:8000/games", {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("levelup_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameObj),
  });
};

export const getGameTypes = () => {
  return fetch("http://localhost:8000/gametypes", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("levelup_token")).token
      }`,
    },
  }).then((res) => res.json());
};
