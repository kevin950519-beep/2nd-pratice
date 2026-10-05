import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartContext } from './cartContext';

const STORAGE_KEY = 'lumenstate-cart';

/** localStorage에서 장바구니를 읽는다. 접근 불가/파싱 실패 시 빈 배열 */
function loadItems() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * CartProvider 컴포넌트
 *
 * 전역 장바구니 상태. 브라우저 단위로 영속한다(localStorage). 패널(isOpen) 상태는 저장하지 않는다.
 * 아이템 정체성은 제품 id + 옵션 조합(key)이며, 같은 key를 다시 담으면 수량이 합쳐진다.
 *
 * Props:
 * @param {node} children - 하위 요소 [Required]
 *
 * Example usage:
 * <CartProvider><App /></CartProvider>
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState(loadItems);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* 저장 불가 환경(프라이빗 모드 등)에서는 메모리 상태로만 동작 */
    }
  }, [items]);

  const addItem = useCallback((item, quantity = 1) => {
    setItems((prev) => {
      const exists = prev.find((entry) => entry.key === item.key);
      if (exists) {
        return prev.map((entry) => (entry.key === item.key ? { ...entry, quantity: entry.quantity + quantity } : entry));
      }
      return [...prev, { ...item, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((entry) => entry.key !== key));
  }, []);

  const setQuantity = useCallback((key, quantity) => {
    setItems((prev) => prev.map((entry) => (entry.key === key ? { ...entry, quantity: Math.max(1, quantity) } : entry)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({
    items,
    totalCount: items.reduce((sum, entry) => sum + entry.quantity, 0),
    totalPrice: items.reduce((sum, entry) => sum + entry.price * entry.quantity, 0),
    isOpen,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    openCart,
    closeCart,
  }), [items, isOpen, addItem, removeItem, setQuantity, clearCart, openCart, closeCart]);

  return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>;
}
