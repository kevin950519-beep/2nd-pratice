import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formatPrice } from '../../utils/format';

/** 라벨/금액 한 줄 */
function SummaryRow({ label, value, isStrong = false }) {
  return (
    <Box sx={ { display: 'flex', justifyContent: 'space-between', py: 0.75 } }>
      <Typography variant={ isStrong ? 'subtitle1' : 'body2' } sx={ { color: isStrong ? 'text.primary' : 'text.secondary' } }>{ label }</Typography>
      <Typography variant={ isStrong ? 'subtitle1' : 'body2' } sx={ { fontWeight: isStrong ? 700 : 400 } }>{ value }</Typography>
    </Box>
  );
}

/**
 * OrderSummary 컴포넌트
 *
 * 체크아웃 주문 요약. 아이템(썸네일 · 제품명 · 옵션 · 수량 · 금액)과 소계 / 할인 / 배송비 / 합계를 보여준다.
 * 스티키 배치는 부모(레이아웃)가 정한다.
 *
 * Props:
 * @param {object[]} items - 장바구니 아이템 [{ key, title, image, optionSummary, price, quantity }] [Required]
 * @param {number} subtotal - 소계(원) [Required]
 * @param {number} discount - 할인 금액(원) [Optional, 기본값: 0]
 * @param {number} shippingFee - 배송비(원) [Optional, 기본값: 0]
 * @param {number} total - 합계(원) [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <OrderSummary items={ items } subtotal={ 580000 } discount={ 58000 } total={ 522000 } />
 */
export function OrderSummary({ items, subtotal, discount = 0, shippingFee = 0, total, sx }) {
  return (
    <Box component="aside" aria-label="주문 요약" sx={ sx }>
      <Typography variant="overline" component="h2" sx={ { display: 'block', mb: 1, color: 'text.secondary' } }>주문 요약</Typography>
      { items.map((item) => (
        <Box key={ item.key } sx={ { display: 'flex', gap: 2, py: 2, borderTop: '1px solid', borderColor: 'divider' } }>
          <Box component="img" src={ item.image } alt={ item.title } sx={ { width: 56, aspectRatio: '1792/2400', objectFit: 'contain', flexShrink: 0 } } />
          <Box sx={ { flex: 1, minWidth: 0 } }>
            <Typography variant="subtitle2" sx={ { fontWeight: 700 } }>{ item.title }</Typography>
            <Typography variant="caption" sx={ { display: 'block', color: 'text.secondary' } }>{ item.optionSummary }</Typography>
            <Typography variant="caption" sx={ { color: 'text.secondary' } }>{ `수량 ${item.quantity}` }</Typography>
          </Box>
          <Typography variant="body2">{ formatPrice(item.price * item.quantity) }</Typography>
        </Box>
      )) }
      <Box sx={ { pt: 2, borderTop: '1px solid', borderColor: 'divider' } }>
        <SummaryRow label="소계" value={ formatPrice(subtotal) } />
        { discount > 0 && <SummaryRow label="할인" value={ `−${formatPrice(discount)}` } /> }
        <SummaryRow label="배송비" value={ shippingFee === 0 ? '무료' : formatPrice(shippingFee) } />
        <Box sx={ { mt: 1, pt: 1, borderTop: '1px solid', borderColor: 'divider' } }>
          <SummaryRow label="합계" value={ formatPrice(total) } isStrong />
        </Box>
      </Box>
    </Box>
  );
}
