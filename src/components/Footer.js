'use client';
export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} MR ANAS NIDIR. All rights reserved.</p>
      <div className="socials">
        <a href="https://tiktok.com/@anasnide" target="_blank" rel="noopener noreferrer">TikTok</a> |
        <a href="https://www.instagram.com/anasnide" target="_blank" rel="noopener noreferrer">Instagram</a> |
        <a href="/pages/support.html">Support</a>
      </div>
      <style jsx>{`
        .footer {
          text-align: center;
          padding: 24px;
          background: #000;
          color: #aaa;
          margin-top: auto;
        }
        .socials a {
          color: #00f0ff;
          text-decoration: none;
          margin: 0 8px;
        }
      `}</style>
    </footer>
  );
}
