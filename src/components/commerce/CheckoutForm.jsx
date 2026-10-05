import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

/** 폼 섹션 제목 */
function SectionTitle({ children }) {
  return <Typography variant="overline" component="h2" sx={ { display: 'block', mb: 2, color: 'text.secondary' } }>{ children }</Typography>;
}

/**
 * CheckoutForm 컴포넌트
 *
 * 체크아웃 폼 묶음(연락처 / 배송 / 할인). 절제된 언더라인 입력으로 구성한다. 값과 검증은 부모가 관리한다.
 *
 * Props:
 * @param {object} values - 입력값 { email, name, phone, postcode, address, addressDetail, memo, discountCode } [Required]
 * @param {object} errors - 필드별 오류 메시지 { [name]: string } [Optional, 기본값: {}]
 * @param {function} onChange - 변경 핸들러 (name, value) => void [Required]
 * @param {function} onApplyDiscount - 할인 코드 적용 핸들러 [Required]
 * @param {string} discountMessage - 할인 코드 결과 안내 [Optional]
 * @param {boolean} isDiscountApplied - 할인 코드 적용 여부 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CheckoutForm values={ values } errors={ errors } onChange={ (name, v) => setValues({ ...values, [name]: v }) } onApplyDiscount={ apply } />
 */
export function CheckoutForm({ values, errors = {}, onChange, onApplyDiscount, discountMessage, isDiscountApplied = false, sx }) {
  const field = (name, label, extra = {}) => (
    <TextField
      variant="standard"
      fullWidth
      label={ label }
      value={ values[name] }
      onChange={ (event) => onChange(name, event.target.value) }
      error={ Boolean(errors[name]) }
      helperText={ errors[name] }
      slotProps={ { inputLabel: { shrink: true } } }
      { ...extra }
    />
  );

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', gap: 6, ...sx } }>
      <Box component="section">
        <SectionTitle>연락처</SectionTitle>
        <Box sx={ { display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } } }>
          <Box sx={ { gridColumn: { sm: '1 / -1' } } }>{ field('email', '이메일', { type: 'email', autoComplete: 'email' }) }</Box>
          { field('name', '이름', { autoComplete: 'name' }) }
          { field('phone', '휴대폰 번호', { type: 'tel', autoComplete: 'tel' }) }
        </Box>
      </Box>

      <Box component="section">
        <SectionTitle>배송</SectionTitle>
        <Box sx={ { display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' } } }>
          { field('postcode', '우편번호', { autoComplete: 'postal-code' }) }
          <Box sx={ { gridColumn: { sm: '1 / -1' } } }>{ field('address', '주소', { autoComplete: 'street-address' }) }</Box>
          <Box sx={ { gridColumn: { sm: '1 / -1' } } }>{ field('addressDetail', '상세 주소') }</Box>
          <Box sx={ { gridColumn: { sm: '1 / -1' } } }>{ field('memo', '배송 메모 (선택)') }</Box>
        </Box>
      </Box>

      <Box component="section">
        <SectionTitle>할인</SectionTitle>
        <Box sx={ { display: 'flex', alignItems: 'flex-end', gap: 2 } }>
          { field('discountCode', '할인 코드', { helperText: discountMessage, error: false, sx: { flex: 1 } }) }
          <Button color="primary" variant="outlined" disabled={ !values.discountCode.trim() } onClick={ onApplyDiscount }>
            { isDiscountApplied ? '적용됨' : '적용' }
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
