import { useContext } from 'react';
import { CartContext } from './cartContext';

/**
 * 전역 장바구니 구독 훅
 * @returns {{ items: object[], totalCount: number, totalPrice: number, isOpen: boolean,
 *   addItem: function, removeItem: function, setQuantity: function, openCart: function, closeCart: function }}
 */
export function useCart() {
  return useContext(CartContext);
}
