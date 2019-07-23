
//\\//\\//\\//\\//\\ USER LOGIN BUTTON ON LOGIN PAGE //\\//\\//\\//\\//\\

import React from "react";

function LoginButton({ type = "default", className, children, onClick }) {
  return (
    <button loginClick={onClick} className={["btn btn-lg", `btn-${type}`, className].join(" ")}>
      {children}
    </button>
  );
}

export default LoginButton;
