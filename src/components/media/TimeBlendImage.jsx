import Box from '@mui/material/Box';

/**
 * TimeBlendImage 컴포넌트
 *
 * 같은 장면의 Day / Night 이미지 쌍을 시간 값(0~1)으로 블렌드해 보여주는 이미지.
 * 전역 시간 시스템(낮밤 블렌딩)의 이미지 프리미티브로, ProductCard · HeroSection 등이 공유한다.
 *
 * 동작 방식:
 * 1. images[0] (Day) 위에 images[1] (Night)을 겹쳐 time 값만큼 opacity 블렌드
 *    - time이 바뀌면 0.6초(theme duration.slow) easeInOutSine(easing.smooth)으로 부드럽게 전환
 *    - 정오(0) · 16시(1/3) · 20시(2/3) · 자정(1) 구간은 Day/Night 혼합 비율로 표현
 *    - prefers-reduced-motion 환경에서는 opacity 전환 없이 즉시 반영
 * 2. 이미지가 1장뿐이면 블렌드 없이 단일 이미지 표시
 * 3. 두 이미지는 컨테이너를 꽉 채운다. 컨테이너 크기는 ratio(비율) 또는 부모 높이(ratio='auto' + height)로 정한다
 *
 * Props:
 * @param {string[]} images - [Day, Night] 이미지 URL 배열 [Required]
 * @param {string} alt - Day 이미지 대체 텍스트 (Night는 장식용으로 숨김) [Optional, 기본값: '']
 * @param {number} time - 시간 값 0(Day) ~ 1(Night) [Optional, 기본값: 0]
 * @param {string|object} ratio - 컨테이너 비율 ('w/h', 'auto', 반응형 객체 { xs, md }) [Optional, 기본값: 'auto']
 * @param {string} fit - 이미지 맞춤 방식 ('cover' | 'contain') [Optional, 기본값: 'cover']
 * @param {object} sx - 추가 스타일 (height, bgcolor 등) [Optional]
 *
 * Example usage:
 * <TimeBlendImage images={ [day, night] } alt="거실" time={ time } ratio="3/2" />
 */
export function TimeBlendImage({
  images = [],
  alt = '',
  time = 0,
  ratio = 'auto',
  fit = 'cover',
  sx,
}) {
  const [dayImage, nightImage] = images;
  const clampedTime = Math.min(1, Math.max(0, time));

  const imageSx = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: fit,
  };

  return (
    <Box sx={ [{ position: 'relative', width: '100%', aspectRatio: ratio }, ...(Array.isArray(sx) ? sx : [sx])] }>
      { dayImage && <Box component="img" src={ dayImage } alt={ alt } sx={ imageSx } /> }
      { dayImage && nightImage && (
        <Box
          component="img"
          src={ nightImage }
          alt=""
          aria-hidden
          sx={ (theme) => ({
            ...imageSx,
            opacity: clampedTime,
            willChange: 'opacity',
            // CustomCard의 `.custom-card-media img` transition(opacity 600ms ease-out)보다 우선하도록 특이도를 높인다
            '&&&': {
              transition: [
                'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                theme.transitions.create('opacity', {
                  duration: theme.transitions.duration.slow,
                  easing: theme.transitions.easing.smooth,
                }),
              ].join(', '),
              '@media (prefers-reduced-motion: reduce)': { transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' },
            },
          }) }
        />
      ) }
    </Box>
  );
}
