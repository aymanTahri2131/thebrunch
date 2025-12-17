import React from "react";

const partners = [
  { logo: "https://www2.0zz0.com/2025/12/17/22/405105782.png", name: "Partner 1" },
  { logo: "https://www2.0zz0.com/2025/12/17/22/405105782.png", name: "Partner 2" },
  { logo: "https://www2.0zz0.com/2025/12/17/22/405105782.png", name: "Partner 3" },
  { logo: "https://www2.0zz0.com/2025/12/17/22/405105782.png", name: "Partner 4" },
  { logo: "https://www2.0zz0.com/2025/12/17/22/405105782.png", name: "Partner 5" },
  { logo: "https://www2.0zz0.com/2025/12/17/22/405105782.png", name: "Partner 6" },
];

export default function Partners() {
  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Nos partenaires</h2>

      <div style={styles.slider}>
        <div style={styles.track} className="partners-track">
          {[...partners, ...partners].map((p, i) => (
            <div style={styles.slide} key={i}>
              <img
                src={p.logo}
                alt={p.name}
                style={styles.logo}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CSS مدمج */}
      <style>
        {`
          .partners-track {
            animation: scrollRTL 25s linear infinite;
          }

          .partners-track:hover {
            animation-play-state: paused;
          }

          @keyframes scrollRTL {
            from {
              transform: translateX(-50%);
            }
            to {
              transform: translateX(0%);
            }
          }
        `}
      </style>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "#f9f9f9",
    padding: "60px 0",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    marginBottom: "30px",
    fontWeight: 600,
  },
  slider: {
    overflow: "hidden",
    width: "100%",
  },
  track: {
    display: "flex",
    width: "max-content",
  },
  slide: {
    minWidth: "220px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    maxWidth: "140px",
    opacity: 0.8,
    filter: "grayscale(100%)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
};
