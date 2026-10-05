import { useMemo } from 'react';
import { CategoryTab } from '../in-page-navigation/CategoryTab';
import defaultProducts from '../../data/products';

/** 전체 보기 필터 ID */
export const ALL_TYPES = 'all';

/**
 * ProductFilter 컴포넌트
 *
 * 제품 type별 필터. CategoryTab을 vertical로 사용한다.
 * products에 존재하는 type만 등장 순서대로 나열하며 각 탭에 제품 수를 함께 표시한다.
 *
 * Props:
 * @param {string} selected - 현재 선택된 type ('all' 또는 product.type) [Required]
 * @param {function} onChange - 변경 핸들러 (type) => void [Required]
 * @param {object[]} products - 필터 기준 제품 배열 [Optional, 기본값: data/products.js 전체]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductFilter selected={ type } onChange={ setType } />
 */
export function ProductFilter({ selected, onChange, products = defaultProducts, sx }) {
  const categories = useMemo(() => {
    const counts = products.reduce((acc, { type }) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    return [
      { id: ALL_TYPES, label: `All (${products.length})` },
      ...Object.entries(counts).map(([type, count]) => ({
        id: type,
        label: `${type} (${count})`,
      })),
    ];
  }, [products]);

  return (
    <CategoryTab
      categories={ categories }
      selected={ selected }
      onChange={ onChange }
      orientation="vertical"
      sx={ sx }
    />
  );
}
