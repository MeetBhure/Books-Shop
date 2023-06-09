import React, { useState } from "react";
import '../../app.css'
import axios from "axios";
import { Link,useHistory } from 'react-router-dom';
// import { useHistory } from "react-router-dom";

export const Register = ({setToken}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/usersapi/registerUser`, {
            "name": name,
            "email" : email,
            "password" : pass
          })
          .then(function (response) {
            console.log(response.data);
            window.localStorage.setItem("token", response.data.token);
            setToken(response.data.token)
            history.push("/");
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div className="register-wrap">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit" style={{backgroundColor: 'rgba(0, 0, 0, 0.87)', color: 'white', marginTop: '18px'}}>Register</button>
        </form>
        <button className="link-btn"><Link  to="/login">Sign In</Link></button>
    </div>
    )
}