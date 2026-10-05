/**
 * MUI 내장 컴포넌트가 쓰는 기본 아이콘을 lucide로 교체하기 위한 테마용 아이콘 (defaultProps 전용)
 */
import { createElement } from 'react';
import {
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Info,
  Square,
  SquareCheck,
  SquareMinus,
  TriangleAlert,
  X,
} from 'lucide-react';
import { LucideIcon } from '../../common/ui/LucideIcon';

const icon = (component, props) => createElement(LucideIcon, { icon: component, ...props });

/** Select 화살표 (IconComponent는 컴포넌트 타입이 필요) */
export const SelectChevron = (props) => createElement(LucideIcon, { icon: ChevronDown, ...props });

export const chipDeleteIcon = icon(X, { fontSize: 'small' });

export const checkboxIcons = {
  icon: icon(Square),
  checkedIcon: icon(SquareCheck),
  indeterminateIcon: icon(SquareMinus),
};

export const alertIconMapping = {
  success: icon(CircleCheck, { fontSize: 'inherit' }),
  info: icon(Info, { fontSize: 'inherit' }),
  warning: icon(TriangleAlert, { fontSize: 'inherit' }),
  error: icon(CircleAlert, { fontSize: 'inherit' }),
};
