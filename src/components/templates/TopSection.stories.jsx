import { TopSection } from './TopSection';
import { FloatingTimelineControl } from '../input/FloatingTimelineControl';

export default {
  title: 'Template/TopSection',
  component: TopSection,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    time: { control: false, description: '시간 값. 스토리에서는 전역 시간(툴바 Time / 하단 FloatingTimelineControl)이 우선' },
    heroProps: { control: 'object', description: 'HeroSection props (title, tagline, images 등)' },
    brandValueProps: { control: 'object', description: 'BrandValueSection props (features)' },
    sx: { control: 'object', description: '추가 스타일' },
  },
};

export const Default = {
  args: {},
  render: (args) => (
    <>
      <TopSection { ...args } />
      <FloatingTimelineControl />
    </>
  ),
};
