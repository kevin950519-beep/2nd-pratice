import { HeroSection } from './HeroSection';
import { FloatingTimelineControl } from '../input/FloatingTimelineControl';

export default {
  title: 'Template/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text', description: '브랜드명 (기본: content.brand.name)' },
    tagline: { control: 'text', description: '브랜드 태그라인 (기본: content.brand.tagline)' },
    images: { control: 'object', description: '[좌측, 우측] { images: [Day, Night], alt, ratio }. 기본: content.hero.moodboard' },
    time: { control: false, description: '시간 값. 스토리에서는 전역 시간(툴바 Time / 하단 FloatingTimelineControl)이 우선' },
    sx: { control: 'object', description: '추가 스타일' },
  },
};

export const Default = {
  args: {},
  render: (args) => (
    <>
      <HeroSection { ...args } />
      <FloatingTimelineControl />
    </>
  ),
};
