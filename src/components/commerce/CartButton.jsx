import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { ShoppingBag } from 'lucide-react';
import { LucideIcon } from '../../common/ui/LucideIcon';
import { useCart } from './useCart';

/**
 * CartButton 컴포넌트
 *
 * 장바구니 패널을 여는 아이콘 버튼. 담긴 수량을 배지로 표시한다.
 *
 * Example usage:
 * <CartButton />
 */
export function CartButton() {
  const { totalCount, openCart } = useCart();

  return (
    <IconButton aria-label={ `장바구니 열기 (${totalCount})` } onClick={ openCart }>
      <Badge badgeContent={ totalCount } color="secondary" overlap="circular">
        <LucideIcon icon={ ShoppingBag } />
      </Badge>
    </IconButton>
  );
}
