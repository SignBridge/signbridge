import React from "react";

const users = [
    { id: "a", password: "a123", name: "Kim" },
    { id: "b", password: "b123", name: "Lee" },
    { id: "c", password: "c123", name: "Park" },
  ];

function signIn({ id, pass }) {
    const user = users.find(
        (user) => user.id === id && user.pass === pass
      );
      if (user === undefined) throw new Error();
      
    return user;
}

export default signIn;