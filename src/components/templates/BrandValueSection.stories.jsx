import { BrandValueSection } from './BrandValueSection';

export default {
  title: 'Template/BrandValueSection',
  component: BrandValueSection,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    features: { control: 'object', description: '[{ id, icon, title, description, detailedDescription }]. 기본: content.brandValue.features' },
    sx: { control: 'object', description: '추가 스타일' },
  },
};

export const Default = {
  args: {},
};
