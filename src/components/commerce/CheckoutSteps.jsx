import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * CheckoutSteps 컴포넌트
 *
 * 체크아웃 단계 표시. 현재 단계는 진하게, 지난 단계는 본문색, 남은 단계는 흐리게 보여준다.
 *
 * Props:
 * @param {string[]} steps - 단계 라벨 목록 [Required]
 * @param {number} activeStep - 현재 단계 인덱스(0부터) [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CheckoutSteps steps={ ['장바구니', '정보 입력', '완료'] } activeStep={ 1 } />
 */
export function CheckoutSteps({ steps, activeStep, sx }) {
  return (
    <Box component="ol" aria-label="결제 단계" sx={ { display: 'flex', alignItems: 'center', gap: 1.5, m: 0, p: 0, listStyle: 'none', ...sx } }>
      { steps.map((label, index) => (
        <Box
          key={ label }
          component="li"
          aria-current={ index === activeStep ? 'step' : undefined }
          sx={ { display: 'flex', alignItems: 'center', gap: 1.5 } }
        >
          <Typography
            variant="caption"
            sx={ {
              color: index <= activeStep ? 'text.primary' : 'text.disabled',
              fontWeight: index === activeStep ? 700 : 400,
            } }
          >
            { `${index + 1}. ${label}` }
          </Typography>
          { index < steps.length - 1 && <Box sx={ { width: 16, height: '1px', bgcolor: 'divider' } } /> }
        </Box>
      )) }
    </Box>
  );
}
