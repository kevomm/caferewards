'use client'

import { useState } from "react";
import Link from "next/link";
import './login.css'
import { useRouter } from "next/navigation";


export default function Signup() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState(false)
    const router = useRouter()

    // Function to handle input change htmlFor email
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    // Function to handle input change htmlFor password
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const login = async (event) => {
        event.preventDefault()

        try {
            let url = ''
            if(process.env.PROD == 'false') {
                url = 'http://localhost:3000/auth/login'
            } else {
                url = 'http://172.233.189.185:3000/auth/login'
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
    
            if (response.ok) {
                setError(false)
                router.push('/')
            } else {
                console.log('shit')
                setError(true)
            }
        } catch (error) {
            console.log(error.message)
            setError(true)
        }
    };

    return (
        <form onSubmit={login}>
            <label htmlFor="username">Email:</label><br/>
            <input onChange={handleEmailChange} type="text" id="username" name="username"/><br/>
            <label htmlFor="password">Password:</label><br/>
            <input onChange={handlePasswordChange} type="password" id="password" name="password"/><br/>
            <button type="submit">Login</button>
            <p>Are you a member? <Link href="/signup">Sign Up</Link></p>

            { error ? <div id="error-message" className="error-message">Error</div> : <></>}
        </form>
    );
}