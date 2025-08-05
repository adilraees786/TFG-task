

import React, { useState } from 'react';
import logo from '../../src/assets/images/logo.png';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../Zustand/CartStore';
import Button from '../ReusableComponents/Button';

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useCartStore();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [productId, setProductId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProductSearch = async () => {
    if (!productId) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!res.ok) throw new Error('Product not found');
      const data = await res.json();

      navigate('/cart-details', { state: { product: data } });
    } catch (err) {
      setError('Invalid product ID');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white sticky top-0 z-999 shadow">
      <div className="flex items-center gap-8 px-4 sm:px-6 lg:px-8 py-4">
        <a className="block text-teal-600" href="#">
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold">Store</h1>
            <img src={logo} className="w-20" alt="Store Logo" />
          </div>
        </a>

        <div className="flex-1 flex items-center justify-end md:justify-between gap-6">
      
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a className="text-gray-500 font-bold transition hover:text-gray-500/75" href="/dashboard">Home</a>
              </li>
              <li>
                <a className="text-gray-500 font-bold transition hover:text-gray-500/75" href="#">About</a>
              </li>
              <li>
                <a className="text-gray-500 font-bold transition hover:text-gray-500/75" href="#">Contact Us</a>
              </li>
            </ul>
          </nav>

          {/*  Product ID Search */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="border rounded px-8 py-2 w-full text-sm"
            />
            <Button onClick={handleProductSearch} disabled={loading}>
              {loading ? 'Loading...' : 'Fetch Product'}
            </Button>
          </div>

      
          <div className="relative" onClick={() => navigate('/cart')}>
            <FaShoppingCart size={30} className="text-gray-700 cursor-pointer" />
            {totalItems > 0 && (
              <span className="absolute -top-1 left-5 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex justify-center items-center">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </div>

   
      {error && (
        <div className="text-center text-red-600 text-sm mb-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default Header;
