import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LineGrid from '../layout/LineGrid';
import { BrandValueCard } from '../card/BrandValueCard';
import content from '../../data/content';

/**
 * BrandValueSection 컴포넌트
 *
 * 브랜드 3가치(Immanence / Continuity / Flexibility)를 BrandValueCard로 나란히 보여주고
 * 카드 사이에 LineGrid 1px 라인을 넣는다.
 *
 * 동작 방식:
 * 1. features를 순회하며 BrandValueCard를 ghost 스타일로 렌더링 (구분은 LineGrid 라인이 담당)
 * 2. 데스크탑(md 이상): 한 줄에 균등 분할 (3개면 4칼럼씩) / 모바일(md 미만): 세로로 쌓이며 카드 사이 가로 라인
 * 3. 라인 색은 theme의 text.primary를 따른다
 *
 * Props:
 * @param {object[]} features - [{ id, icon, title, description, detailedDescription }] [Optional, 기본값: content.brandValue.features]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <BrandValueSection />
 */
export function BrandValueSection({ features = content.brandValue.features, sx }) {
  const span = Math.max(1, Math.floor(12 / features.length));

  return (
    <Box sx={ { width: '100%', ...sx } }>
      <LineGrid container gap={ 0 }>
        { features.map(({ id, ...feature }) => (
          <Grid key={ id } size={ { xs: 12, md: span } }>
            <BrandValueCard variant="ghost" { ...feature } />
          </Grid>
        )) }
      </LineGrid>
    </Box>
  );
}
