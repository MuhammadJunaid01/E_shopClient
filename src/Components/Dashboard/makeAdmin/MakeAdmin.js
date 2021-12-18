import React, { useState } from "react";
import UseAuth from "./../../../hooks/useAuth/UseAuth";

const MakeAdmin = () => {
  const { user } = UseAuth();
  const [email, setEmail] = useState("");

  const handleMakeAdmin = (e) => {
    e.preventDefault();
    const user = { email };
    console.log("user", user);
    // e.preventDefault();
    fetch("https://morning-retreat-22291.herokuapp.com/admin", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmail("");
      });
  };
  const handleEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  return (
    <div>
      <form onSubmit={handleMakeAdmin}>
        <input
          onBlur={handleEmail}
          type="email"
          placeholder="Enter Email:"
          required
        />
        <input type="submit" value="Make Admin" />
      </form>
    </div>
  );
};

export default MakeAdmin;
