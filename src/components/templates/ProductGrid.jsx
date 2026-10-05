import Grid from '@mui/material/Grid';
import { ProductCard } from '../card/ProductCard';
import { useFilterTransition } from './useFilterTransition';
import defaultProducts from '../../data/products';

/**
 * ProductGrid 컴포넌트
 *
 * 제품 목록을 ProductCard 그리드로 보여준다. 기본값은 data/products.js의 전체 제품.
 *
 * 동작 방식:
 * 1. products를 순회하며 ProductCard 렌더링
 * 2. time 값을 모든 카드에 동일하게 전달 (같은 시각 공유)
 * 3. 반응형 칼럼: 모바일 2열 / 태블릿 3열 / 소형 데스크탑 4열 / PC 5열 (columns로 조정)
 * 4. products가 바뀌면(필터링) 순차 전환: 사라질 카드 fade-out(opacity+blur) → 남는 카드 가로 이동 → 세로 이동
 *    → 새 카드 제자리 fade-in. 사선 이동·단계 겹침·시차 없음 (useFilterTransition 참조)
 *
 * Props:
 * @param {object[]} products - 제품 배열 [Optional, 기본값: data/products.js 전체]
 * @param {number} time - 시간 값 0(Day) ~ 1(Night) [Optional, 기본값: 0]
 * @param {object} columns - 브레이크포인트별 칼럼 수 { xs, sm, md, lg, xl } [Optional, 기본값: { xs: 2, sm: 3, md: 4, lg: 5 }]
 * @param {boolean} isTransitionEnabled - 필터 전환 애니메이션 사용 여부 [Optional, 기본값: true]
 * @param {object} transition - 전환 시간 { exit, moveX, moveY, enter, blur } 초/px [Optional]
 * @param {number} spacing - 카드 간격 (theme.spacing) [Optional, 기본값: 3]
 * @param {function} onProductClick - 카드 클릭 시 (product, event)로 호출. event로 카드의 이미지 좌표를 잴 수 있다 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductGrid time={ 0.5 } onProductClick={ (p) => navigate(`/product/${p.id}`) } />
 */
export function ProductGrid({
  products = defaultProducts,
  time = 0,
  columns = { xs: 2, sm: 3, md: 4, lg: 5 },
  spacing = 3,
  isTransitionEnabled = true,
  transition,
  onProductClick,
  sx,
  ...props
}) {
  const { rendered, setNodeRef } = useFilterTransition({
    items: products,
    isEnabled: isTransitionEnabled,
    durations: transition,
  });

  return (
    <Grid container columns={ columns } spacing={ spacing } sx={ sx } {...props}>
      { rendered.map(({ key, item: product, style }) => (
        <Grid key={ key } ref={ setNodeRef(key) } size={ 1 } style={ style }>
          <ProductCard
            title={ product.title }
            type={ product.type }
            images={ product.images }
            lux={ product.lux }
            kelvin={ product.kelvin }
            time={ time }
            sharedKey={ product.id }
            onClick={ onProductClick ? (event) => onProductClick(product, event) : undefined }
          />
        </Grid>
      )) }
    </Grid>
  );
}
