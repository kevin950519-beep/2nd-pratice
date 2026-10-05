import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Trash2, X } from 'lucide-react';
import { LucideIcon } from '../../common/ui/LucideIcon';
import { formatPrice } from '../../utils/format';
import { QuantityStepper } from './QuantityStepper';
import { useCart } from './useCart';

/**
 * CartDrawer 컴포넌트
 *
 * 우측에서 조용히 올라오는 장바구니 패널. 모달처럼 흐름을 끊지 않으며 닫으면 원래 있던 곳으로 돌아간다.
 * 열림 상태와 아이템은 CartProvider(useCart)에서 가져온다.
 *
 * 동작 방식:
 * 1. 아이템별 썸네일 · 제품명 · 옵션 요약 · 수량 스테퍼 · 금액 · 삭제
 * 2. 하단에 합계와 '계속 구경하기'(패널 닫기) / '결제하기'(onCheckout이 있을 때만 활성)
 * 3. 비어 있으면 안내 문구 표시
 *
 * Props:
 * @param {function} onCheckout - 결제하기 클릭 핸들러. 없으면 버튼 비활성 [Optional]
 * @param {number} width - 패널 폭(px, 좁은 화면에서는 100%) [Optional, 기본값: 420]
 *
 * Example usage:
 * <CartDrawer onCheckout={ () => navigate('/checkout') } />
 */
export function CartDrawer({ onCheckout, width = 420 }) {
  const { items, totalCount, totalPrice, isOpen, closeCart, removeItem, setQuantity } = useCart();

  return (
    <Drawer
      anchor="right"
      open={ isOpen }
      onClose={ closeCart }
      slotProps={ {
        paper: { sx: { width: { xs: '100%', sm: width }, backgroundColor: 'background.default', display: 'flex', flexDirection: 'column' } },
      } }
    >
      <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider' } }>
        <Typography variant="h5" component="h2">{ `Cart (${totalCount})` }</Typography>
        <IconButton aria-label="장바구니 닫기" onClick={ closeCart }>
          <LucideIcon icon={ X } />
        </IconButton>
      </Box>

      <Box sx={ { flex: 1, overflowY: 'auto', px: 3 } }>
        { items.length === 0 && (
          <Typography variant="body2" sx={ { py: 6, color: 'text.secondary', textAlign: 'center' } }>
            장바구니가 비어 있습니다.
          </Typography>
        ) }
        { items.map((item) => (
          <Box key={ item.key } sx={ { display: 'flex', gap: 2, py: 3, borderBottom: '1px solid', borderColor: 'divider' } }>
            <Box
              component="img"
              src={ item.image }
              alt={ item.title }
              sx={ { width: 72, aspectRatio: '1792/2400', objectFit: 'contain', flexShrink: 0 } }
            />
            <Box sx={ { flex: 1, minWidth: 0 } }>
              <Box sx={ { display: 'flex', justifyContent: 'space-between', gap: 1 } }>
                <Typography variant="subtitle1" sx={ { fontWeight: 700 } }>{ item.title }</Typography>
                <IconButton size="small" aria-label={ `${item.title} 삭제` } onClick={ () => removeItem(item.key) }>
                  <LucideIcon icon={ Trash2 } fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="caption" sx={ { display: 'block', color: 'text.secondary', mt: 0.5 } }>
                { item.optionSummary }
              </Typography>
              <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 } }>
                <QuantityStepper
                  size="small"
                  value={ item.quantity }
                  onChange={ (quantity) => setQuantity(item.key, quantity) }
                />
                <Typography variant="subtitle1">{ formatPrice(item.price * item.quantity) }</Typography>
              </Box>
            </Box>
          </Box>
        )) }
      </Box>

      <Box sx={ { px: 3, py: 3, borderTop: '1px solid', borderColor: 'divider' } }>
        <Box sx={ { display: 'flex', justifyContent: 'space-between', mb: 2 } }>
          <Typography variant="subtitle1">합계</Typography>
          <Typography variant="subtitle1" sx={ { fontWeight: 700 } }>{ formatPrice(totalPrice) }</Typography>
        </Box>
        <Box sx={ { display: 'flex', gap: 1 } }>
          <Button fullWidth variant="outlined" color="primary" onClick={ closeCart }>계속 구경하기</Button>
          <Button fullWidth variant="contained" color="primary" disabled={ !onCheckout || items.length === 0 } onClick={ onCheckout }>
            결제하기
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
