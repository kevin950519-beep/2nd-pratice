import { LandingPage } from './LandingPage';
import { FloatingTimelineControl } from '../input/FloatingTimelineControl';

export default {
  title: 'Template/LandingPage',
  component: LandingPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    time: { control: false, description: '시간 값. 스토리에서는 전역 시간(툴바 Time / 하단 FloatingTimelineControl)이 우선' },
    topSectionProps: { control: 'object', description: 'TopSection props (heroProps, brandValueProps)' },
    showcaseProps: { control: 'object', description: 'ProductShowcase props (centerSize, columns, transition 등)' },
    sectionTitle: { control: 'text', description: '제품 섹션 제목 (기본: content.products.sectionTitle)' },
    sectionSubtitle: { control: 'text', description: '제품 섹션 부제 (기본: content.products.sectionSubtitle)' },
    onProductClick: { action: 'product clicked', description: '제품 카드 클릭 핸들러' },
    sx: { control: 'object', description: '추가 스타일' },
  },
};

export const Default = {
  args: {},
  render: (args) => (
    <>
      <LandingPage { ...args } />
      <FloatingTimelineControl />
    </>
  ),
};
