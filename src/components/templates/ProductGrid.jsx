import Grid from '@mui/material/Grid';
import { ProductCard } from '../card/ProductCard';
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
 *
 * Props:
 * @param {object[]} products - 제품 배열 [Optional, 기본값: data/products.js 전체]
 * @param {number} time - 시간 값 0(Day) ~ 1(Night) [Optional, 기본값: 0]
 * @param {object} columns - 브레이크포인트별 칼럼 수 { xs, sm, md, lg, xl } [Optional, 기본값: { xs: 2, sm: 3, md: 4, lg: 5 }]
 * @param {number} spacing - 카드 간격 (theme.spacing) [Optional, 기본값: 3]
 * @param {function} onProductClick - 카드 클릭 시 product를 인자로 호출 [Optional]
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
  onProductClick,
  sx,
  ...props
}) {
  return (
    <Grid container columns={ columns } spacing={ spacing } sx={ sx } {...props}>
      { products.map((product) => (
        <Grid key={ product.id } size={ 1 }>
          <ProductCard
            title={ product.title }
            type={ product.type }
            images={ product.images }
            lux={ product.lux }
            kelvin={ product.kelvin }
            time={ time }
            onClick={ onProductClick ? () => onProductClick(product) : undefined }
          />
        </Grid>
      )) }
    </Grid>
  );
}
