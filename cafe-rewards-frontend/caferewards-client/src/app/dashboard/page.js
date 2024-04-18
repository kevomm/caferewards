'use client'
import { useEffect, useState } from 'react';
import { redirect } from "next/navigation";

const DashboardPage = () => {

    const [data, setData] = useState(null);
    const [authError, setAuthError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // prepare url
            let host = '';
            process.env.NEXT_PUBLIC_PROD === 'true'
                ? host = 'http://172.233.189.185:3000'
                : host = 'http://localhost:3000';
            const url = `${host}/auth/account/dashboard`;

            // fetch data
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (response.ok) setData(await response.json());
            if (response.status === 401) setAuthError(true);
        };
        fetchData();
        if(authError) redirect('/login');
    }, []);

    if(authError) return redirect('/login');

    return (
        <div>

        </div>
    );
};

export default DashboardPage;
