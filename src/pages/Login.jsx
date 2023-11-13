/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [username, setUsername] = useState("Carrie1945");
  const [password, setPassword] = useState("me");
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo.token) {
          localStorage.setItem("levelup_token", JSON.stringify(authInfo));
          navigate("/");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <main className="container--login bg-levelup-game max-w-[900px] mt-32">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <div className="form--container">
        <section>
          <form className="form--login" onSubmit={handleLogin}>
            <h1 className="font-nunito font-black text-4xl mt-7 mb-3">
              Level Up
            </h1>
            <h2 className="font-bold text-xl mb-10">Please sign in</h2>
            <fieldset className="mb-4">
              <label htmlFor="inputUsername" className="font-semibold">
                {" "}
                Username{" "}
              </label>
              <input
                type="text"
                id="inputUsername"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
                className="form-control"
                placeholder="Username"
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="inputPassword" className="font-semibold">
                {" "}
                Password{" "}
              </label>
              <input
                type="password"
                id="inputPassword"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                className="form-control"
                placeholder="Password"
              />
            </fieldset>
            <fieldset>
              <button
                type="submit"
                className="button p-3 rounded-md bg-blue-800 text-blue-100"
              >
                Sign in
              </button>
            </fieldset>
          </form>
        </section>
        <div className="loginLinks">
          <section className="link--register">
            <Link
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              to="/register"
            >
              Not a member yet?
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
};
