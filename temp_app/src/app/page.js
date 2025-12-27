import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <header className="hero" id="home">
        <div className="overlay"></div>
        <div className="hero-content reveal active"> {/* Default active or use intersection observer later */}
          {/* Note: In production, images should be in public/assets. Assuming they are moved there. */}
          <div className="logo-wrapper" style={{ maxWidth: 90, margin: '0 auto 12px' }}>
            <Image src="/assets/logo.jpg" alt="Logo" width={90} height={90} className="logo" />
          </div>
          <h1 className="hero-title">MR ANAS NIDIR</h1>
          <p className="hero-subtitle">Entrepreneur | Visionary | Digital Innovator</p>
          <Link href="#projects" className="btn glow">Explore Projects</Link>
        </div>
      </header>

      {/* PROJECTS */}
      <section id="projects" className="section reveal">
        <h2>🚀 My Projects</h2>

        {/* Project Logos - Static representation for now, or reimplement marquee */}
        <div className="project-logos">
          <div className="logos-track">
            {/* Mock marquee content */}
            <div className="set">
              <Image src="/assets/nexengine.png" alt="NEXENGINE" width={80} height={80} />
              <Image src="/assets/nex-logo.png" alt="NEX AI" width={80} height={80} />
              <Image src="/assets/anasgpt.png" alt="ANAS GPT" width={80} height={80} />
              <Image src="/assets/manex.png" alt="NEX PAY" width={80} height={80} />
            </div>
          </div>
        </div>

        <div className="grid">
          <article className="card glass">
            <h3>NEXENGINE</h3>
            <p>Independent web server system</p>
          </article>
          <article className="card glass">
            <h3>NEX AI</h3>
            <p>Custom AI Chatbot Platform</p>
          </article>
          <article className="card glass">
            <h3>ANAS GPT</h3>
            <p>Advanced LLM Web Assistant</p>
          </article>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="section reveal">
        <h2>📚 Digital Products</h2>
        <div className="product-list">
          <a href="https://anasnidir.gumroad.com/" target="_blank" rel="noopener noreferrer" className="product glow-btn">Gumroad</a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section reveal">
        <h2>👤 About Me</h2>
        <p>I'm Mr Anas Nidir, a builder of tech, AI systems, and futuristic platforms — driven by simplicity and independence.</p>
      </section>

      {/* BIO */}
      <section id="bio" className="section reveal">
        <h2>🧾 My Biography</h2>
        <div className="bio-container">
          <div className="bio-img-wrapper">
            <Image src="/assets/profile.jpg" alt="Mr Anas Nidir" width={220} height={220} className="bio-img" />
          </div>
          <div className="bio-text">
            <p><strong>Mr Anas Nidir</strong> is a tech entrepreneur, futurist, and digital architect. He is the founder of innovation-focused projects including NEXENGINE, NEX AI, and ANAS GPT.</p>
            <p>Since March 2025, he has been developing high-performance solutions from scratch — without relying on traditional tools or platforms.</p>
            <p>He also writes <strong>"Simple is Power"</strong>, reflecting a philosophy of clarity, minimalism, and control.</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section reveal">
        <h2>📨 Contact</h2>
        <p>Reach me at <a href="mailto:ceo@anasnidir.com">ceo@anasnidir.com</a> or via socials below.</p>
      </section>
    </>
  );
}
