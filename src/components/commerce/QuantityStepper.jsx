import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Minus, Plus } from 'lucide-react';
import { LucideIcon } from '../../common/ui/LucideIcon';

/**
 * QuantityStepper 컴포넌트
 *
 * 수량을 − / + 버튼으로 조절하는 스테퍼. 최소값 미만으로는 내려가지 않는다.
 *
 * Props:
 * @param {number} value - 현재 수량 [Required]
 * @param {function} onChange - 수량 변경 핸들러 (quantity) => void [Required]
 * @param {number} min - 최소 수량 [Optional, 기본값: 1]
 * @param {number} max - 최대 수량 [Optional, 기본값: 99]
 * @param {string} size - 버튼 크기 ('small' | 'medium') [Optional, 기본값: 'medium']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <QuantityStepper value={ quantity } onChange={ setQuantity } />
 */
export function QuantityStepper({ value, onChange, min = 1, max = 99, size = 'medium', sx }) {
  return (
    <Box
      sx={ { display: 'inline-flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', ...sx } }
    >
      <IconButton
        size={ size }
        aria-label="수량 줄이기"
        disabled={ value <= min }
        onClick={ () => onChange(Math.max(min, value - 1)) }
      >
        <LucideIcon icon={ Minus } fontSize="small" />
      </IconButton>
      <Typography variant="subtitle1" aria-live="polite" sx={ { minWidth: 32, textAlign: 'center' } }>
        { value }
      </Typography>
      <IconButton
        size={ size }
        aria-label="수량 늘리기"
        disabled={ value >= max }
        onClick={ () => onChange(Math.min(max, value + 1)) }
      >
        <LucideIcon icon={ Plus } fontSize="small" />
      </IconButton>
    </Box>
  );
}
