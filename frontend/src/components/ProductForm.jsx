import { useState } from "react";

function ProductForm({ onSave }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // نرسل الرقم فقط للـ backend
    onSave({ name, price });
    setName("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom du produit:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثال: Croissant"
          required
        />
      </div>

      <div>
        <label>Prix:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="مثال: 15"
          required
        />
        <span> &euro;</span>
      </div>

      <button type="submit">Ajouter</button>
    </form>
  );
}

export default ProductForm;
