
import { create } from 'zustand';

export const usePriceStore = create((set, get) => ({
  prices: {
    1: { value: 10.99, currency_code: 'USD' },
    2: { value: 20.49, currency_code: 'USD' },
    3: { value: 15.00, currency_code: 'USD' },
    
  },

  getProductDetails: async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    const product = await res.json();


    const localPrice = get().prices[id] || {
      value: product.price,
      currency_code: 'USD',
    };

    return {
      ...product,
      current_price: localPrice,
    };
  },

  updatePrice: (id, newPrice) => {
    set((state) => ({
      prices: {
        ...state.prices,
        [id]: {
          value: newPrice,
          currency_code: 'USD',
        },
      },
    }));
  },
}));
