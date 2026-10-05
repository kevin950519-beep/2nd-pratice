import { useMemo, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
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
 * 3. 화면 폭 전체를 채운다 (좌우 aside 1칼럼씩 + 그리드 10칼럼, 칼럼 수는 xl 6열까지 확장)
 * 4. lg 미만에서는 필터가 상단 가로 탭, 그리드가 하단으로 스택 (aside가 좁아지는 md 구간 포함)
 *
 * Props:
 * @param {object[]} products - 제품 배열 [Optional, 기본값: data/products.js 전체]
 * @param {number} time - 시간 값 0(Day) ~ 1(Night) [Optional, 기본값: 0]
 * @param {number} centerSize - 중앙 그리드 영역 크기 (1-12) [Optional, 기본값: 10]
 * @param {object} columns - ProductGrid 칼럼 수 { xs, sm, md, lg, xl } [Optional, 기본값: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }]
 * @param {boolean} isTransitionEnabled - 필터 전환 애니메이션 사용 여부 [Optional, 기본값: true]
 * @param {object} transition - 전환 시간 { exit, moveX, moveY, enter, blur } [Optional]
 * @param {number} spacing - 필터 영역과 그리드 영역 사이 간격 (theme.spacing) [Optional, 기본값: 1]
 * @param {number} stickyTop - 필터 sticky 위치 (px) [Optional, 기본값: 88]
 * @param {string} selectedType - 선택된 type을 외부에서 제어('all' 또는 product.type). 없으면 내부 상태 사용 [Optional]
 * @param {function} onTypeChange - type 변경 핸들러 (type) => void. 외부 제어/복원용 [Optional]
 * @param {function} onProductClick - 카드 클릭 시 (product, event)로 호출 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductShowcase time={ time } onProductClick={ (p) => navigate(`/product/${p.id}`) } />
 */
export function ProductShowcase({
  products = defaultProducts,
  time = 0,
  centerSize = 10,
  columns = { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
  spacing = 1,
  stickyTop = 88,
  isTransitionEnabled = true,
  transition,
  selectedType: controlledType,
  onTypeChange,
  onProductClick,
  sx,
  ...props
}) {
  const [internalType, setInternalType] = useState(ALL_TYPES);
  const selectedType = controlledType ?? internalType;
  const setSelectedType = (type) => {
    setInternalType(type);
    onTypeChange?.(type);
  };
  const isCompact = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const filteredProducts = useMemo(
    () => (selectedType === ALL_TYPES ? products : products.filter(({ type }) => type === selectedType)),
    [products, selectedType],
  );

  return (
    <StickyAsideCenterLayout
      aside={ (
        <ProductFilter
          selected={ selectedType }
          onChange={ setSelectedType }
          products={ products }
          orientation={ isCompact ? 'horizontal' : 'vertical' }
        />
      ) }
      centerSize={ centerSize }
      spacing={ spacing }
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
