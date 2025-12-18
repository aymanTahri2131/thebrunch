import React from "react";

const partners = [
  { logo: "https://www2.0zz0.com/2025/12/17/22/405105782.png", name: "Partner 1" },
  { logo: "https://www2.0zz0.com/2025/12/17/23/287341257.png", name: "Partner 2" },
  { logo: "https://www2.0zz0.com/2025/12/17/23/726935830.png", name: "Partner 3" },
  { logo: "https://www2.0zz0.com/2025/12/17/23/185516486.png", name: "Partner 4" },
  { logo: "https://www2.0zz0.com/2025/12/17/23/883165123.png", name: "Partner 5" },
  { logo: "https://www2.0zz0.com/2025/12/17/23/474396477.png", name: "Partner 6" },
  { logo: "https://www2.0zz0.com/2025/12/17/23/627892011.png", name: "Partner 7" },
  { logo: "https://www2.0zz0.com/2025/12/17/23/376431091.png", name: "Partner 8" },
  { logo: "https://www2.0zz0.com/2025/12/17/23/719095499.png", name: "Partner 9" },
  { logo: "https://www2.0zz0.com/2025/12/17/23/286124848.png", name: "Partner 10" },
  { logo: "https://www2.0zz0.com/2025/12/17/23/204231593.png", name: "Partner 11" },
  { logo: "https://www2.0zz0.com/2025/12/17/23/128217283.png", name: "Partner 12" },
  { logo: "https://www2.0zz0.com/2025/12/17/23/844110878.png", name: "Partner 13" },
  { logo: "https://www2.0zz0.com/2025/12/17/23/716025616.png", name: "Partner 14" },
  { logo: "https://www2.0zz0.com/2025/12/18/00/289737642.png", name: "Partner 15" },
];

export default function Partners() {
  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Nos Partenaires</h2>

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

      <style>
        {`
          .partners-track {
            animation: scrollRTL 18s linear infinite;
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
    opacity: 1,
    filter: "none", // 🔥 هنا الحل
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },
};
