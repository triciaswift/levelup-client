/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/register`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo && authInfo.token) {
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
          <form className="form--login" onSubmit={handleRegister}>
            <h1 className="font-nunito font-black text-4xl mt-7 mb-3">
              Level Up
            </h1>
            <h2 className="font-bold text-xl mb-10">Register new account</h2>
            <fieldset className="mb-4">
              <label htmlFor="firstName" className="font-semibold">
                {" "}
                First name{" "}
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(evt) => setFirstName(evt.target.value)}
                className="form-control"
                placeholder=""
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="lastName" className="font-semibold">
                {" "}
                Last name{" "}
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(evt) => setLastName(evt.target.value)}
                className="form-control"
                placeholder=""
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="inputEmail" className="font-semibold">
                {" "}
                Email address{" "}
              </label>
              <input
                type="email"
                id="inputEmail"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </fieldset>
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
                required
              />
            </fieldset>
            <fieldset>
              <button
                type="submit"
                className="button p-3 rounded-md bg-blue-800 text-blue-100"
              >
                Register
              </button>
            </fieldset>
          </form>
        </section>
        <div className="loginLinks">
          <section className="link--register">
            <Link
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              to="/login"
            >
              Already have an account?
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
};
