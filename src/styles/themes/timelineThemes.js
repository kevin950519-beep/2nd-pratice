/**
 * Timeline Themes
 *
 * 하루 4개 시간대(12 / 16 / 20 / 24시) 각각의 MUI 테마.
 * - 글자·구분선·액션 등 UI 색: 라이트(12·16시) / 다크(20·24시) 2종 (18시 기준 즉시 전환)
 * - 배경(background.default / paper): palette.timeline 4색 (낮색↔밤색 선형 혼합)
 *
 * 테마는 모듈 로드 시 한 번만 만들고, 이후에는 선택만 한다.
 */

import { createTheme } from '@mui/material/styles';
import {
  palette as lightPalette,
  typography,
  spacing,
  shape,
  shadows as lightShadows,
  breakpoints,
  zIndex,
  transitions,
  buildComponents,
} from './default';
import { darkPalette, darkShadows } from './darkTheme';
import { TIMELINE_STOPS, getNearestStop } from '../../utils/timeline';

const MODE_SOURCE = {
  light: { palette: lightPalette, shadows: lightShadows },
  dark: { palette: darkPalette, shadows: darkShadows },
};

/**
 * 시간대 앵커에 해당하는 테마 생성
 * @param {object} stop - TIMELINE_STOPS 항목
 */
const buildStopTheme = ({ key, mode }) => {
  const source = MODE_SOURCE[mode];
  const background = lightPalette.timeline[key];
  const palette = {
    ...source.palette,
    background: { default: background, paper: background },
  };

  return createTheme({
    palette,
    typography,
    spacing,
    shape,
    shadows: source.shadows,
    breakpoints,
    zIndex,
    transitions,
    components: buildComponents(palette),
  });
};

/** 시간대 key별 테마 { noon, afternoon, evening, midnight } */
export const timelineThemes = Object.fromEntries(
  TIMELINE_STOPS.map((stop) => [stop.key, buildStopTheme(stop)]),
);

/**
 * time(0~1)에 가장 가까운 시간대의 테마 반환
 * @param {number} time - 0~1
 * @returns {object} MUI 테마
 */
export const getTimelineTheme = (time) => timelineThemes[getNearestStop(time).key];
