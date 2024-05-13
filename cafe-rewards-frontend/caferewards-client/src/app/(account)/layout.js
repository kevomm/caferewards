'use client'
import {useEffect, useState, createContext} from 'react';
import { redirect } from "next/navigation";

export const AccountContext = createContext();

export default function AccountLayout({ children }) {

    const [data, setData] = useState(null);
    const [authError, setAuthError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // prepare url
            const url = process.env.NEXT_PUBLIC_PROD == 'true' ? process.env.NEXT_PUBLIC_DASHBOARD_URL_PROD : process.env.NEXT_PUBLIC_DASHBOARD_URL_LOCAL;

            // fetch data
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (response.ok) {
                const res = await response.json();
                setData(res.user);
                setLoading(false);
            }
            if (response.status === 401) setAuthError(true);
        };
        fetchData();
    }, []);

    if(authError) return redirect('/login');
    if(loading) return <>Loading...</>;
    else return (
            <AccountContext.Provider value={data}>
                {children}
            </AccountContext.Provider>
        );
}