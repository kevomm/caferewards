import React from 'react';
import './shops.css';
import RootLayout from '../layout';

function Shops() {
    return (
        <RootLayout>
            <main className="shops-page">
                <aside className="shop-list">
                    <h2>Find a store</h2>
                    <input type="text" id="shop-search" placeholder="Search" aria-label="Search for coffee shops" />
                    <button id="shop-filter">Filter</button>
                    <div className="shop-items-container"></div>
                </aside>
                <section className="map-container" id="map">
                    Map functionality coming soon.
                </section>
            </main>
        </RootLayout>
    );
}

export default Shops;