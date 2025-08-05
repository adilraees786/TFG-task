
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../ReusableComponents/Button';
import { usePriceStore } from '../Zustand/pricestore';
import { useCartStore } from '../Zustand/CartStore';

const CartDetail = () => {
  const { state } = useLocation();
  const initialProduct = state?.product;

  const { getProductDetails, updatePrice } = usePriceStore();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (initialProduct?.id) {
          const data = await getProductDetails(initialProduct.id);
          setProduct(data);
        } else {
          setError('No product found.');
        }
      } catch (err) {
        setError('Product fetch failed.');
      }
    };

    loadProduct();
  }, [initialProduct, getProductDetails]);

  const handlePriceUpdate = () => {
    if (product && newPrice) {
      const updatedPrice = parseFloat(newPrice);
      updatePrice(product.id, updatedPrice);
      setProduct({
        ...product,
        current_price: {
          ...product.current_price,
          value: updatedPrice,
        },
      });
      setNewPrice('');
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        price: product.current_price.value, 
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Details</h1>

      {error && <p className="text-center text-red-600 mb-4">{error}</p>}

      {product && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 rounded-lg shadow-lg">
        
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="rounded-lg w-full max-h-96 object-contain"
            />
          </div>

       
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{product.title}</h2>
            <p className="text-gray-700 text-sm">{product.description}</p>
            <p className="text-lg font-medium text-gray-800">
              Product ID: {product.id}
            </p>
            <p className="text-xl font-bold text-blue-600">
              Price: ${product.current_price.value} ({product.current_price.currency_code})
            </p>

        
            <Button onClick={handleAddToCart}>Add to Cart</Button>

            {/* Update Price Section */}
            <div className="pt-4 border-t mt-6">
              <h3 className="text-lg font-semibold mb-2">Update Price</h3>
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                 
                  placeholder="New Price"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="border px-3 py-2 rounded w-32"
                />
                <Button  onClick={handlePriceUpdate}>Update Price</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetail;

