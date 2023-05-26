import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AuthContext from "../../AuthContext";

import "./styles.scss";

function Auth() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (event) => {
    event.preventDefault(); // prevent form submission
    const auth = getAuth();
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     alert(`${user.email}`, "signed in");

    //     // ...
    //   })
    //   .catch((error) => {
    //     // const errorCode = error.code;
    //     // const errorMessage = error.message;
    //     console.log(error);
    //   });

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsAuthenticated(true);
        navigate(`/movies/${user.uid}`);
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
      });
  };

  return (
    <div className="signin_container">
      <div className="signin_page">
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              placeholder="Please enter your email address"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>
          <button type="submit" className="signin_button">
            Sign In
          </button>
          <p>
            New to AddisCinema? <Link to="/signup">Sign Up now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Auth;
