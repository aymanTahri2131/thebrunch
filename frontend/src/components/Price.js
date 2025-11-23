// components/Price.js
export default function Price({ amount }) {
  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);

  return <span>{formattedPrice}</span>;
}
