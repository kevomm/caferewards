'use client'
import { useEffect, useState } from 'react';
import { redirect } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
const stripePromise = loadStripe('pk_test_51Ors4O01PBnNHA0X1HQbBSHuJcyVRUYRCLr1HA8AMoPpmvbRLriDcIPNKiniy63NUuo1f6TzfrjwNn3dhU0ZOocG00f04AKRcH');
const PaymentForm = require('./cardForm');


const DashboardPage = () => {

    const [data, setData] = useState(null);
    const [customerSecret, setCustomerSecret] = useState(null);
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

    if(loading) {
        return (
            <>Loading</>
        );
    } else {
        return (
            <div>
                {data?.card
                    ? <></>
                    : <Elements stripe={stripePromise}><PaymentForm/></Elements>}
            </div>
        );
    }
};

export default DashboardPage;
