import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

/** 옵션 그룹 정의: 값 키 / 표시 라벨 */
const OPTION_GROUPS = [
  { name: 'glassFinish', label: '유리 마감' },
  { name: 'hardware', label: '금속 마감' },
  { name: 'height', label: '높이' },
];

/**
 * ProductOptionSelector 컴포넌트
 *
 * 마감(유리) · 금속 · 높이 옵션을 언더라인 Select 3개로 고른다. 선택 조합은 장바구니 아이템의 정체성이 된다.
 *
 * Props:
 * @param {object} options - 옵션 목록 { glassFinish, hardware, height } 각 [{ value, label }] [Required]
 * @param {object} value - 선택값 { glassFinish, hardware, height } [Required]
 * @param {function} onChange - 변경 핸들러 (name, value) => void [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductOptionSelector options={ PRODUCT_OPTIONS } value={ selected } onChange={ (name, v) => setSelected({ ...selected, [name]: v }) } />
 */
export function ProductOptionSelector({ options, value, onChange, sx }) {
  return (
    <Box sx={ { display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3, ...sx } }>
      { OPTION_GROUPS.map(({ name, label }) => (
        <FormControl key={ name } variant="standard" fullWidth>
          <InputLabel id={ `option-${name}-label` } shrink>{ label }</InputLabel>
          <Select
            labelId={ `option-${name}-label` }
            value={ value[name] }
            onChange={ (event) => onChange(name, event.target.value) }
            sx={ { mt: 2 } }
            MenuProps={ { slotProps: { paper: { sx: { bgcolor: 'background.paper', backgroundImage: 'none' } } } } }
          >
            { options[name].map((option) => (
              <MenuItem key={ option.value } value={ option.value }>{ option.label }</MenuItem>
            )) }
          </Select>
        </FormControl>
      )) }
    </Box>
  );
}
