import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <ul className="navbar py-3 mb-10">
      <li className="navbar__item">
        <NavLink className="hover:text-purple-700" to={"/"}>
          Games
        </NavLink>
      </li>
      <li className="navbar__item">
        <NavLink className="hover:text-purple-700" to={"/events/all"}>
          Events
        </NavLink>
      </li>
      <li className="navbar__item">
        <NavLink className="hover:text-purple-700" to={"/profile"}>
          Profile
        </NavLink>
      </li>
      {localStorage.getItem("levelup_token") !== null ? (
        <li className="navbar__item">
          <button
            className="underline hover:text-purple-700"
            onClick={() => {
              localStorage.removeItem("levelup_token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </li>
      ) : (
        <>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/login"}
            >
              Login
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/register"}
            >
              Register
            </NavLink>
          </li>
        </>
      )}{" "}
    </ul>
  );
};
