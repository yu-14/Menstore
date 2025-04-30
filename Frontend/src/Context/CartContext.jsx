import React, { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product, size, color) => {
    const existingItem = cartItems.find(
      (item) => item.id === product.id && item.size === size && item.color === color
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, size, color, quantity: 1 }]);
    }
    setCartCount(cartCount + 1);
  };

  const removeFromCart = (productId, size, color) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.id === productId && item.size === size && item.color === color)
    );
    setCartItems(updatedCart);
    setCartCount(updatedCart.length);
  };

  const changeQuantity = (productId, size, color, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId && item.size === size && item.color === color
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };

  const value = { cartItems, addToCart, removeFromCart, changeQuantity, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
