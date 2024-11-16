import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('Seller');
  const [profileImage, setProfileImage] = useState(null);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Save user credentials and other details to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('name', name);
    localStorage.setItem('profile', profile);
    if (profileImage) {
      localStorage.setItem('profileImage', URL.createObjectURL(profileImage));
    }
    localStorage.setItem('description', description);
    localStorage.setItem('address', address);

    // Show success message
    setShowSuccess(true);

    // Navigate to login page after a delay
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/login');
    }, 2000); // 2-second delay
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSignUp} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Profile:
          <select
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Profile Image:
          <input
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
        >
          Sign Up
        </button>
      </form>
      {showSuccess && (
        <div className="mt-4 text-center text-green-600 font-semibold">
          Sign Up Successfully!
        </div>
      )}
    </div>
  );
}

export default SignUp;
