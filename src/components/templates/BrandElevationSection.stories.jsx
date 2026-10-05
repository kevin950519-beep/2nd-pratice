import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BrandElevationSection } from './BrandElevationSection';

export default {
  title: 'Template/BrandElevationSection',
  component: BrandElevationSection,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    scenes: { control: 'object', description: '[{ id, src }] 순차 재생 순서. 기본: set1, set2, set3 영상' },
    backgroundColor: { control: 'color', description: '슬라이드 뒤 배경색' },
  },
};

const Spacer = ({ label }) => (
  <Box sx={ { height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' } }>
    <Typography variant="caption" color="text.secondary">{ label }</Typography>
  </Box>
);

export const Default = {
  args: {},
  render: (args) => (
    <>
      <Spacer label="↓ scroll" />
      <BrandElevationSection { ...args } />
      <Spacer label="end" />
    </>
  ),
};
