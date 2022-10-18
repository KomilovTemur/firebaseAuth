import { signup, useAuth, logOut, login } from "./firebase";
import { useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSignUp = async () => {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      passwordRef.current.value = "";
      emailRef.current.value = "";
    } catch {
      alert("Error!");
    }
    setLoading(false);
  };
  const handleLogOut = async () => {
    setLoading(true);
    try {
      await logOut();
    } catch {
      alert("Error!");
    }
    setLoading(false);
  };
  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      passwordRef.current.value = "";
      emailRef.current.value = "";
    } catch {
      alert("Error!");
    }
    setLoading(false);
  };
  return (
    <div className="container p-2">
      {currentUser?.email ? (
        <div className="alert alert-primary">
          Currently logged in as: <b> {currentUser?.email} </b>{" "}
        </div>
      ) : (
        <div className="alert alert-success"> Please SignIn or SignUp </div>
      )}
      <h1>Firebase Auth</h1>
      <div id="fields d-flex">
        <input className="form-control" ref={emailRef} placeholder="Email" />
        <input
          className="form-control my-2"
          ref={passwordRef}
          type="password"
          placeholder="Password"
        />
      </div>
      <button
        className="btn btn-success"
        disabled={loading || currentUser}
        onClick={handleSignUp}
      >
        SignUp
      </button>
      <button
        className="btn btn-primary mx-2"
        disabled={loading || currentUser}
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        className="btn btn-danger"
        disabled={loading || !currentUser}
        onClick={handleLogOut}
      >
        Log Out
      </button>
    </div>
  );
}
