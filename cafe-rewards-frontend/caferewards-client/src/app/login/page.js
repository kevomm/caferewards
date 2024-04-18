'use client'

import { useState} from "react";
import Link from "next/link";
import './login.css'
import { useRouter } from "next/navigation";


export default function Signup() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const router = useRouter();

    // Function to handle input change htmlFor email
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    // Function to handle input change htmlFor password
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const login = async (event) => {
        event.preventDefault();

        try {
            const url = process.env.NEXT_PUBLIC_PROD === 'true' ? process.env.NEXT_PUBLIC_LOGIN_URL_PROD : process.env.NEXT_PUBLIC_LOGIN_URL_LOCAL;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                }),
                credentials: 'include'
            });
    
            if (response.ok) {
                setError(false);
                return router.push('/dashboard');
            } else {
                return setError(true);
            }
        } catch (error) {
            return setError(true);
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