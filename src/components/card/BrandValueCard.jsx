import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Activity, CircleDot, Repeat } from 'lucide-react';
import { CardContainer } from './CardContainer';

/** content.js의 brandValue.features[].icon 이름 → lucide 아이콘 */
const ICONS = { CircleDot, Repeat, Activity };

/**
 * BrandValueCard 컴포넌트
 *
 * 브랜드 가치(Immanence / Continuity / Flexibility) 한 항목을 보여주는 카드.
 * data/content.js의 brandValue.features 항목을 그대로 펼쳐서 사용한다. CardContainer 기반.
 *
 * 동작 방식:
 * 1. 상단에 아이콘, 그 아래 제목(h5), 영문 한 줄 설명(subtitle2) 순으로 표시
 * 2. detailedDescription이 있으면 하단에 본문(body2)으로 표시
 * 3. icon 이름이 등록되지 않았으면 아이콘 없이 렌더링
 *
 * Props:
 * @param {string} title - 가치 이름 [Required]
 * @param {string} description - 한 줄 설명 [Optional]
 * @param {string} detailedDescription - 상세 설명 [Optional]
 * @param {string} icon - 아이콘 이름 ('CircleDot' | 'Repeat' | 'Activity') [Optional]
 * @param {string} variant - CardContainer variant ('outlined' | 'elevation' | 'ghost' | 'filled') [Optional, 기본값: 'outlined']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <BrandValueCard { ...content.brandValue.features[0] } />
 */
export function BrandValueCard({
  title,
  description,
  detailedDescription,
  icon,
  variant = 'outlined',
  sx,
  ...props
}) {
  const Icon = ICONS[icon];

  return (
    <CardContainer
      variant={ variant }
      padding="lg"
      sx={ { height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5, ...sx } }
      { ...props }
    >
      { Icon && (
        <Box sx={ { color: 'text.primary', display: 'flex', mb: 1 } }>
          <Icon size={ 28 } strokeWidth={ 1.5 } aria-hidden />
        </Box>
      ) }
      <Typography variant="h5" component="h3" sx={ { fontWeight: 700 } }>
        { title }
      </Typography>
      { description && (
        <Typography variant="subtitle2" sx={ { color: 'text.secondary' } }>
          { description }
        </Typography>
      ) }
      { detailedDescription && (
        <Typography variant="body2" sx={ { mt: 1 } }>
          { detailedDescription }
        </Typography>
      ) }
    </CardContainer>
  );
}
