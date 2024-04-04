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
        <header class="main-header">
          <nav class="main-nav">
            <ul class="nav-list">
              <li><Link href="/">HOME</Link></li>
              <li><Link href="#">GLOBAL</Link></li>
              <li><Link href="#">CARDS</Link></li>
              <li><Link href="#">ORDER</Link></li>
              <li><Link href="#">SHOPS</Link></li>
              <li><Link href="#">ACCOUNT</Link></li>
            </ul>
          </nav>
        </header>
        {children}
        <footer class="main-footer">
          <div class="footer-content">
              <div class="footer-nav">
                  <ul class="nav-list">
                      <li><Link href="/">HOME</Link></li>
                      <li><Link href="/global">GLOBAL</Link></li>
                      <li><Link href="#">CARDS</Link></li>
                      <li><Link href="#">ORDER</Link></li>
                      <li><Link href="#">SHOPS</Link></li>
                      <li><Link href="#">ACCOUNT</Link></li>
                  </ul>
              </div>
              <div class="footer-logo">
                  <a href="index.html" class="logo">CAFÉ REWARDS</a>
              </div>
              <div class="footer-legal">
                  <p>&copy; 2024 Café Rewards Puerto Rico. All rights reserved.</p>
                  <p><a>Privacy Policy</a> | <a>Terms of Service</a></p>
              </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
