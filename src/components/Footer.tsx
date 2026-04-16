/* The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="text-center py-3" style={{ backgroundColor: '#2D336B', color: '#FFF2F2' }}>
    <p style={{ margin: 0 }}>
      © 2026 Student Event Hub — Built for the UH Community
    </p>
    <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>
      Jayden Cruz · Ahron Natividad · Kadon Nakano · Philip Low
    </p>

    <a
      style={{ color: '#FFF2F2', margin: 0, fontSize: '0.85rem', opacity: 0.7 }} 
      href="https://student-event-hub.github.io/"
    >
      https://student-event-hub.github.io/
    </a>
  </footer>
);

export default Footer;
