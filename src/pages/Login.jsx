import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { React, useEffect, useState } from "react";
import { useAuth } from "../contexts/FakeAuthContext";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <Link to="/app">
          <Button
            type="primary"
            onClick={(e) => {
              e.preventDefault();
              login(email, password);
            }}
          >
            Login
          </Button>
        </Link>
      </form>
    </main>
  );
}
