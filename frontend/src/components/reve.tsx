<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Carte Spéciale Réveillon</title>
<style>
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f7f3eb;
    margin: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    margin-bottom: 5px;
  }

  p.subtitle {
    margin-top: 0;
    margin-bottom: 40px;
    color: #7a6f5c;
    font-size: 14px;
  }

  .menu-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .menu-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    overflow: hidden;
    width: 280px;
    text-align: center;
    transition: transform 0.2s;
  }

  .menu-card:hover {
    transform: translateY(-5px);
  }

  .menu-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  .price-tag {
    position: relative;
    bottom: 40px;
    display: inline-block;
    background: rgba(255, 255, 255, 0.85);
    padding: 5px 15px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 16px;
  }

  .menu-card h2 {
    margin: 15px 0 10px 0;
  }

  .items-list {
    list-style: none;
    padding: 0 20px 20px 20px;
    margin: 0;
  }

  .items-list li {
    background: #f7f3eb;
    margin: 5px 0;
    padding: 8px;
    border-radius: 8px;
  }

  .order-btn {
    display: block;
    width: calc(100% - 40px);
    margin: 0 auto 20px auto;
    padding: 10px 0;
    background: linear-gradient(90deg, #c5b16f, #a89050);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
  }

  .order-btn:hover {
    opacity: 0.9;
  }

  .premium {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #a89050;
    color: white;
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 6px;
  }

  .card-img-container {
    position: relative;
  }
</style>
</head>
<body>

<h1>Carte Spéciale Réveillon</h1>
<p class="subtitle">Pour des fêtes gourmandes réussies</p>

<div class="menu-container">

  <div class="menu-card">
    <div class="card-img-container">
      <img src="plateau1.jpg" alt="Plateau Signature">
      <span class="premium">Premium</span>
      <span class="price-tag">70 € par plateau</span>
    </div>
    <h2>Plateau Signature</h2>
    <ul class="items-list">
      <li>Burger Brioché</li>
      <li>Ciabatta Mozza</li>
      <li>Natte Viennoise</li>
      <li>Mauricette Thon</li>
      <li>Pepper poulet</li>
    </ul>
    <a href="#" class="order-btn">Commander</a>
  </div>

  <div class="menu-card">
    <div class="card-img-container">
      <img src="plateau2.jpg" alt="Plateau Prestige">
      <span class="premium">Premium</span>
      <span class="price-tag">80 € par plateau</span>
    </div>
    <h2>Plateau Prestige</h2>
    <ul class="items-list">
      <li>Navette Foie gras</li>
      <li>Burger Bretzel</li>
      <li>Black Beef</li>
      <li>Navette au Thon</li>
      <li>Baguette Alsacienne aux Graines</li>
    </ul>
    <a href="#" class="order-btn">Commander</a>
  </div>

</div>

</body>
</html>
