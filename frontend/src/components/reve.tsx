import React from "react";

const CarteReveillon: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f7f3eb', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Carte Spéciale Réveillon</h1>
      <p style={{ marginTop: 0, marginBottom: '40px', color: '#7a6f5c', fontSize: '14px' }}>Pour des fêtes gourmandes réussies</p>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* Plateau Signature */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '280px', textAlign: 'center', marginBottom: '20px', position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <img src="/plateau1.jpg" alt="Plateau Signature" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#a89050', color: 'white', padding: '4px 8px', fontSize: '12px', borderRadius: '6px' }}>Premium</span>
            <span style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.85)', padding: '5px 15px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}>70 € par plateau</span>
          </div>
          <h2>Plateau Signature</h2>
          <ul style={{ listStyle: 'none', padding: '0 20px 20px 20px', margin: 0 }}>
            <li style={{ background: '#f7f3eb', margin: '5px 0', padding: '8px', borderRadius: '8px' }}>Burger Brioché</li>
            <li style={{ background: '#f7f3eb', margin: '5px 0', padding: '8px', borderRadius: '8px' }}>Ciabatta Mozza</li>
            <li style={{ background: '#f7f3eb', margin: '5px 0', padding: '8px', borderRadius: '8px' }}>Natte Viennoise</li>
            <li style={{ background: '#f7f3eb', margin: '5px 0', padding: '8px', borderRadius: '8px' }}>Mauricette Thon</li>
            <li style={{ background: '#f7f3eb', margin: '5px 0', padding: '8px', borderRadius: '8px' }}>Pepper poulet</li>
          </ul>
          <a href="#" style={{ display: 'block', width: 'calc(100% - 40px)', margin: '0 auto 20px auto', padding: '10px 0', background: 'linear-gradient(90deg, #c5b16f, #a89050)', color: 'white', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Commander</a>
        </div>

        {/* Plateau Prestige */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '280px', textAlign: 'center', marginBottom: '20px', position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <img src="/plateau2.jpg" alt="Plateau Prestige" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#a89050', color: 'white', padding: '4px 8px', fontSize: '12px', borderRadius: '6px' }}>Premium</span>
            <span style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.85)', padding: '5px 15px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}>80 € par plateau</span>
          </div>
          <h2>Plateau Prestige</h2>
          <ul style={{ listStyle: 'none', padding: '0 20px 20px 20px', margin: 0 }}>
            <li style={{ background: '#f7f3eb', margin: '5px 0', padding: '8px', borderRadius: '8px' }}>Navette Foie gras</li>
            <li style={{ background: '#f7f3eb', margin: '5px 0', padding: '8px', borderRadius: '8px' }}>Burger Bretzel</li>
            <li style={{ background: '#f7f3eb', margin: '5px 0', padding: '8px', borderRadius: '8px' }}>Black Beef</li>
            <li style={{ background: '#f7f3eb', margin: '5px 0', padding: '8px', borderRadius: '8px' }}>Navette au Thon</li>
            <li style={{ background: '#f7f3eb', margin: '5px 0', padding: '8px', borderRadius: '8px' }}>Baguette Alsacienne aux Graines</li>
          </ul>
          <a href="#" style={{ display: 'block', width: 'calc(100% - 40px)', margin: '0 auto 20px auto', padding: '10px 0', background: 'linear-gradient(90deg, #c5b16f, #a89050)', color: 'white', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Commander</a>
        </div>

      </div>
    </div>
  );
};

export default CarteReveillon;
