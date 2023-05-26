import React from "react";
import "./styles.scss";

function Footer() {
  return (
    <div className="footer">
      <p className="acknowledgement">
        Thank you for visiting my React project! This is not an official Netflix
        app. Developed by Ephrat N Belaineh for a major React project.
      </p>
      <p className="author">© Copyright Ephrat N Belaineh 2023</p>
    </div>
  );
}

export default Footer;
