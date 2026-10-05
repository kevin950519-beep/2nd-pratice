import { createContext } from 'react';

/** 장바구니 컨텍스트. Provider 밖에서는 비어 있는 상태로 동작(변경은 무시) */
export const CartContext = createContext({
  items: [],
  totalCount: 0,
  totalPrice: 0,
  isOpen: false,
  addItem: () => {},
  removeItem: () => {},
  setQuantity: () => {},
  openCart: () => {},
  closeCart: () => {},
});
