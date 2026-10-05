import Box from '@mui/material/Box';
import { ProductGrid } from './ProductGrid';

export default {
  title: 'Template/ProductGrid',
  component: ProductGrid,
  tags: ['autodocs'],
  argTypes: {
    products: { control: 'object', description: '제품 배열 (기본: data/products.js 전체)' },
    time: { control: { type: 'range', min: 0, max: 1, step: 0.01 }, description: '시간 값 (0: Day, 1: Night)' },
    columns: { control: 'object', description: '브레이크포인트별 칼럼 수 { xs, sm, md, lg }' },
    spacing: { control: { type: 'number', min: 0, max: 8 }, description: '카드 간격' },
    onProductClick: { action: 'productClicked', description: '카드 클릭 핸들러 (product 전달)' },
  },
};

export const Default = {
  args: {
    time: 0,
    columns: { xs: 2, sm: 3, md: 4, lg: 5 },
    spacing: 3,
  },
  render: (args) => (
    <Box sx={ { maxWidth: 1200, p: 2 } }>
      <ProductGrid { ...args } />
    </Box>
  ),
};
