// src/Login.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function Login() {
    const { handleSubmit } = useForm();
    const [captcha, setCaptcha] = useState(null);
    const [userCaptchaInput, setUserCaptchaInput] = useState("");
    const [captchaError, setCaptchaError] = useState("");

    // Generate a random CAPTCHA question (addition or subtraction)
    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const operation = Math.random() < 0.5 ? "+" : "-";
        const answer = operation === "+" ? num1 + num2 : num1 - num2;

        setCaptcha({
            question: `${num1} ${operation} ${num2}`,
            answer: answer,
        });
    };

    const onSubmit = () => {
        if (parseInt(userCaptchaInput) === captcha.answer) {
            console.log("CAPTCHA verified successfully!");
            setCaptchaError("");
            // You can add any further actions here after successful CAPTCHA verification
        } else {
            setCaptchaError("Incorrect CAPTCHA answer. Try again.");
            generateCaptcha(); // Generate a new CAPTCHA
        }
    };

    // Generate initial CAPTCHA when component mounts
    useEffect(() => {
        generateCaptcha();
    }, []);

    return (
        <div className="App">
            <p className="title">CAPTCHA Verification</p>
            {captcha && (
                <div className="captcha-section">
                    <label>{captcha.question} = </label>
                    <input
                        type="text"
                        value={userCaptchaInput}
                        onChange={(e) => setUserCaptchaInput(e.target.value)}
                        required
                        className="captcha-input"
                    />
                    <button type="button" onClick={generateCaptcha} className="refresh-button">
                        Refresh
                    </button>
                    {captchaError && <span className="captcha-error">{captchaError}</span>}
                </div>
            )}
            <button onClick={handleSubmit(onSubmit)} style={{ backgroundColor: "#a1eafb" }}>
                Submit
            </button>
        </div>
    );
}

export default Login;
