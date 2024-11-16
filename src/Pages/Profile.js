import React, { useState, useEffect } from 'react';
import { AddProduct } from './AddProduct';
import { useNavigate } from 'react-router-dom';


export function Profile({ setIsAuthenticated }) {
  const [productList, setProductList] = useState([]);
  const [isAddProductVisible, setIsAddProductVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempProduct, setTempProduct] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Profile states
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [name, setName] = useState(localStorage.getItem('name'));
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage'));
  const [profile, setProfile] = useState(localStorage.getItem('profile'));
  const [description, setDescription] = useState(localStorage.getItem('description'));
  const [address, setAddress] = useState(localStorage.getItem('address'));

  const [tempUsername, setTempUsername] = useState(username);
  const [tempName, setTempName] = useState(name);
  const [tempProfileImage, setTempProfileImage] = useState(profileImage);
  const [tempProfile, setTempProfile] = useState(profile);
  const [tempDescription, setTempDescription] = useState(description);
  const [tempAddress, setTempAddress] = useState(address);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProductList(storedProducts);
  }, []);

  const handleAddProduct = (newProduct) => {
    const updatedList = [...productList, newProduct];
    setProductList(updatedList);
    localStorage.setItem('products', JSON.stringify(updatedList));
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    setUsername(tempUsername);
    setName(tempName);
    setProfileImage(tempProfileImage);
    setProfile(tempProfile);
    setDescription(tempDescription);
    setAddress(tempAddress);

    localStorage.setItem('username', tempUsername);
    localStorage.setItem('name', tempName);
    localStorage.setItem('profileImage', tempProfileImage);
    localStorage.setItem('profile', tempProfile);
    localStorage.setItem('description', tempDescription);
    localStorage.setItem('address', tempAddress);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempProfileImage(imageUrl);
    }
  };

  const handleDeleteProduct = (index) => {
    const updatedList = productList.filter((_, i) => i !== index);
    setProductList(updatedList);
    localStorage.setItem('products', JSON.stringify(updatedList));
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar area with logout button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-1 overflow-y-auto">
        {/* Profile Sidebar */}
        <div className="w-1/4 bg-gray-200 p-6 shadow-lg">
          {isEditingProfile ? (
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
              <input type="file" onChange={handleImageChange} className="mb-4" />
              {tempProfileImage && <img src={tempProfileImage} alt="Profile" className="rounded-full w-32 h-32 mb-4" />}
              <label className="text-gray-700 font-medium mt-2">Name</label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md mb-2 bg-gray-50"
              />
              <label className="text-gray-700 font-medium mt-2">Username</label>
              <input
                type="text"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md mb-2 bg-gray-50"
              />
              <label className="text-gray-700 font-medium mt-2">Profile</label>
              <input
                type="text"
                value={tempProfile}
                onChange={(e) => setTempProfile(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md mb-2 bg-gray-50"
              />
              <label className="text-gray-700 font-medium mt-2">Description</label>
              <textarea
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md mb-2 bg-gray-50"
              />
              <label className="text-gray-700 font-medium mt-2">Address</label>
              <input
                type="text"
                value={tempAddress}
                onChange={(e) => setTempAddress(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md mb-2 bg-gray-50"
              />
              <button onClick={handleSaveProfile} className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600">
                Save
              </button>
            </div>
          ) : (
            <div className="text-center">
              <img src={profileImage} alt="Profile" className="rounded-full w-32 h-32 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">{name}</h2>
              <p className="mb-2 text-gray-600"><strong>Username:</strong> {username}</p>
              <p className="mb-2 text-gray-600"><strong>Profile:</strong> {profile}</p>
              <p className="mb-2 text-gray-600"><strong>Description:</strong> {description}</p>
              <p className="mb-2 text-gray-600"><strong>Address:</strong> {address}</p>
              <button onClick={handleEditProfile} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600">
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <button
            onClick={() => setIsAddProductVisible(!isAddProductVisible)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
          >
            {isAddProductVisible ? 'Cancel' : 'Add Item'}
          </button>

          {isAddProductVisible && <AddProduct onAddProduct={handleAddProduct} />}

          <h2 className="mt-6">Product List</h2>
          <div className="mt-6">
            {productList.map((product, index) => (
              <div key={index} className="flex items-center p-4 border-b border-gray-200">
                {editingIndex === index ? (
                  <div>
                    <input
                      type="text"
                      name="itemName"
                      value={tempProduct.itemName}
                      onChange={(e) => setTempProduct({ ...tempProduct, itemName: e.target.value })}
                      className="product-input"
                    />
                    <textarea
                      name="itemDescription"
                      value={tempProduct.itemDescription}
                      onChange={(e) => setTempProduct({ ...tempProduct, itemDescription: e.target.value })}
                      className="product-textarea"
                    />
                    <input
                      type="number"
                      name="amount"
                      value={tempProduct.amount}
                      onChange={(e) => setTempProduct({ ...tempProduct, amount: e.target.value })}
                      className="product-input"
                    />
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setTempProduct({ ...tempProduct, itemImage: URL.createObjectURL(file) });
                        }
                      }}
                      className="product-input"
                    />
                    <button
                      onClick={() => {
                        const updatedList = productList.map((product, i) =>
                          i === editingIndex ? tempProduct : product
                        );
                        setProductList(updatedList);
                        localStorage.setItem('products', JSON.stringify(updatedList));
                        setEditingIndex(null);
                        setTempProduct(null);
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <img src={product.itemImage} alt="Item" className="w-16 h-16 rounded-lg mr-4" />
                    <div>
                      <p className="text-lg font-medium">{product.itemName}</p>
                      <p className="text-gray-500">{product.itemDescription}</p>
                      <p className="text-blue-600 font-semibold">${product.amount}</p>
                      <button
                        onClick={() => {
                          setEditingIndex(index);
                          setTempProduct({ ...product });
                        }}
                        className="text-blue-500 underline hover:text-blue-700 mt-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(index)}
                        className="text-red-500 underline hover:text-red-700 ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
