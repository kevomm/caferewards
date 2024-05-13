'use client'
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import './order.css';

export default function OrderPage() {
    const [shops, setShops] = useState([]);

    useEffect(() => {
        const getShops = async () => {
            try {
                const url = process.env.NEXT_PUBLIC_PROD === 'true' ? `${process.env.NEXT_PUBLIC_SERVERHOST}/auth/coffeeshop` : `${process.env.NEXT_PUBLIC_LOCALHOST}/auth/coffeeshop`;
                const response = await fetch(url, {
                    method: 'GET',
                });

                const data = await response.json();
                setShops(data.coffeeShops);
            } catch (error) {
                console.log(error);
            }
        };
        getShops();
    }, []);

    const renderShopCards = () => {
        return (
        <div className="shops-wrapper">
            {shops.map((shop) => (
            <div key={shop.id} className="shop-card">
                <h3>{shop.name}</h3>
                <p>{shop.description}</p>
                <Link className="shop-link" href={`/order/${shop.shopid}`}>See Coffee Shop</Link>
            </div>
            ))}
        </div>


    );
    };

    return (
        <div className="shop-list">
            {renderShopCards()}
        </div>
    );
}
