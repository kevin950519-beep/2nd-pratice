import { useState } from 'react';
import Box from '@mui/material/Box';
import { HorizontalScrollContainer } from '../content-transition/HorizontalScrollContainer';
import VideoScrubbing from '../scroll/VideoScrubbing';
import { elevationSet1Video, elevationSet2Video, elevationSet3Video } from '../../assets/elevation';
import content from '../../data/content';

const { elevation } = content;

/** 기본 장면: 순서대로 재생될 영상 + 캡션 */
const sceneVideos = [elevationSet1Video, elevationSet2Video, elevationSet3Video];
const defaultScenes = elevation.scenes.map((scene, index) => ({ ...scene, src: sceneVideos[index] }));

const clamp01 = (value) => Math.max(0, Math.min(1, value));

/**
 * BrandElevationSection 컴포넌트
 *
 * 세로 스크롤을 가로 이동으로 바꾸는 HorizontalScrollContainer 안에서
 * 입면(elevation) 영상들을 스크롤 진행도에 맞춰 순서대로 스크러빙 재생한다.
 *
 * 동작 방식:
 * 1. 장면(scenes) 하나당 영상 한 개가 100vw x 100vh를 빈틈없이 채우는 슬라이드 한 장 (objectFit: cover, 화면 비율이 영상과 다르면 가장자리가 잘림), 가로 스크롤 끝까지 이동
 * 2. 전체 가로 스크롤 진행도(0~1)를 장면 수로 균등 분할해 각 영상의 진행도로 변환
 *    - 예: 3장면이면 0~1/3 구간에 영상 1, 1/3~2/3 구간에 영상 2, 2/3~1 구간에 영상 3이 처음부터 끝까지 재생 (순차 재생)
 *    - 자기 구간 이전에는 첫 프레임, 이후에는 마지막 프레임에 머문다
 * 3. 텍스트 없이 영상만 표시
 * 4. 섹션 높이는 HorizontalScrollContainer가 계산하므로 페이지 안에서 그대로 이어 붙이면 된다
 *
 * Props:
 * @param {object[]} scenes - [{ id, src }] 순차 재생 순서 [Optional, 기본값: content.elevation + assets/elevation set1, set2, set3]
 * @param {string} backgroundColor - 슬라이드 뒤 배경색 [Optional, 기본값: 'common.black']
 *
 * Example usage:
 * <BrandElevationSection />
 */
export function BrandElevationSection({ scenes = defaultScenes, backgroundColor = '#000' }) {
  const [progress, setProgress] = useState(0);
  const sceneCount = scenes.length;

  return (
    <HorizontalScrollContainer backgroundColor={ backgroundColor } onScrollProgress={ setProgress }>
      { scenes.map(({ id, src }, index) => {
        const sceneProgress = clamp01(progress * sceneCount - index);

        return (
          <HorizontalScrollContainer.Slide key={ id }>
            <Box sx={ { width: '100vw', height: '100vh', overflow: 'hidden' } }>
              <VideoScrubbing
                src={ src }
                progress={ sceneProgress }
                sx={ { width: '100%', height: '100vh', objectFit: 'cover' } }
              />
            </Box>
          </HorizontalScrollContainer.Slide>
        );
      }) }
    </HorizontalScrollContainer>
  );
}
