import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function LoginForm({ authenticated, login, location }) {
    const [id, setId] = useState("");
    const [pass, setPass] = useState("")

    const handleClick = () => {
        try {
          login({ id, pass });
        } catch (e) {
          alert("Failed to login");
          setId("");
          setPass("");
        }
      };
    
      const { from } = location.state || { from: { pathname: "/" } };
      if (authenticated) return <Redirect to={from} />;

    return (
        <div>
            <h1>Login</h1>
            <input
                value={id}
                onChange={({ target: { value } }) => setId(value)}
                type="text"
                placeholder="id"
            />
            <input
                value={pass}
                onChange={({ target: { value } }) => setPass(value)}
                type="password"
                placeholder="pass"
            />
            <button onClick={handleClick}>Login</button>
        </div>
    );
}

export default LoginForm;