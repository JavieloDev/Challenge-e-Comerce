import { cartSignal } from './cart.state';
import { CartItem } from './cart.state';

// Acción para agregar un producto al carrito
export const addToCart = (newItem: CartItem) => {
  cartSignal.update(currentItems => {
    // Busca si ya existe el producto
    const existingItem = currentItems.find(item => item.product.id === newItem.product.id);
    if (existingItem) {
      // Actualiza la cantidad si ya existe
      return currentItems.map(item =>
        item.product.id === newItem.product.id
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      );
    } else {
      // Si no existe, agrega un nuevo producto
      return [...currentItems, newItem];
    }
  });
};

// Acción para eliminar un producto del carrito
export const removeFromCart = (productId: number) => {
  cartSignal.update(currentItems =>
    currentItems.filter(item => item.product.id !== productId)
  );
};

// Acción para vaciar el carrito
export const clearCart = () => {
  cartSignal.set([]); // Resetea el carrito a vacío
};
