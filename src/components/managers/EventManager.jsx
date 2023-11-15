export const getEvents = () => {
  return fetch("http://localhost:8000/events", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("levelup_token")).token
      }`,
    },
  }).then((res) => res.json());
};
