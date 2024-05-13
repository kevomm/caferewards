import Link from 'next/link';
import './layout.css'

export const metadata = {
  title: "Cafe Rewards",
  description: "Earn Rewards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="main-header">
          <nav className="main-nav">
            <ul className="nav-list">
              <li><Link href="/">HOME</Link></li>
              <li><Link href="#">GLOBAL</Link></li>
              <li><Link href="#">CARDS</Link></li>
              <li><Link href="/order">ORDER</Link></li>
              <li><Link href="#">SHOPS</Link></li>
              <li><Link href="/dashboard">ACCOUNT</Link></li>
            </ul>
          </nav>
        </header>
        {children}
        <footer className="main-footer">
          <div className="footer-content">
              <div className="footer-nav">
                  <ul className="nav-list">
                      <li><Link href="/">HOME</Link></li>
                      <li><Link href="/global">GLOBAL</Link></li>
                      <li><Link href="#">CARDS</Link></li>
                      <li><Link href="#">ORDER</Link></li>
                      <li><Link href="#">SHOPS</Link></li>
                      <li><Link href="#">ACCOUNT</Link></li>
                  </ul>
              </div>
              <div className="footer-logo">
                  <a href="index.html" className="logo">CAFÉ REWARDS</a>
              </div>
              <div className="footer-legal">
                  <p>&copy; 2024 Café Rewards Puerto Rico. All rights reserved.</p>
                  <p><a>Privacy Policy</a> | <a>Terms of Service</a></p>
              </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
