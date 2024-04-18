'use client'
import {useEffect, useState} from 'react';
import Link from 'next/link';
import '../layout.css'
import './signup.css'
import { useRouter } from 'next/navigation';

export default function Signup() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passConfirm, setConfirm] = useState();
    const [fullName, setName] = useState();
    const [error, setError] = useState(false);
    const router = useRouter();

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
            const url = process.env.NEXT_PUBLIC_PROD === 'true' ? process.env.NEXT_PUBLIC_SIGNUP_URL_PROD : process.env.NEXT_PUBLIC_SIGNUP_URL_LOCAL;
            const response = await fetch(url, {
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
                setError(false);
                return router.push('/login');
            } else {
                return setError(true);
            }
        } catch (error) {
            return setError(true);
        }
    };


    return (
        <>
            <form id="signup-form" onSubmit={signup}>
                <label htmlFor="name">Full Name:</label><br/>
                <input onChange={handleNameChange} type="text" id="name" name="name" required/><br/>
                <label htmlFor="username">Email:</label><br/>
                <input onChange={handleEmailChange} type="email" id="username" name="username" required/><br/>
                <label htmlFor="password">Password:</label><br/>
                <input onChange={handlePasswordChange} type="password" id="password" name="password" required/><br/>
                <label htmlFor="confirm-password">Confirm Password:</label><br/>
                <input onChange={handleConfirmChange} type="password" id="confirm-password" name="confirm-password" required/><br/>
                {/* <div class="agreement-container">
                    <input type="checkbox" id="agreement" name="agreement" required />
                    <label htmlFor="agreement">I agree to the Terms and Conditions.</label><br/>
                </div> */}
                <button type="submit">Sign Up</button>
                <p>Already a member? <Link href="/login">Log In</Link></p>
        
                { error ? <div id="error-message" className="error-message">Error</div> : <></>}
            </form>
        </>

    );
}