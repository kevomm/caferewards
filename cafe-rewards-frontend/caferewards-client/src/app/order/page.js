import './order.css';
import RootLayout from '../layout';

const CoffeeShopSelector = () => (
    <aside className="coffee-shop-selector">
        <h2>Select Coffee Shop</h2>
        <select id="coffeeShopSelect" aria-label="Select coffee shop">
            {/* Options will be dynamically loaded here */}
        </select>
    </aside>
);

const MenuContainer = () => (
    <section className="menu-container">
        <header className="menu-header">
            <h1>Menu</h1>
            <input type="search" placeholder="Search menu items..." aria-label="Search menu"/>
        </header>
        <div className="menu-items" id="menuItems">
            {/* Menu items will be fetched and displayed here */}
        </div>
    </section>
);

export default function Order() {
    return (
        <RootLayout>
            <main className="menu-page">
                <CoffeeShopSelector />
                <MenuContainer />
            </main>
        </RootLayout>
    );
}