import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { formatPrice } from '../../utils/format';
import { QuantityStepper } from './QuantityStepper';

/**
 * AddToCartAction 컴포넌트
 *
 * 수량 스테퍼 + 금액 + 담기 버튼. 담으면 수량은 1로 돌아간다.
 *
 * Props:
 * @param {number} price - 단가(원) [Required]
 * @param {function} onAdd - 담기 핸들러 (quantity) => void [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <AddToCartAction price={ 290000 } onAdd={ (quantity) => addItem(item, quantity) } />
 */
export function AddToCartAction({ price, onAdd, sx }) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    onAdd(quantity);
    setQuantity(1);
  };

  return (
    <Box sx={ sx }>
      <Typography variant="subtitle1" component="p" sx={ { mb: 3, fontWeight: 700, fontSize: '1.875rem' } }>
        { formatPrice(price * quantity) }
      </Typography>
      <Box sx={ { display: 'flex', gap: 2, alignItems: 'stretch' } }>
        <QuantityStepper value={ quantity } onChange={ setQuantity } />
        <Button fullWidth variant="contained" color="primary" size="large" onClick={ handleAdd }>
          담기
        </Button>
      </Box>
    </Box>
  );
}
