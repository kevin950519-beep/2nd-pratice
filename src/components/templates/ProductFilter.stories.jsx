import { useState } from 'react';
import Box from '@mui/material/Box';
import { ProductFilter, ALL_TYPES } from './ProductFilter';

export default {
  title: 'Template/ProductFilter',
  component: ProductFilter,
  tags: ['autodocs'],
  argTypes: {
    selected: { control: 'text', description: '선택된 type (all 또는 product.type)' },
    products: { control: 'object', description: '필터 기준 제품 배열 (기본: data/products.js 전체)' },
    onChange: { action: 'changed', description: '변경 핸들러 (type)' },
  },
};

function FilterDemo({ selected, onChange, ...args }) {
  const [value, setValue] = useState(selected);

  return (
    <Box sx={ { width: 200, p: 2 } }>
      <ProductFilter
        { ...args }
        selected={ value }
        onChange={ (next) => { setValue(next); onChange?.(next); } }
      />
    </Box>
  );
}

export const Default = {
  args: { selected: ALL_TYPES },
  render: (args) => <FilterDemo { ...args } />,
};
