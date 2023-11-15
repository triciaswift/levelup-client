export const getEvents = () => {
  return fetch("http://localhost:8000/events", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("levelup_token")).token
      }`,
    },
  }).then((res) => res.json());
};

export const createEvent = (EventObj) => {
  return fetch("http://localhost:8000/events", {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("levelup_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(EventObj),
  });
};
