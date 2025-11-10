const API_BASE_URL = 'http://localhost:5000/api';

const testEndpoint = async (name, url) => {
  try {
    console.log(`\n🔍 Test ${name}...`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ ${name} - OK`);
      
      // Afficher quelques détails sur les données
      if (name === 'Lunch API') {
        console.log(`   📊 ${data.data.categories?.length || 0} catégories trouvées`);
        const totalProducts = data.data.categories?.reduce((total, cat) => {
          return total + (cat.products?.length || 0) + (cat.plateaux?.length || 0);
        }, 0);
        console.log(`   🍽️ ${totalProducts} produits/plateaux au total`);
      } else if (name === 'Brunch API') {
        console.log(`   📊 ${data.data.categories?.length || 0} catégories trouvées`);
        const totalProducts = data.data.categories?.reduce((total, cat) => {
          return total + (cat.products?.length || 0) + (cat.plateaux?.length || 0);
        }, 0);
        console.log(`   🥐 ${totalProducts} produits/plateaux au total`);
      } else if (name === 'Reveillon API') {
        console.log(`   📊 ${data.data.plateaux?.length || 0} plateaux trouvés`);
      }
      
    } else {
      console.log(`❌ ${name} - Réponse non réussie:`, data.message);
    }
    
  } catch (error) {
    console.log(`❌ ${name} - Erreur: ${error.message}`);
  }
};

const testAllAPIs = async () => {
  console.log('🚀 Test des API du frontend...\n');
  
  const tests = [
    ['Lunch API', `${API_BASE_URL}/lunch`],
    ['Brunch API', `${API_BASE_URL}/brunch`],
    ['Reveillon API', `${API_BASE_URL}/reveillon`],
  ];
  
  for (const [name, url] of tests) {
    await testEndpoint(name, url);
  }
  
  console.log('\n📊 RÉSUMÉ:');
  console.log('✅ Tous les endpoints sont testés');
  console.log('💡 Si tous sont en vert, vos pages frontend devraient fonctionner correctement !');
  console.log('\n🌐 URLs à tester dans le navigateur:');
  console.log('   - http://localhost:5173/lunch');
  console.log('   - http://localhost:5173/brunch'); 
  console.log('   - http://localhost:5173/ (pour voir le composant réveillon)');
};

// Exécuter les tests
testAllAPIs().catch(console.error);