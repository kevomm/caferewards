'use client'
import {useEffect, useState} from "react";
import './dashboard.css';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

function PaymentForm() {
    const [clientSecret, setClientSecret] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_PROD === 'true' ? process.env.NEXT_PUBLIC_CREATE_CARD_URL_PROD_1 : process.env.NEXT_PUBLIC_CREATE_CARD_URL_LOCAL_1;
        fetch(url, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const cardElement = elements.getElement(CardElement);
            const si = await stripe.confirmCardSetup(
                clientSecret,
                {
                    payment_method: {card: cardElement}
                }
            );
            const url = process.env.NEXT_PUBLIC_PROD === 'true' ? process.env.NEXT_PUBLIC_CREATE_CARD_URL_PROD_2 : process.env.NEXT_PUBLIC_CREATE_CARD_URL_LOCAL_2;
            await fetch(url, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({siId: si.setupIntent.id})
            });
            window.location.reload();
        } catch(error) {
            console.log(error.message);
        }
    }

    return (
        <div className="cardForm">
            <h1 className="cardTitle">Please, Add a card</h1>
            <form onSubmit={handleSubmit}>
                <CardElement options={{}}/>
                <button type="submit">Save Card</button>
            </form>
        </div>
    );
}

module.exports = PaymentForm;