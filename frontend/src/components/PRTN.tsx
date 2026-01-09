import React from "react";

const partners = [
  { logo: "https://i.postimg.cc/FHmkDzmL/1.png", name: "Partner 1" },
  { logo: "https://i.postimg.cc/HkH8BnHQ/2.png", name: "Partner 2" },
  { logo: "https://i.postimg.cc/GmrTqtrG/3.png", name: "Partner 3" },
  { logo: "https://i.postimg.cc/P5hv2Jh1/4.png", name: "Partner 4" },
  { logo: "https://i.postimg.cc/gkMbBBb0/5.png", name: "Partner 5" },
  { logo: "https://i.postimg.cc/CLvp66pz/6.png", name: "Partner 6" },
  { logo: "https://i.postimg.cc/8Pygnng7/7.png", name: "Partner 7" },
  { logo: "https://i.postimg.cc/qMmHZZHh/8.png", name: "Partner 8" },
  { logo: "https://i.postimg.cc/Kv9hssh3/9.png", name: "Partner 9" },
  { logo: "https://i.postimg.cc/m2dW66WM/10.png", name: "Partner 10" },
  { logo: "https://i.postimg.cc/PxKSr94Q/11.png", name: "Partner 11" },
  { logo: "https://i.postimg.cc/4dwWNq58/12.png", name: "Partner 12" },
  { logo: "https://i.postimg.cc/63zM5g0z/13.png", name: "Partner 13" },
  { logo: "https://i.postimg.cc/PxKSr94S/14.png", name: "Partner 14" },
  { logo: "https://i.postimg.cc/cHTF42mX/15.png", name: "Partner 15" },
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
            animation: scrollRTL 20s linear infinite;
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
    maxWidth: "200px",
    opacity: 1,
    filter: "none", // 🔥 هنا الحل
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },
};
