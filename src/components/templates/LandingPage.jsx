import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TopSection } from './TopSection';
import { BrandElevationSection } from './BrandElevationSection';
import { ProductShowcase } from './ProductShowcase';
import { useTimeline } from '../dynamic-color/useTimeline';
import content from '../../data/content';

const { products: productsContent } = content;

/**
 * LandingPage 컴포넌트
 *
 * 랜딩 페이지 전체. TopSection(Hero + Elevation + BrandValue) 아래에 섹션 제목과 ProductShowcase를 이어 붙인다.
 *
 * 동작 방식:
 * 1. 상단: TopSection (히어로 → 입면 영상 BrandElevationSection → 브랜드 3가치)
 * 2. 하단: content.products의 제목/부제(가운데 정렬) + ProductShowcase (타입 필터 + 제품 그리드)
 * 3. 전역 시간(useTimeline)을 TopSection과 ProductShowcase에 동일하게 전달해 같은 시각을 공유 (time prop으로 직접 지정 가능)
 *
 * Props:
 * @param {number} time - 시간 값 0(Day) ~ 1(Night) [Optional, 기본값: 전역 시간]
 * @param {object} topSectionProps - TopSection에 전달할 props [Optional]
 * @param {object} showcaseProps - ProductShowcase에 전달할 props [Optional]
 * @param {string} sectionTitle - 제품 섹션 제목 [Optional, 기본값: content.products.sectionTitle]
 * @param {string} sectionSubtitle - 제품 섹션 부제 [Optional, 기본값: content.products.sectionSubtitle]
 * @param {function} onProductClick - 제품 카드 클릭 핸들러 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <LandingPage onProductClick={ (p) => navigate(`/product/${p.id}`) } />
 */
export function LandingPage({
  time,
  topSectionProps,
  showcaseProps,
  sectionTitle = productsContent.sectionTitle,
  sectionSubtitle = productsContent.sectionSubtitle,
  onProductClick,
  sx,
}) {
  const { time: globalTime } = useTimeline();
  const currentTime = time ?? globalTime;

  return (
    <Box sx={ { width: '100%', ...sx } }>
      <TopSection time={ currentTime } afterHero={ <BrandElevationSection /> } { ...topSectionProps } />
      <Box id="collection" sx={ { width: '100%', px: { xs: 2, md: 4 }, py: { xs: 6, md: 10 }, scrollMarginTop: 64 } }>
        <Box sx={ { mb: { xs: 4, md: 6 }, textAlign: 'center' } }>
          <Typography variant="h3" component="h2">
            { sectionTitle }
          </Typography>
          <Typography variant="body1" sx={ { mt: 1, color: 'text.secondary' } }>
            { sectionSubtitle }
          </Typography>
        </Box>
        <ProductShowcase time={ currentTime } onProductClick={ onProductClick } { ...showcaseProps } />
      </Box>
    </Box>
  );
}
