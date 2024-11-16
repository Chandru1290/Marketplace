import React, { useState } from 'react';


export function AddProduct({onAddProduct}) {
 
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [itemDescription, setItemDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      itemName,
      itemImage: itemImage ? URL.createObjectURL(itemImage) : '',
      itemDescription,
      amount,
    };


    // Save to local storage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    storedProducts.push(newProduct);
    localStorage.setItem('products', JSON.stringify(storedProducts));

    // Pass new product to parent
    onAddProduct(newProduct);

    // Clear form fields
    setItemName('');
    setItemImage(null);
    setItemDescription('');
    setAmount('');
  };

  return (
    <div className="mb-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <label className="block mb-4 text-gray-700">
            Item Name:
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </label>
          <label className="block mb-4 text-gray-700">
            Image:
            <input
              type="file"
              onChange={(e) => setItemImage(e.target.files[0])}
              required
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </label>
          <label className="block mb-4 text-gray-700">
            Description:
            <textarea
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </label>
          <label className="block mb-4 text-gray-700">
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
