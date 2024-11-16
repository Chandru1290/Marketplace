// Home.js
import React, { useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);
  }, []);

  const layout = products.map((_, index) => ({
    i: index.toString(),
    x: (index % 3) * 2,
    y: Math.floor(index / 3) * 2,
    w: 2,
    h: 3,
  }));

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Product Listings</h2>
      {products.length > 0 ? (
        <GridLayout
          className="layout"
          layout={layout}
          cols={6}
          rowHeight={100}
          width={1200}
          isDraggable={false}
          isResizable={false}
        >
          {products.map((product, index) => (
            <div
              key={index}
              data-grid={layout[index]}
              className="flex flex-col items-center border border-gray-300 rounded-lg p-4 bg-white shadow-lg w-52 cursor-pointer"
              onClick={() => handleProductClick(index)} // Pass index as productId
            >
              <img src={product.itemImage} alt={product.itemName} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.itemName}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.itemDescription}</p>
              <p className="font-bold text-gray-700">Amount: ${product.amount}</p>
            </div>
          ))}
        </GridLayout>
      ) : (
        <p className="text-center text-gray-500">
          No products available. Please add some products from the profile page.
        </p>
      )}
    </div>
  );
}
