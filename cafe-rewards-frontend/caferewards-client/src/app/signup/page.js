'use client'
import { useState } from 'react';
import '../layout.css'
import './signup.css'

export default function Signup() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passConfirm, setConfirm] = useState()
    const [fullName, setName] = useState()

    // Function to handle input change for full name
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    // Function to handle input change for email
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    // Function to handle input change for password
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // Function to handle input change for password confirmation
    const handleConfirmChange = (event) => {
        setConfirm(event.target.value);
    };

    const signup = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('http://172.233.189.185:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: fullName.split(' ')[0],
                    lastName: fullName.split(' ')[1],
                    email,
                    password
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                const errorData = await response.json();
                console.error(errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        <>
            <form id="signup-form" onSubmit={signup}>
                <label for="name">Full Name:</label><br/>
                <input onChange={handleNameChange} type="text" id="name" name="name" required/><br/>
                <label for="username">Email:</label><br/>
                <input onChange={handleEmailChange} type="email" id="username" name="username" required/><br/>
                <label for="password">Password:</label><br/>
                <input onChange={handlePasswordChange} type="password" id="password" name="password" required/><br/>
                <label for="confirm-password">Confirm Password:</label><br/>
                <input onChange={handleConfirmChange} type="password" id="confirm-password" name="confirm-password" required/><br/>
                {/* <div class="agreement-container">
                    <input type="checkbox" id="agreement" name="agreement" required />
                    <label for="agreement">I agree to the Terms and Conditions.</label><br/>
                </div> */}
                <button type="submit">Sign Up</button>
                <p>Already a member? <a href="login.html">Log In</a></p>
        
                <div id="error-message" class="error-message"></div>
                <div id="success-message" class="success-message"></div>
            </form>
        </>

    );
}