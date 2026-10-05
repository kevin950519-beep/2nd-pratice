import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FloatingTimelineControl } from './FloatingTimelineControl';
import { ProductGrid } from '../templates/ProductGrid';
import { useTimeline } from '../dynamic-color';

export default {
  title: 'Component/7. Input & Control/FloatingTimelineControl',
  component: FloatingTimelineControl,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    offset: { control: { type: 'number', min: 0, max: 10, step: 1 }, description: '화면 하단에서의 거리 (theme.spacing)' },
  },
};

export const Default = {
  args: { offset: 3 },
  render: (args) => {
    const { time } = useTimeline();

    return (
      <Box sx={ { maxWidth: 1200, mx: 'auto', p: 2, pb: 16 } }>
        <Typography variant="body2" color="text.secondary" sx={ { mb: 3 } }>
          화면 하단 중앙의 컨트롤로 시간대를 바꿔 보세요. 스크롤해도 같은 위치에 유지되며 뒤의 콘텐츠가 비쳐 보입니다.
        </Typography>
        <ProductGrid time={ time } />
        <FloatingTimelineControl { ...args } />
      </Box>
    );
  },
};
