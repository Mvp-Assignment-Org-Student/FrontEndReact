import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function EmailVerificationPage() {
  //Hjälp av chatgtp
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const postVerifyCode = async () => {
    const email = localStorage.getItem("signupEmail");
    if (!email) {
      console.error("Email saknas i localStorage");
      return;
    }

    const payload = {
      email,
      code: digits.join(""),
    };

    try {
      const res = await fetch(
        "https://authservicemvp-fce3bbajf7bwegdq.swedencentral-01.azurewebsites.net/api/Auth/confirm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        console.log("Verify = true");
        localStorage.removeItem("signupEmail");
        navigate("/signin");
      } else {
        console.error("Verify = false");
      }
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (digits.some((d) => !d)) {
      alert("Fyll i hela koden.");
      return;
    }
    postVerifyCode();
  };

  return (
    <div className="validate-card">
      <form onSubmit={handleSubmit} className="validate-form">
        <label htmlFor="code" className="form-label">
          Verifieringskod
        </label>
        <div className="code-input-container">
          {digits.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="code-box"
            />
          ))}
        </div>
        <button type="submit" className="btn validate-btn">
          Verifiera
        </button>
      </form>
    </div>
  );
}

export default EmailVerificationPage;
