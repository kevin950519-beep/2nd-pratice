import Box from '@mui/material/Box';
import { ProductShowcase } from './ProductShowcase';

export default {
  title: 'Template/ProductShowcase',
  component: ProductShowcase,
  tags: ['autodocs'],
  argTypes: {
    products: { control: 'object', description: '제품 배열 (기본: data/products.js 전체)' },
    time: { control: { type: 'range', min: 0, max: 1, step: 0.01 }, description: '시간 값 (0: Day, 1: Night)' },
    centerSize: { control: { type: 'number', min: 4, max: 10, step: 2 }, description: '중앙 그리드 영역 크기 (1-12)' },
    columns: { control: 'object', description: 'ProductGrid 브레이크포인트별 칼럼 수' },
    stickyTop: { control: { type: 'number', min: 0, max: 200 }, description: '필터 sticky 위치(px)' },
    isTransitionEnabled: { control: 'boolean', description: '필터 전환 애니메이션 사용 여부' },
    transition: { control: 'object', description: '전환 시간 { exit, moveX, moveY, enter, blur } (초/px)' },
    onProductClick: { action: 'productClicked', description: '카드 클릭 핸들러 (product 전달)' },
  },
};

export const Default = {
  args: {
    time: 0,
    centerSize: 8,
    columns: { xs: 2, sm: 3, md: 3, lg: 4 },
    stickyTop: 88,
    isTransitionEnabled: true,
    transition: { exit: 0.6, moveX: 0.6, moveY: 0.6, enter: 0.8, blur: 8 },
  },
  render: (args) => (
    <Box sx={ { maxWidth: 1440, mx: 'auto', p: 2 } }>
      <ProductShowcase { ...args } />
    </Box>
  ),
};
