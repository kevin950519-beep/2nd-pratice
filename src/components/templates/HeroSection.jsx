import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LineGrid from '../layout/LineGrid';
import { TimeBlendImage } from '../media/TimeBlendImage';
import { useTimeline } from '../dynamic-color/useTimeline';
import content from '../../data/content';

const { brand, hero } = content;

/** 기본 히어로 이미지: [좌측 와이드, 우측 세로]. ratio는 에셋 원본 규격(모바일 비율) */
const defaultImages = [
  { images: [hero.moodboard.hero, hero.moodboard.heroNight], alt: hero.moodboard.heroAlt, ratio: '2528/1696' },
  { images: [hero.moodboard.side, hero.moodboard.sideNight], alt: hero.moodboard.sideAlt, ratio: '1792/2400' },
];

/**
 * HeroSection 컴포넌트
 *
 * 랜딩 첫 화면. 공간 속 빛의 장면 두 컷을 LineGrid로 2:1(8:4 칼럼) 비율로 배치하고 사이에 1px 라인을 넣는다.
 * 데스크탑에서는 첫 번째(좌측) 이미지의 좌측 상단에 브랜드명과 태그라인을 올린다.
 *
 * 동작 방식:
 * 1. 데스크탑(md 이상): 좌측 이미지 8칼럼 / 우측 이미지 4칼럼 (2:1), 두 이미지의 높이가 같다
 *    - 기본 에셋(2528x1696 와이드 + 1792x2400 세로)은 이 비율에서 높이가 거의 일치해 잘림이 거의 없다
 * 2. 모바일(md 미만): 두 번째(세로) 이미지만 원본 비율로 사용하고, 브랜드명·태그라인도 이 이미지의 좌측 상단으로 이동한다
 * 3. 두 이미지는 TimeBlendImage로 전역 시간(useTimeline)에 맞춰 낮밤이 블렌딩된다 (time prop으로 직접 지정 가능)
 * 4. 브랜드명은 h2 토큰(브랜드 서체, 시맨틱은 h1)을 그대로 쓰고, 모바일(md 미만)에서는 h4 토큰을 적용한다. 태그라인은 body1 토큰
 *    브랜드명/태그라인 색은 theme의 text.primary를 따르며, 시간대 테마(라이트/다크)와 함께 바뀐다
 * 5. 라인 색은 theme의 text.primary를 따른다
 *
 * Props:
 * @param {string} title - 브랜드명 [Optional, 기본값: content.brand.name]
 * @param {string} tagline - 브랜드 태그라인 [Optional, 기본값: content.brand.tagline]
 * @param {object[]} images - [{ images: [Day, Night], alt, ratio }] 좌측·우측 2개. ratio는 'w/h' 문자열(모바일 비율) [Optional, 기본값: content.hero.moodboard]
 * @param {number} time - 시간 값 0(Day) ~ 1(Night) [Optional, 기본값: 전역 시간(useTimeline)]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <HeroSection />
 * <HeroSection title="Lumenstate" tagline="Light defines the space." time={ 0.5 } />
 */
export function HeroSection({
  title = brand.name,
  tagline = brand.tagline,
  images = defaultImages,
  time,
  sx,
}) {
  const { time: globalTime } = useTimeline();
  const currentTime = time ?? globalTime;
  const [left, right] = images;

  /** 브랜드명 + 태그라인. 데스크탑은 좌측 이미지, 모바일은 우측(세로) 이미지 위에 올린다 */
  const renderTitleBlock = (visibleFrom) => (
    <Box
      sx={ {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        p: { xs: 3, md: 5 },
        display: visibleFrom === 'md' ? { xs: 'none', md: 'block' } : { xs: 'block', md: 'none' },
      } }
    >
      <Typography
        variant="h2"
        component="h1"
        sx={ (theme) => ({
          // 데스크탑(md 이상)은 h2 토큰 그대로, 모바일(md 미만)은 h4 토큰 적용
          [theme.breakpoints.down('md')]: { ...theme.typography.h4 },
          color: 'text.primary',
        }) }
      >
        { title }
      </Typography>
      <Typography variant="body1" sx={ { mt: { xs: 1, md: 2 }, color: 'text.primary' } }>
        { tagline }
      </Typography>
    </Box>
  );

  return (
    <Box sx={ { width: '100%', ...sx } }>
      <LineGrid container gap={ 0 }>
        { /* 모바일에서는 두 번째 이미지만 사용 */ }
        <Grid size={ { xs: 12, md: 8 } } sx={ { display: { xs: 'none', md: 'block' } } }>
          <TimeBlendImage images={ left.images } alt={ left.alt } time={ currentTime } ratio={ left.ratio } />
          { renderTitleBlock('md') }
        </Grid>
        <Grid size={ { xs: 12, md: 4 } } sx={ { overflow: 'hidden', '&::after': { display: { xs: 'none', md: 'block' } } } }>
          <TimeBlendImage
            images={ right.images }
            alt={ right.alt }
            time={ currentTime }
            ratio={ { xs: right.ratio, md: 'auto' } }
            sx={ { height: { xs: 'auto', md: '100%' } } }
          />
          { renderTitleBlock('xs') }
        </Grid>
      </LineGrid>
    </Box>
  );
}
