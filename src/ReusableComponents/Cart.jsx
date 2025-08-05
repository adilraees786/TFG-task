
import React from 'react';
import { useCartStore } from '../Zustand/CartStore';
import Button from '../ReusableComponents/Button';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const subtotal = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div className="w-full mx-auto py-8 min-h-96 md:px-16 lg:px-24">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow p-4 rounded-xl flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item?.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain rounded"
                />
                <div>
                  <h2 className="font-medium">Title: {item.title}</h2>
                  <p className="text-sm text-gray-600">Price: ${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button onClick={() => decreaseQuantity(item.id)}>-</Button>
                    <span className="px-3 w-6 text-center">{item.quantity}</span>
                    <Button onClick={() => increaseQuantity(item.id)}>+</Button>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 hover:bg-red-600"
              >
                Remove
              </Button>
            </div>
          ))}

          {/* Subtotal */}
          <div className="flex justify-between items-center mt-6 text-lg font-medium border-t pt-4">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <Button onClick={clearCart} className="mt-4 bg-red-600 hover:bg-red-700">
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;

