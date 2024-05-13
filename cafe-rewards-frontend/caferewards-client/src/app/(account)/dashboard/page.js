'use client'
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useContext} from "react";
import {AccountContext} from "@/app/(account)/layout";
const stripePromise = loadStripe('pk_test_51Ors4O01PBnNHA0X1HQbBSHuJcyVRUYRCLr1HA8AMoPpmvbRLriDcIPNKiniy63NUuo1f6TzfrjwNn3dhU0ZOocG00f04AKRcH');
const PaymentForm = require('./cardForm');


const DashboardPage = () => {

    const userData = useContext(AccountContext);

    return (
        <div>
            {userData?.card
                ? <div className="dashboard">
                    <h2>My Dashboard</h2>
                    <div className="dashboard-item">Email: {userData.email}<span id="userEmail"></span></div>
                    <div className="dashboard-item">Stripe ID: {userData.stripeId}<span id="userStripeId"></span></div>

                </div>
                : <Elements stripe={stripePromise}><PaymentForm/></Elements>}
        </div>
    );
};

export default DashboardPage;
