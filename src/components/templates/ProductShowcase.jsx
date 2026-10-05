import { useMemo, useState } from 'react';
import StickyAsideCenterLayout from '../layout/StickyAsideCenterLayout';
import { ProductFilter, ALL_TYPES } from './ProductFilter';
import { ProductGrid } from './ProductGrid';
import defaultProducts from '../../data/products';

/**
 * ProductShowcase 컴포넌트
 *
 * 좌측 sticky 제품 필터(vertical tab) + 중앙 ProductGrid로 구성된 제품 쇼케이스 섹션.
 * StickyAsideCenterLayout을 사용한다.
 *
 * 동작 방식:
 * 1. 좌측 ProductFilter에서 type 선택 → 해당 type의 제품만 그리드에 표시
 * 2. 'All' 선택 시 전체 제품 표시
 * 3. 모바일(md 미만)에서는 필터가 상단, 그리드가 하단으로 스택
 *
 * Props:
 * @param {object[]} products - 제품 배열 [Optional, 기본값: data/products.js 전체]
 * @param {number} time - 시간 값 0(Day) ~ 1(Night) [Optional, 기본값: 0]
 * @param {number} centerSize - 중앙 그리드 영역 크기 (1-12) [Optional, 기본값: 8]
 * @param {object} columns - ProductGrid 칼럼 수 { xs, sm, md, lg, xl } [Optional, 기본값: { xs: 2, sm: 3, md: 3, lg: 4 }]
 * @param {boolean} isTransitionEnabled - 필터 전환 애니메이션 사용 여부 [Optional, 기본값: true]
 * @param {object} transition - 전환 시간 { exit, moveX, moveY, enter, blur } [Optional]
 * @param {number} stickyTop - 필터 sticky 위치 (px) [Optional, 기본값: 88]
 * @param {function} onProductClick - 카드 클릭 시 product를 인자로 호출 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductShowcase time={ 0.5 } onProductClick={ (p) => navigate(`/product/${p.id}`) } />
 */
export function ProductShowcase({
  products = defaultProducts,
  time = 0,
  centerSize = 8,
  columns = { xs: 2, sm: 3, md: 3, lg: 4 },
  stickyTop = 88,
  isTransitionEnabled = true,
  transition,
  onProductClick,
  sx,
  ...props
}) {
  const [selectedType, setSelectedType] = useState(ALL_TYPES);

  const filteredProducts = useMemo(
    () => (selectedType === ALL_TYPES ? products : products.filter(({ type }) => type === selectedType)),
    [products, selectedType],
  );

  return (
    <StickyAsideCenterLayout
      aside={ <ProductFilter selected={ selectedType } onChange={ setSelectedType } products={ products } /> }
      centerSize={ centerSize }
      stickyTop={ stickyTop }
      sx={ sx }
      { ...props }
    >
      <ProductGrid
        products={ filteredProducts }
        time={ time }
        columns={ columns }
        isTransitionEnabled={ isTransitionEnabled }
        transition={ transition }
        onProductClick={ onProductClick }
      />
    </StickyAsideCenterLayout>
  );
}
