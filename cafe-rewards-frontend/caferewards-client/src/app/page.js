import Link from 'next/link';
import './indexpage.css';

export default function Home() {
  return (
      <section className="hero-section">
        <h1>START EARNING POINTS.</h1>
        <hr className="section-line"/>
        <Link href="/signup">
          <button className="signup-button">join now</button>
        </Link>
      </section>
  );
}
