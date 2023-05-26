import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  //signInWithEmailAndPassword,
} from "firebase/auth";

import "./styles.scss";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (event) => {
    event.preventDefault(); // prevent form submission
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert(`${user.email}`, "signed in");
        navigate(`/signin`);

        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
      });

    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     navigate(`/${user}/movies`);
    //     // ...
    //   })
    //   .catch((error) => {
    //     // const errorCode = error.code;
    //     // const errorMessage = error.message;
    //     console.log(error);
    //   });
  };

  return (
    <div className="signin_container">
      <div className="signin_page">
        <h1>Sign Up</h1>
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
            Sign Up
          </button>
          {/* <p>
            New to AddisCinema? <Link to="/signup">Sign Up now</Link>
          </p> */}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
