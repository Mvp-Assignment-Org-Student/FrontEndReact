import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const postSignUp = async () => {
    try {
      const res = await fetch(
        `https://authservicemvp-fce3bbajf7bwegdq.swedencentral-01.azurewebsites.net/api/Auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        console.error("Sign up failed");
      } else {
        console.log("Sign up succeed");
        navigate("/verify");
        localStorage.setItem("signupEmail", formData.email);
      }
    } catch (err) {
      console.error("Error submiting:", err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    postSignUp();
  };
  return (
    <div className="sign-card">
      <form noValidate onSubmit={handleSubmit} className="sign-form">
        <h2>
          Ventixe <img src="/src/images/LogoType.svg" alt="" />
        </h2>
        <h3>Sign Up</h3>
        <div className="form-group">
          <label>Email*</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exampel@domain.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Password*</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="***********"
            required
          />
        </div>
        <button type="submit" className="btn sign-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
