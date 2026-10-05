import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { CustomCard } from './CustomCard';

/**
 * ProductCard 컴포넌트
 *
 * 제품 쇼케이스 그리드용 카드. CustomCard를 확장하여 구현.
 * Day / Night 이미지 쌍을 시간 값(0~1)으로 블렌드해 "공간의 한 단면"처럼 보여준다.
 *
 * 동작 방식:
 * 1. images[0] (Day) 위에 images[1] (Night)을 겹쳐 time 값만큼 opacity 블렌드
 * 2. 이미지가 1장뿐이면 블렌드 없이 단일 이미지 표시
 * 3. hover 시 카드가 살짝 떠오르고 이미지가 미세하게 확대
 * 4. 하단에 type Chip, 제품명, 조도·색온도 메타(중앙점 구분) 순으로 표시
 *
 * Props:
 * @param {string} title - 제품명 [Required]
 * @param {string[]} images - [Day, Night] 이미지 URL 배열 [Required]
 * @param {string} type - 제품 타입 (제목 위 Chip으로 표시) [Optional]
 * @param {number} lux - 조도(lx) [Optional]
 * @param {number} kelvin - 색온도(K) [Optional]
 * @param {number} time - 시간 값 0(Day) ~ 1(Night) [Optional, 기본값: 0]
 * @param {string} mediaRatio - 이미지 비율 [Optional, 기본값: '4/5']
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
  mediaRatio = '4/5',
  onClick,
  sx,
  ...props
}) {
  const [dayImage, nightImage] = images;
  const clampedTime = Math.min(1, Math.max(0, time));

  const imageSx = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const media = (
    <Box sx={ { position: 'relative', width: '100%', aspectRatio: mediaRatio, bgcolor: 'grey.100' } }>
      { dayImage && <Box component="img" src={ dayImage } alt={ title } sx={ imageSx } /> }
      { dayImage && nightImage && (
        <Box
          component="img"
          src={ nightImage }
          alt=""
          aria-hidden
          sx={ { ...imageSx, opacity: clampedTime } }
        />
      ) }
    </Box>
  );

  const hasMeta = lux != null || kelvin != null;

  return (
    <CustomCard
      layout="vertical"
      mediaSlot={ media }
      contentPadding="sm"
      hoverLift={ 4 }
      hoverMediaScale={ 1.03 }
      onClick={ onClick }
      sx={ { cursor: onClick ? 'pointer' : 'default', ...sx } }
      {...props}
    >
      { type && (
        <Chip label={ type } size="small" variant="filled" sx={ { mb: 1, height: 20, fontSize: '0.7rem', bgcolor: 'common.black', color: 'common.white' } } />
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
