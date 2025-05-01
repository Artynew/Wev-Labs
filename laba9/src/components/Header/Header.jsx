import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { useLoginState } from "../../hooks/useLoginState";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ThemeContext } from "../../Context/ThemeContext";
import { MenuButtonWide, TextareaT } from "react-bootstrap-icons";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { username, role } = useSelector((state) => {
    return {
      username: state.user.username,
      role: state.user.role
    }
  });
 
  const isAuthenticated = useLoginState();
  const dispatch = useDispatch();
  console.log(username)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <header className="bg-white text-white py-2">
      <Container className="w-50 d-flex align-items-center flex-wrap header__container">
        <h1 className="me-auto">
          <Link to="/">Главная</Link>
        </h1>
        <h3 className="me-auto">
          <Link to="/about_me">О себе</Link>
        </h3>
        <p className="m-0 me-2">
          {isAuthenticated ? (
            <Link to="/profile">Пользователь: {username}</Link>
          ) : (
            <></>
          )}
        </p>
        {isAuthenticated ? (
          <Link
            to="/"
            className="m-0 text-danger"
            onClick={() => dispatch({ type: "LOGOUT" })}
          >
            Выйти
          </Link>
        ) : (
          <></>
        )}

        {role == "admin" ? <Link to="admin/users">Админ панель</Link> : <></>}

        <div className="d-flex align-items-center gap-3">
          <MenuButtonWide onClick={handleShow} className="w-100" />
          <TextareaT onClick={toggleTheme} className="w-100" />
        </div>
      </Container>
      <Sidebar show={show} handleClose={handleClose} />
    </header>
  );
}

export default Header;
