import SvgIcon from '@mui/material/SvgIcon';

/**
 * LucideIcon 컴포넌트
 *
 * 프로젝트 기본 아이콘(lucide-react)을 MUI SvgIcon으로 감싼 래퍼.
 * MUI 아이콘과 같은 방식으로 fontSize / color / sx를 쓸 수 있다(기본 1.5rem).
 * 선 굵기는 기본 1px이며, 아이콘 크기와 무관하게 화면에서 항상 같은 굵기로 그려진다(non-scaling-stroke).
 *
 * Props:
 * @param {elementType} icon - lucide-react 아이콘 컴포넌트 (예: Search) [Required]
 * @param {string} fontSize - 크기 ('inherit' | 'small' | 'medium' | 'large') [Optional, 기본값: 'medium']
 * @param {number} strokeWidth - 선 굵기(px, 크기와 무관하게 고정) [Optional, 기본값: 1]
 * @param {boolean} isFilled - 면 채움 여부 (별점·좋아요 등 활성 상태) [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 (fontSize, color 등) [Optional]
 *
 * Example usage:
 * <LucideIcon icon={ Search } fontSize="small" />
 * <LucideIcon icon={ Star } isFilled sx={ { color: 'warning.main' } } />
 */
export function LucideIcon({ icon, strokeWidth = 1, isFilled = false, sx, ...props }) {
  return (
    <SvgIcon
      component={ icon }
      strokeWidth={ strokeWidth }
      sx={ [
        // MUI SvgIcon의 `fill: currentColor`는 선 아이콘을 칠해 버리므로 기본은 none
        {
          fill: isFilled ? 'currentColor' : 'none',
          stroke: 'currentColor',
          // viewBox 확대/축소와 상관없이 선 굵기를 화면 px로 고정
          '& *': { vectorEffect: 'non-scaling-stroke' },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ] }
      { ...props }
    />
  );
}
