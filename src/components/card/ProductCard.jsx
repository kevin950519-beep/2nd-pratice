import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { CustomCard } from './CustomCard';
import { TimeBlendImage } from '../media/TimeBlendImage';

/**
 * ProductCard 컴포넌트
 *
 * 제품 쇼케이스 그리드용 카드. CustomCard를 확장하여 구현.
 * Day / Night 이미지 쌍을 시간 값(0~1)으로 블렌드해 "공간의 한 단면"처럼 보여준다.
 *
 * 동작 방식:
 * 1. Day / Night 이미지 블렌딩은 TimeBlendImage에 위임 (time 변경 시 0.6초 smooth 전환, 이미지 1장이면 블렌드 없음)
 * 2. 이미지 영역은 contain으로 표시
 * 3. 평소엔 테두리가 보이지 않고(투명), hover 시 테두리 라인 표시 + 카드가 살짝 떠오르고 이미지가 미세하게 확대
 * 4. 하단에 type Chip, 제품명, 조도·색온도 메타(중앙점 구분) 순으로 표시
 *
 * Props:
 * @param {string} title - 제품명 [Required]
 * @param {string[]} images - [Day, Night] 이미지 URL 배열 [Required]
 * @param {string} type - 제품 타입 (제목 위 Chip으로 표시) [Optional]
 * @param {number} lux - 조도(lx) [Optional]
 * @param {number} kelvin - 색온도(K) [Optional]
 * @param {number} time - 시간 값 0(Day) ~ 1(Night) [Optional, 기본값: 0]
 * @param {string} mediaRatio - 이미지 비율 (에셋 원본 규격 1792x2400) [Optional, 기본값: '1792/2400']
 * @param {function} onClick - 카드 클릭 핸들러 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductCard
 *   title="Lumen Desk Pro"
 *   images={ product.images }
 *   type={ product.type }
 *   lux={ 260 }
 *   kelvin={ 3200 }
 *   time={ 0.5 }
 *   onClick={ () => navigate('/product/1') }
 * />
 */
export function ProductCard({
  title,
  images = [],
  type,
  lux,
  kelvin,
  time = 0,
  mediaRatio = '1792/2400',
  onClick,
  sx,
  ...props
}) {
  const media = (
    <TimeBlendImage
      images={ images }
      alt={ title }
      time={ time }
      ratio={ mediaRatio }
      fit="contain"
      sx={ { bgcolor: 'grey.100' } }
    />
  );

  const hasMeta = lux != null || kelvin != null;

  return (
    <CustomCard
      layout="vertical"
      mediaSlot={ media }
      mediaRatio="auto"
      contentPadding="sm"
      hoverLift={ 4 }
      hoverBorderColor="primary.main"
      hoverMediaScale={ 1.03 }
      onClick={ onClick }
      sx={ { cursor: onClick ? 'pointer' : 'default', borderColor: 'transparent', ...sx } }
      {...props}
    >
      { type && (
        <Chip label={ type } size="small" variant="filled" sx={ { mb: 1, height: 20, fontSize: '0.7rem', bgcolor: 'primary.main', color: 'primary.contrastText' } } />
      ) }
      <Typography variant="subtitle1" sx={ { fontWeight: 700 } }>
        { title }
      </Typography>
      { hasMeta && (
        <Typography variant="caption" sx={ { mt: 0.5, display: 'block', color: 'text.secondary' } }>
          { [lux != null && `${lux} lx`, kelvin != null && `${kelvin} K`].filter(Boolean).join(' · ') }
        </Typography>
      ) }
    </CustomCard>
  );
}
