import React from "react";

const partners = [
  { logo: "https://i.ibb.co/WpDQdmMp/1.png", name: "Partner 1" },
  { logo: "https://i.ibb.co/b8CD4Nh/2.png", name: "Partner 2" },
  { logo: "https://i.ibb.co/gbfDYPrP/3.png", name: "Partner 3" },
  { logo: "https://i.ibb.co/p6kd7g77/4.png", name: "Partner 4" },
  { logo: "https://i.ibb.co/CKYPm8d0/5.png", name: "Partner 5" },
  { logo: "https://i.ibb.co/6cdcZwDF/6.png", name: "Partner 6" },
  { logo: "https://i.ibb.co/FPTd6mG/7.png", name: "Partner 7" },
  { logo: "https://i.ibb.co/HfHZZHyT/8.png", name: "Partner 8" },
  { logo: "https://i.ibb.co/XrdFf7z9/9.png", name: "Partner 9" },
  { logo: "https://i.ibb.co/BH1BwPyd/10.png", name: "Partner 10" },
  { logo: "https://i.ibb.co/hxdfZtjj/11.png", name: "Partner 11" },
  { logo: "https://i.ibb.co/xSG25QrQ/12.png", name: "Partner 12" },
  { logo: "https://i.ibb.co/XfZnt1Cy/13.png", name: "Partner 13" },
  { logo: "https://i.ibb.co/zTNYVmYm/14.png", name: "Partner 14" },
  { logo: "https://i.ibb.co/TqkmDYCV/15.png", name: "Partner 15" },
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
    maxWidth: "180px",
    opacity: 1,
    filter: "none", // 🔥 هنا الحل
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },
};
