import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await postSignIn();
  };

  const postSignIn = async () => {
    try {
      const res = await fetch(
        `https://authservicemvp-fce3bbajf7bwegdq.swedencentral-01.azurewebsites.net/api/Auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        console.error("Sign in failed");
      } else {
        const data = await res.json();

        console.log("Sign in succeed");
        localStorage.setItem("jwtToken", data.token);
        navigate("/");
      }
    } catch (err) {
      console.error("Error submiting:", err);
    }
  };
  return (
    <div className="sign-card">
      <form onSubmit={handleSubmit} noValidate className="sign-form">
        <h2>
          Ventixe <img src="/src/images/LogoType.svg" alt="" />
        </h2>
        <h3>Sign In</h3>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn sign-btn">
          Log in
        </button>
        <Link to="/signup" className="signup-link">
          Sign Up here
        </Link>
      </form>
    </div>
  );
}

export default SignInPage;
