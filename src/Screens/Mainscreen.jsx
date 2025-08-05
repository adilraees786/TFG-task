
import React, { useEffect } from 'react';
import Card from '../ReusableComponents/Cards';
import { GetCategories, getProducts } from '../Zustand/Api';
import { useNavigate } from 'react-router-dom';
import Button from '../ReusableComponents/Button';
import { useCartStore } from '../Zustand/CartStore';
import { useCategoryStore } from '../Zustand/CategoryStore';

const Mainscreen = () => {
  const navigate = useNavigate();
  const { allCategories, isLoading, error, fetchCategorieData } = GetCategories();
  const { Products, fetchProductData } = getProducts();

  const { addToCart } = useCartStore();
  const { selectedCategory, setSelectedCategory } = useCategoryStore();

  useEffect(() => {
    fetchCategorieData();
    fetchProductData();
  }, []);

  const filteredProducts = selectedCategory
    ? Products.filter((item) => item.category === selectedCategory)
    : Products;

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className="w-full px-4 py-6">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {/* Sidebar */}
          <div className="col-span-1">
            <h1
              onClick={() => setSelectedCategory(null)}
              className={`font-medium cursor-pointer px-4 py-2 rounded-xl mb-2 ${
                selectedCategory === null ? 'bg-blue-500 text-white' : ''
              }`}
            >
              All
            </h1>
            {Array.isArray(allCategories) && allCategories.length > 0 ? (
              allCategories.map((category, index) => (
                <h2
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`font-medium cursor-pointer px-4 py-2 rounded-xl mb-2 ${
                    selectedCategory === category ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  {category}
                </h2>
              ))
            ) : (
              <p className="text-sm text-gray-500">No categories found.</p>
            )}
          </div>

          {/* Product Grid */}
          <div className="col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div
                  key={item?.id}
                  className="bg-white rounded-xl shadow flex flex-col justify-between hover:shadow-lg transition"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => navigate('/cart-details', { state: { product: item } })}
                  >
                    <Card
                      image={item?.image}
                      title={item?.title}
                      price={item?.price}
                    />
                  </div>
                  <div className="py-2 flex justify-center items-center">
                    <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No products found for this category.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mainscreen;
