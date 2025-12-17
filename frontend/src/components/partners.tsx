import React from "react";
import "./Partners.css";

const partners = [
  { id: 1, logo: "/logos/logo1.png", name: "Partner 1" },
  { id: 2, logo: "/logos/logo2.png", name: "Partner 2" },
  { id: 3, logo: "/logos/logo3.png", name: "Partner 3" },
  { id: 4, logo: "/logos/logo4.png", name: "Partner 4" },
  { id: 5, logo: "/logos/logo5.png", name: "Partner 5" },
  { id: 6, logo: "/logos/logo6.png", name: "Partner 6" },
];

const Partners: React.FC = () => {
  return (
    <section className="partners">
      <h2>Nos partenaires</h2>

      <div className="slider">
        <div className="slide-track">
          {[...partners, ...partners].map((p, index) => (
            <div className="slide" key={index}>
              <img src={p.logo} alt={p.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
