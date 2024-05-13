'use client'
import {useEffect, useState} from 'react';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51Ors4O01PBnNHA0X1HQbBSHuJcyVRUYRCLr1HA8AMoPpmvbRLriDcIPNKiniy63NUuo1f6TzfrjwNn3dhU0ZOocG00f04AKRcH');
import './shops.css';
export default function CoffeeShopPage({params}) {

    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState([]);

    const addToCart = (product) => {
        // Create a copy of the order to avoid mutation
        const updatedOrder = [...order];
        updatedOrder.push(product); // Add the selected product to the copy

        setOrder(updatedOrder); // Update the state with the modified order
    };

    const buy = async () => {
        const url = process.env.NEXT_PUBLIC_PROD === 'true' ? `${process.env.NEXT_PUBLIC_SERVERHOST}/auth/account/order/checkout` : `${process.env.NEXT_PUBLIC_LOCALHOST}/auth/account/order/checkout`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({products: order, coffeeShop: order[0].Menu.Coffeeshop.stripeid})
        });
        const { sessionId } = await response.json();
        await (await stripePromise).redirectToCheckout({ sessionId });
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const url = process.env.NEXT_PUBLIC_PROD === 'true' ? `${process.env.NEXT_PUBLIC_SERVERHOST}/auth/items/${params.shopId}` : `${process.env.NEXT_PUBLIC_LOCALHOST}/auth/items/${params.shopId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const products = await response.json();
            setProducts(products.menuItems);
        }
        fetchProducts();
    }, []);

    return (
        <div className="products-wrapper">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <div className="product-info">
                        <h4 className="product-name">{product.name}</h4>
                        <p>{product.description}</p>
                        <p>${(product.price / 100).toFixed(2)}</p>
                        <button onClick={() => addToCart(product)}>Buy</button>
                    </div>
                </div>
            ))}
            <div className="cart">
                <h3>Cart:</h3>
                {order.map((product) => (
                    <div className={"cart-item"} key={product.id}>
                        <p>{product.name}</p>
                    </div>
                ))}
                <button onClick={buy} className="checkout-button">Checkout</button>
            </div>

        </div>
    );
}