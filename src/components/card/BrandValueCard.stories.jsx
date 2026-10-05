import Grid from '@mui/material/Grid';
import { BrandValueCard } from './BrandValueCard';
import content from '../../data/content';

const [first] = content.brandValue.features;

export default {
  title: 'Component/3. Card/BrandValueCard',
  component: BrandValueCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: '가치 이름' },
    description: { control: 'text', description: '한 줄 설명' },
    detailedDescription: { control: 'text', description: '상세 설명' },
    icon: { control: 'select', options: ['CircleDot', 'Repeat', 'Activity'], description: '아이콘 이름' },
    variant: { control: 'select', options: ['outlined', 'elevation', 'ghost', 'filled'], description: '카드 스타일' },
  },
};

export const Default = {
  args: { ...first, variant: 'outlined' },
  render: (args) => (
    <div style={ { maxWidth: 360 } }>
      <BrandValueCard { ...args } />
    </div>
  ),
};

export const ThreeValues = {
  render: () => (
    <Grid container spacing={ 3 }>
      { content.brandValue.features.map(({ id, ...feature }) => (
        <Grid key={ id } size={ { xs: 12, md: 4 } }>
          <BrandValueCard { ...feature } />
        </Grid>
      )) }
    </Grid>
  ),
};
