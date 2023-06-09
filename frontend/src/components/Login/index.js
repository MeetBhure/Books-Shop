import React, { useState } from "react";
import '../../app.css'
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
require('dotenv').config();

export const Login = ({setToken}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/usersapi/loginUser`, {
            "email" : email,
            "password" : pass
          })
          .then(function (response) {
            console.log(response.data.token);
            window.localStorage.setItem("token", response.data.token);
            history.push("/");
            setToken(response.data.token)

          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit" style={{backgroundColor: 'rgba(0, 0, 0, 0.87)', color: 'white', marginTop: '18px'}}>Log In</button>
            </form>
            <button className="link-btn"><Link  to="/register">Don't have an account? Register here.</Link></button>
        </div>
    )
}