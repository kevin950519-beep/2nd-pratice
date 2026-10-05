import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CartButton } from './CartButton';
import { CartDrawer } from './CartDrawer';
import { CartProvider } from './CartProvider';
import { useCart } from './useCart';
import products from '../../data/products';

export default {
  title: 'Component/9. Overlay & Feedback/CartDrawer',
  component: CartDrawer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    onCheckout: { action: 'checkout', description: '결제하기 핸들러 (없으면 버튼 비활성)' },
    width: { control: { type: 'number', min: 320, max: 640, step: 20 }, description: '패널 폭(px, 좁은 화면에서는 100%)' },
  },
};

/** 스토리용: 제품 2개를 담는 버튼 */
function AddSamples() {
  const { addItem } = useCart();

  const add = (product, quantity) => addItem({
    key: `${product.id}|clear|patina-brass|36-48`,
    productId: product.id,
    title: product.title,
    image: product.images[0],
    price: product.price,
    optionSummary: 'Clear · Patina Brass · 36" - 48"',
  }, quantity);

  return (
    <Button onClick={ () => { add(products[0], 1); add(products[3], 2); } }>샘플 담기</Button>
  );
}

export const Default = {
  args: { width: 420 },
  render: (args) => (
    <CartProvider>
      <Box sx={ { p: 3, display: 'flex', gap: 2, alignItems: 'center' } }>
        <CartButton />
        <AddSamples />
      </Box>
      <CartDrawer { ...args } />
    </CartProvider>
  ),
};
