// Données complètes extraites des composants React pour migration vers MongoDB

export const lunchData = {
  categories: [
    {
      id: "mignardises",
      name: "Mignardises Salées",
      icon: "ChefHat",
      description: "Plateau de 30 pièces - 5 sortes max par plateau à 70€ (hors mignardises foie gras et saumon à 80€)",
      isActive: true,
      sortOrder: 1,
      products: [
        {
          name: "Mini burger bœuf",
          description: "Pain maison, steak haché de bœuf, cheddar, sauce burger, crudités, oignons confits",
          price: "70€",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 1
        },
        {
          name: "Mini burger bœuf noir",
          description: "Pain maison, steak haché de bœuf, cheddar, sauce burger, crudités, oignons confits",
          price: "70€",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 2
        },
        {
          name: "Mini bagel saumon",
          description: "Pain maison, saumon fumé, fromage frais, salade, concombre",
          price: "80€",
          isPremium: true,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 3
        },
        {
          name: "Mini Pepper burger",
          description: "Pain brioché maison, poulet pané, sauce maison, cheddar, poivrons confits, crudités",
          price: "70€",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 4
        },
        {
          name: "Mini Burger chèvre",
          description: "Pain bretzel maison, fromage de chèvre pané, poivrons confits, sauce moutarde miel, salade",
          price: "70€",
          isPremium: false,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 5
        },
        {
          name: "Mini bagel tenders",
          description: "Pain maison, poulet pané, sauce yobi, crudités, cheddar",
          price: "70€",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 6
        },
        {
          name: "Mini navettes saumon",
          description: "Pain maison, saumon fumé, fromage frais aneth, concombre",
          price: "80€",
          isPremium: true,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 7
        },
        {
          name: "Mini navettes thon",
          description: "Pain maison, thon, mayonnaise aux herbes, crudités",
          price: "70€",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 8
        },
        {
          name: "Mini kebab bœuf/volaille",
          description: "Pain maison, mixte de viande kebab, sauce kebab, crudités, oignons rouges, feta",
          price: "70€",
          isPremium: false,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 9
        },
        {
          name: "Mini sandwich légumes burrata",
          description: "Pain moelleux, légumes cuits à huile d'olive, burrata, roquette, pesto maison",
          price: "70€",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 10
        },
        {
          name: "Mini navettes foie gras",
          description: "Pain maison, foie gras, confiture de saison",
          price: "80€",
          isPremium: true,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 11
        },
        {
          name: "Mini long Fish",
          description: "Pain maison, poisson pané, sauce Fish maison, cheddar, salade",
          price: "70€",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 12
        },
        {
          name: "Mini hot dog",
          description: "Pain maison, saucisse, moutarde miel, cornichons, oignons frits, ketchup",
          price: "70€",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 13
        },
        {
          name: "Mini wrap tenders",
          description: "Tortilla, poulet pané, sauce miel, cheddar, crudités",
          price: "70€",
          isPremium: false,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 14
        },
        {
          name: "Mini ciabatta tomates mozza",
          description: "Pain maison fariné, mozzarella, pesto maison, tomates cerise confites à l'huile d'olive, roquette",
          price: "70€",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 15
        },
        {
          name: "Mauricette saumon",
          description: "Pain bretzel maison, saumon, fromage frais, crudités, concombre",
          price: "80€",
          isPremium: true,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 16
        },
        {
          name: "Mauricette thon",
          description: "Pain bretzel maison, thon, mayonnaise aux herbes, crudités",
          price: "70€",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 17
        },
        {
          name: "Mini tacos poulet",
          description: "Tortilla, poulet crème, sauce fromagère, cheddar",
          price: "70€",
          isPremium: false,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 18
        },
        {
          name: "Long Chicken Poulet",
          description: "Poulet pané, salade, cheddar, sauce tartare",
          price: "70€",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 19
        },
        {
          name: "Baguette Alsacienne aux graines",
          description: "Fromage Frais, Jeunes Pousses d'Epinards, Saumon Fumé, Choux Rouge, Guacamole",
          price: "80€",
          isPremium: true,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 20
        },
        {
          name: "Natte Viennoise",
          description: "Salade Frisée, Poulet Crème, Champignons, Parmesan",
          price: "70€",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 21
        },
        {
          name: "Burger Brioché",
          description: "Boeuf éfilloché, Salade Frisée, Oignons Frits, Carottes, Comté, Sauce Poivre",
          price: "70€",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 22
        }
      ]
    },
    {
      id: "plateaux",
      name: "Plateaux Composés",
      icon: "Utensils",
      description: "Plateaux prêts à déguster",
      isActive: true,
      sortOrder: 2,
      products: [
        {
          name: "Plateau dégustatif",
          description: "4 navettes thon, 4 bagels poulets, 4 wraps tenders, 4 burger bœuf, 4 hots dog",
          price: "50€",
          quantity: "20 pièces",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 1
        },
        {
          name: "Plateau signature",
          description: "6 navettes thon, 6 bagels poulets, 6 wraps tenders, 6 burgers bœuf, 6 hots dog",
          price: "70€",
          quantity: "30 pièces",
          isPremium: false,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 2
        }
      ]
    },
    {
      id: "verrines",
      name: "Verrines Salées",
      icon: "Wine",
      description: "À partir de 10 pièces",
      isActive: true,
      sortOrder: 3,
      products: [
        {
          name: "Verrine salade César",
          description: "Salade, tomate cerise, poulet pané, croûtons, parmesan, sauce César",
          price: "35€",
          quantity: "à partir de 10 pièces",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 1
        },
        {
          name: "Verrine burratina",
          description: "Burratina, roquettes, tomate cerise, basilic, parmesan, crouton basilic",
          price: "45€",
          quantity: "à partir de 10 pièces",
          isPremium: true,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 2
        },
        {
          name: "Verrine tempura",
          description: "Crevette avec sa chapelure, sauce aigre douce",
          price: "30€",
          quantity: "à partir de 10 pièces",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 3
        },
        {
          name: "Verrine dynamite chicken",
          description: "Poulet pané, sauce dynamite secrète, citron vert",
          price: "35€",
          quantity: "à partir de 10 pièces",
          isPremium: false,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 4
        },
        {
          name: "Verrine tomate mozza",
          description: "Mini mozzarella, tomate cerise, basilic, huile d'olive, pain grillé",
          price: "35€",
          quantity: "à partir de 10 pièces",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 5
        }
      ]
    },
    {
      id: "box-salees",
      name: "Box Salées",
      icon: "Package",
      description: "Box prêtes à emporter",
      isActive: true,
      sortOrder: 4,
      products: [
        {
          name: "Box 24 Nems crevettes",
          description: "Feuille de nems, crevettes, carotte, champignon + sauce nems",
          price: "50€",
          quantity: "24 pièces",
          isPremium: true,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 1
        },
        {
          name: "Box 24 Nems poulet",
          description: "Feuille de nems, poulet, carotte, champignon + sauces nems",
          price: "45€",
          quantity: "24 pièces",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 2
        }
      ]
    },
    {
      id: "box-club",
      name: "Box Sandwich Club",
      icon: "Package",
      description: "Brochettes gourmandes",
      isActive: true,
      sortOrder: 5,
      products: [
        {
          name: "Box 24 mini brochettes poulet",
          description: "Brochettes de poulet, curry, tandoori + sauce barbecue, sauce yobi",
          price: "40€",
          quantity: "24 pièces",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 1
        }
      ]
    },
    {
      id: "marocaine",
      name: "Gastronomie Marocaine",
      icon: "Star",
      description: "Spécialités traditionnelles",
      isActive: true,
      sortOrder: 6,
      products: [
        {
          name: "Box 10 mini pastilla poulet",
          description: "Pastilla poulet, amandes grillées",
          price: "45€",
          quantity: "10 pièces",
          isPremium: false,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 1
        },
        {
          name: "Box 10 mini pastilla fruits de mer",
          description: "Pastilla crevette, cabilaud, calamar",
          price: "55€",
          quantity: "10 pièces",
          isPremium: true,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 2
        }
      ]
    }
  ]
};

export const brunchData = {
  categories: [
    {
      id: "formules-brunch",
      name: "Formules Brunch",
      icon: "Coffee",
      description: "Brunch complets pour tous",
      isActive: true,
      sortOrder: 1,
      products: [
        {
          name: "Brunch duo",
          description: "Pains - fromages & charcuterie - œufs brouillés - 4 minis viennoiseries - 8 minis pancakes ou crêpes - topping : nutella, confiture, beurre, sirop d'érable - panier de fruits de saison sauf allergènes - légumes à croquer - assortiment de fruits secs - 2x jus d'oranges pressé",
          price: "60€",
          quantity: "2 personnes",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 1
        },
        {
          name: "Brunch trio",
          description: "Pains - fromages & charcuterie - œufs brouillés - 6 minis viennoiseries - 12 minis pancakes ou crêpes - topping : nutella, confiture, beurre, sirop d'érable - panier de fruits de saison sauf allergènes - légumes à croquer - assortiment de fruits secs - 3x jus d'oranges pressé",
          price: "90€",
          quantity: "3 personnes",
          isPremium: false,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 2
        },
        {
          name: "Brunch 4 personnes",
          description: "Pains - fromages & charcuterie - œufs brouillés - 8 minis viennoiseries - 16 minis pancakes ou crêpes - topping : nutella, confiture, beurre, sirop d'érable - panier de fruits de saison sauf allergènes - légumes à croquer - assortiment de fruits secs - 4x jus d'oranges pressé",
          price: "120€",
          quantity: "4 personnes",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 3
        },
        {
          name: "Brunch 5 personnes",
          description: "Pains - fromages & charcuterie - œufs brouillés - 10 minis viennoiseries - 20 minis pancakes ou crêpes - topping : nutella, confiture, beurre, sirop d'érable - panier de fruits de saison sauf allergènes - légumes à croquer - assortiment de fruits secs - 5x jus d'oranges pressé",
          price: "150€",
          quantity: "5 personnes",
          isPremium: true,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 4
        }
      ]
    },
    {
      id: "extra-brunch",
      name: "Extra Brunch",
      icon: "Package",
      description: "Compléments gourmands",
      isActive: true,
      sortOrder: 2,
      products: [
        {
          name: "Egg muffin",
          description: "Pain muffin maison, cheddar, œufs (supplément bacon 5€)",
          price: "5€",
          quantity: "À l'unité",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 1
        },
        {
          name: "Pancakes Américain",
          description: "Pancakes américain à la vanille, fruits rouges, sauce caramel & Nutella",
          price: "30€",
          quantity: "à partir de 12 pièces",
          isPremium: false,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 2
        },
        {
          name: "Brioche perdue fondante",
          description: "Brioche perdue fondante à la vanille, fruits rouges, sauce caramel & Nutella",
          price: "35€",
          quantity: "à partir de 12 pièces",
          isPremium: true,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 3
        },
        {
          name: "Plateau 12 viennoiseries",
          description: "croissants nature, pains choco, escargots raisin/choco",
          price: "24€",
          quantity: "12 pièces",
          isPremium: false,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 4
        }
      ]
    },
    {
      id: "charcuterie-fromages",
      name: "Charcuterie & Fromages",
      icon: "Utensils",
      description: "Plateaux accompagnement",
      isActive: true,
      sortOrder: 3,
      products: [
        {
          name: "Plateau 8/10 personnes",
          description: "Charcuterie, fromages et légumes à croquer",
          price: "89€",
          quantity: "8-10 personnes",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 1
        },
        {
          name: "Plateau 10/15 personnes",
          description: "Charcuterie, fromages et légumes à croquer",
          price: "99€",
          quantity: "10-15 personnes",
          isPremium: false,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 2
        },
        {
          name: "Plateau 15/20 personnes",
          description: "Charcuterie, fromages et légumes à croquer",
          price: "119€",
          quantity: "15-20 personnes",
          isPremium: true,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 3
        }
      ]
    },
    {
      id: "planche-fruits",
      name: "Planches à Fruits",
      icon: "Apple",
      description: "Fruits frais de saison",
      isActive: true,
      sortOrder: 4,
      products: [
        {
          name: "Planche fruits 8/10 personnes",
          description: "Fruits frais de saison présentés avec soin",
          price: "60€",
          quantity: "8-10 personnes",
          isPremium: false,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 1
        },
        {
          name: "Planche fruits 10/15 personnes",
          description: "Fruits frais de saison présentés avec soin",
          price: "70€",
          quantity: "10-15 personnes",
          isPremium: false,
          image: "/images/card1.jpg",
          isActive: true,
          sortOrder: 2
        },
        {
          name: "Planche fruits 15/20 personnes",
          description: "Fruits frais de saison présentés avec soin",
          price: "80€",
          quantity: "15-20 personnes",
          isPremium: false,
          image: "/images/card2.jpg",
          isActive: true,
          sortOrder: 3
        }
      ]
    }
  ]
};

export const reveillonData = {
  plateaux: [
    {
      title: "Plateau Signature",
      price: "70 €",
      image: "/images/card1.jpg",
      imageAlt: "Menu Réveillon Classique - Assortiment de mignardises orientales",
      items: [
        "Burger Brioché",
        "Natte Viennoise",
        "Ciabatta Mozza",
        "Mauricette Thon"
      ],
      lastItem: "Pepper poulet",
      isActive: true,
      sortOrder: 1
    },
    {
      title: "Plateau Prestige",
      price: "80 €",
      image: "/images/card2.jpg",
      imageAlt: "Menu Réveillon Prestige - Buffet oriental complet",
      items: [
        "Navette Foie gras",
        "Black Beef",
        "Burger Bretzel",
        "Navette au Thon"
      ],
      lastItem: "Baguette Alsacienne aux Graines",
      isActive: true,
      sortOrder: 2
    }
  ],
  seasonStartDate: new Date("2024-12-01"),
  seasonEndDate: new Date("2025-01-15")
};