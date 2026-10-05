import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ProductCard } from './ProductCard';
import { FloatingTimelineControl } from '../input/FloatingTimelineControl';
import { useTimeline } from '../dynamic-color';
import products from '../../data/products';

export default {
  title: 'Component/3. Card/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: '제품명' },
    images: { control: 'object', description: '[Day, Night] 이미지 URL 배열' },
    type: { control: 'text', description: '제품 타입 (제목 위 Chip)' },
    lux: { control: { type: 'number', min: 0, max: 1000 }, description: '조도(lx)' },
    kelvin: { control: { type: 'number', min: 1800, max: 6500 }, description: '색온도(K)' },
    time: { control: { type: 'range', min: 0, max: 1, step: 0.01 }, description: '시간 값 (0: Day, 1: Night)' },
    mediaRatio: {
      control: 'select',
      options: ['1792/2400', '1/1', '4/5', '3/4', '4/3'],
      description: '이미지 비율',
    },
    onClick: { action: 'clicked', description: '카드 클릭 핸들러' },
  },
};

const [first] = products;

export const Default = {
  args: {
    title: first.title,
    images: first.images,
    type: first.type,
    lux: first.lux,
    kelvin: first.kelvin,
    time: 0,
    mediaRatio: '1792/2400',
  },
  render: (args) => (
    <Box sx={ { maxWidth: 320, p: 2 } }>
      <ProductCard { ...args } />
    </Box>
  ),
};

export const TimeBlend = {
  args: { ...Default.args, time: 0.5 },
  render: Default.render,
};

export const TimeTransition = {
  args: { ...Default.args },
  render: (args) => {
    const { time } = useTimeline();

    return (
      <Box sx={ { maxWidth: 320, p: 2, pb: 12 } }>
        <ProductCard { ...args } time={ time } />
        <FloatingTimelineControl />
      </Box>
    );
  },
};

export const Grid4 = {
  args: { time: 0 },
  render: ({ time }) => (
    <Box sx={ { maxWidth: 1200, p: 2 } }>
      <Grid container spacing={ 3 }>
        { products.slice(0, 8).map((product) => (
          <Grid key={ product.id } size={ { xs: 6, md: 3 } }>
            <ProductCard
              title={ product.title }
              images={ product.images }
              type={ product.type }
              lux={ product.lux }
              kelvin={ product.kelvin }
              time={ time }
            />
          </Grid>
        )) }
      </Grid>
    </Box>
  ),
  argTypes: {
    time: { control: { type: 'range', min: 0, max: 1, step: 0.01 }, description: '전역 시간 값' },
  },
};
