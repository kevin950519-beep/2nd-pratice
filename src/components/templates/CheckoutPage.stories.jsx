import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { CheckoutPage } from './CheckoutPage';
import { CartProvider, useCart } from '../commerce';
import products from '../../data/products';

/** 스토리용: 마운트 시 샘플 제품을 장바구니에 담는다 */
function SeedCart({ children }) {
  const { addItem, closeCart } = useCart();

  useEffect(() => {
    products.slice(0, 2).forEach((product, index) => {
      addItem({
        key: `${product.id}|story`,
        productId: product.id,
        title: product.title,
        image: product.images[0],
        price: product.price,
        optionSummary: '샌드 · 브라스 · 2400mm',
      }, index + 1);
    });
    closeCart();
  }, [addItem, closeCart]);

  return children;
}

export default {
  title: 'Template/CheckoutPage',
  component: CheckoutPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    logo: { control: false, description: '상단 바 로고' },
    onBack: { action: 'back', description: '돌아가기 핸들러' },
    onDone: { action: 'done', description: '주문 접수 후 계속 구경하기 핸들러' },
    sx: { control: 'object', description: '추가 스타일' },
  },
};

export const Default = {
  render: (args) => (
    <CartProvider>
      <SeedCart>
        <CheckoutPage { ...args } logo={ <Typography variant="h5">Lumenstate</Typography> } />
      </SeedCart>
    </CartProvider>
  ),
};
