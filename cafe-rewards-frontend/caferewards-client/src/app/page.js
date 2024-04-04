import Link from 'next/link';
import './indexpage.css';

export default function Home() {
  return (
      <section class="hero-section">
        <h1>START EARNING POINTS.</h1>
        <hr class="section-line"/>
        <Link href="/signup">
          <button class="signup-button">join now</button>
        </Link>
      </section>
  );
}
