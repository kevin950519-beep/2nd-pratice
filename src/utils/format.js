/**
 * 금액을 원화 표기로 변환
 * @param {number} value - 금액(원)
 * @returns {string} 예: '₩290,000'
 */
export function formatPrice(value) {
  return `₩${Number(value || 0).toLocaleString('ko-KR')}`;
}
