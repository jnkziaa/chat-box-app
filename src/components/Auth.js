import React, {useState} from 'react';
import Cookies from "universal-cookie/es6";
import axios from "axios";

import signinImage from "../assets/signup.jpg";

const cookies = new Cookies();

const initialState = { //basically an empty constructor for the initialState
    fullName: " ",
    username: " ",
    password: " ",
    confirmPassword: " ",
    phoneNumber: " ",
    avatarURL: " ",
}

export function Auth() {
    const [form, setForm] = useState(initialState);

    const [isSignUp, setIsSignUp] = useState(true); //sign up page for true, sign in page for false

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value}); //updates the statefield
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {username, password, phoneNumber, avatarURL} = form;
        const URL = "http://localhost:5000/auth";


        const {data: {token, userId, hashedPassword, fullName}} = await axios.post(`${URL}/${isSignUp ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        console.log("did it even get here?")

        cookies.set("token", token);
        cookies.set("username", username);
        cookies.set("fullName", fullName);
        cookies.set("userId", userId);

        if (isSignUp) {
            cookies.set("phoneNumber", phoneNumber)
            cookies.set("avatarURL", avatarURL)
            cookies.set("hashedPassword", hashedPassword)
        }

        console.log(" get here? x2")
        window.location.reload();
    }
    const switchMode = () => { //basically just a switch
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    }
    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignUp ? "Sign Up" : "Sign In"}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName"> Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required={true}
                                />
                            </div>
                        )}

                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username"> Username</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                required={true}
                            />
                        </div>

                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber"> Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required={true}
                                />
                            </div>
                        )}
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required={true}
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required={true}
                            />
                        </div>

                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required={true}
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>
                                {isSignUp ? "Sign Up" : "Sign In"}
                            </button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignUp ? "Already have an account? " : "Don't have an account? "}
                            <span onClick={switchMode}>
                                {isSignUp ? "Sign In" : "Sign Up"}
                            </span>
                        </p>
                    </div>

                </div>

            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt=" sign in "/>
            </div>
        </div>
    );
}
