import Box from '@mui/material/Box';
import LineGrid from '../layout/LineGrid';
import { HeroSection } from './HeroSection';
import { BrandValueSection } from './BrandValueSection';

/**
 * TopSection 컴포넌트
 *
 * 랜딩 최상단 섹션. HeroSection 아래에 BrandValueSection을 이어 붙이고
 * 두 섹션 사이에 LineGrid 1px 라인을 넣는다.
 *
 * 동작 방식:
 * 1. LineGrid(스택 모드)로 HeroSection → BrandValueSection 순서로 세로 배치
 * 2. time을 넘기면 HeroSection에 전달, 생략하면 HeroSection이 전역 시간(useTimeline)을 사용
 * 3. 각 섹션의 세부 설정은 heroProps / brandValueProps로 전달
 *
 * Props:
 * @param {number} time - 시간 값 0(Day) ~ 1(Night) [Optional, 기본값: 전역 시간]
 * @param {object} heroProps - HeroSection에 전달할 props [Optional]
 * @param {object} brandValueProps - BrandValueSection에 전달할 props [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <TopSection />
 * <TopSection heroProps={ { title: 'Lumenstate' } } />
 */
export function TopSection({ time, heroProps, brandValueProps, sx }) {
  return (
    <Box sx={ { width: '100%', ...sx } }>
      <LineGrid>
        <HeroSection time={ time } { ...heroProps } />
        <BrandValueSection { ...brandValueProps } />
      </LineGrid>
    </Box>
  );
}
