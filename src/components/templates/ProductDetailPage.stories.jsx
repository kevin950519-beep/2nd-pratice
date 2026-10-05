import { ProductDetailPage } from './ProductDetailPage';
import { FloatingTimelineControl } from '../input/FloatingTimelineControl';
import { CartDrawer, CartProvider } from '../commerce';
import products from '../../data/products';

export default {
  title: 'Template/ProductDetailPage',
  component: ProductDetailPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    product: { control: 'object', description: '제품 데이터 (data/products.js 항목)' },
    onBack: { action: 'back', description: '목록으로 돌아가기 핸들러 (없으면 버튼 숨김)' },
    onCheckout: { action: 'checkout', description: '장바구니 패널의 결제하기 핸들러 (스토리 전용, 실제 앱에서는 /checkout 이동)' },
    time: { control: false, description: '시간 값. 스토리에서는 전역 시간(툴바 Time / 하단 FloatingTimelineControl)이 우선' },
    sx: { control: 'object', description: '추가 스타일' },
  },
};

export const Default = {
  args: { product: products[0] },
  render: ({ onCheckout, ...args }) => (
    <CartProvider>
      <ProductDetailPage { ...args } />
      <CartDrawer onCheckout={ onCheckout } />
      <FloatingTimelineControl />
    </CartProvider>
  ),
};
