import React, { useRef } from "react";
import axios from "axios";

const Registor = () => {
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the input fields
    if (
      !usernameDom.current.value ||
      !firstnameDom.current.value ||
      !lastnameDom.current.value ||
      !emailDom.current.value ||
      !passwordDom.current.value
    ) {
      alert("Please provide all the required information.");
      return;
    }

    // Gather the input values
    const userData = {
      username: usernameDom.current.value,
      firstname: firstnameDom.current.value,
      lastname: lastnameDom.current.value,
      email: emailDom.current.value,
      password: passwordDom.current.value,
    };

    try {
      const response = await axios.post("/users/register",userData);
      console.log("User registered successfully:", response.data);
      // Optionally, clear the form fields after successful registration
      usernameDom.current.value = '';
      firstnameDom.current.value = '';
      lastnameDom.current.value = '';
      emailDom.current.value = '';
      passwordDom.current.value = '';
    } catch (error) {
      console.error("Error during registration:", error.response ? error.response.data : error.message);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <span>Username:</span>
            <input ref={usernameDom} type="text" placeholder="Username" />
          </div>
          <br />
          <div>
            <span>Firstname:</span>
            <input ref={firstnameDom} type="text" placeholder="Firstname" />
          </div>
          <br />
          <div>
            <span>Lastname:</span>
            <input ref={lastnameDom} type="text" placeholder="Lastname" />
          </div>
          <br />
          <div>
            <span>Email:</span>
            <input ref={emailDom} type="email" placeholder="Email" />
          </div>
          <br />
          <div>
            <span>Password:</span>
            <input ref={passwordDom} type="password" placeholder="Password" />
          </div>
          <br />
          <button type="submit">Register</button>
        </form>
      </section>
    </div>
  );
};

export default Registor;
