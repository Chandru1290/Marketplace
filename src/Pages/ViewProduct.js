// ViewProduct.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function ViewProduct() {
  const { productId } = useParams();  // Retrieve productId from URL
  const navigate = useNavigate();
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products[productId];  // Access product by productId

  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(product.amount);

  useEffect(() => {
    setTotalAmount(product.amount * quantity);  // Update total amount based on quantity
  }, [quantity, product.amount]);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleBuyNow = () => {
    navigate('/payment', { state: { totalAmount } });
  };
  

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <img src={product.itemImage} alt={product.itemName} className="w-full h-64 object-cover rounded-lg mb-6" />
      <h2 className="text-2xl font-semibold mb-2">{product.itemName}</h2>
      <p className="text-gray-600 mb-4">{product.itemDescription}</p>
      <p className="text-lg font-medium mb-4">
        <strong>Price:</strong> ${product.amount}
      </p>
      <div className="flex items-center mb-4">
        <label className="mr-2 font-medium">Quantity:</label>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={handleQuantityChange}
          className="border rounded-md px-2 py-1 w-20 text-center focus:outline-none focus:border-blue-400"
        />
      </div>
      <p className="text-lg font-semibold mb-6">
        <strong>Total Amount:</strong> ${totalAmount}
      </p>
      <button
        onClick={handleBuyNow}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md"
      >
        Buy Now
      </button>
    </div>
  );
}
