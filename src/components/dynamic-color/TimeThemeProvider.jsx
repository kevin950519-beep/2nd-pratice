import { useLayoutEffect, useRef } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { getTimelineTheme } from '../../styles/themes/timelineThemes';
import { getThemeMode } from '../../utils/timeline';
import { useTimeline } from './useTimeline';

/** 테마 전환 직후 색 트랜지션 클래스를 유지하는 시간(ms). duration.slow(600)보다 약간 길게 */
const TRANSITION_CLASS_MS = 700;
const TRANSITION_CLASS = 'theme-transition';

/**
 * TimeThemeProvider 컴포넌트
 *
 * 전역 시간 값(useTimeline)에 따라 사이트 전체 테마를 적용한다.
 * - 배경: 12 / 16 / 20 / 24시 4단계 (palette.timeline)
 * - UI 색(글자 등): 18시 기준 라이트 ↔ 다크 즉시 전환
 * - 전환 직후 0.6초(duration.slow, easing.smooth) 동안만 배경·글자·테두리 색이 부드럽게 바뀐다
 * - <html>에 data-theme / color-scheme을 반영해 스크롤바·폼 컨트롤도 따라간다
 * - prefers-reduced-motion에서는 전환 없이 즉시 반영
 *
 * Props:
 * @param {node} children - 하위 요소 [Required]
 *
 * Example usage:
 * <TimelineProvider><TimeThemeProvider><App /></TimeThemeProvider></TimelineProvider>
 */
export function TimeThemeProvider({ children }) {
  const { time } = useTimeline();
  const theme = getTimelineTheme(time);
  const mode = getThemeMode(time);
  const background = theme.palette.background.default;
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = mode;
    root.style.colorScheme = mode;
  }, [mode]);

  /* 색이 바뀌는 같은 프레임에 전환 클래스가 적용되도록 paint 전(layout)에 추가한다 */
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }
    const root = document.documentElement;
    root.classList.add(TRANSITION_CLASS);
    const timer = setTimeout(() => root.classList.remove(TRANSITION_CLASS), TRANSITION_CLASS_MS);
    return () => clearTimeout(timer);
  }, [background, mode]);

  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <GlobalStyles
        styles={ (t) => ({
          [`html.${TRANSITION_CLASS} body, html.${TRANSITION_CLASS} body *`]: {
            transition: ['background-color', 'color', 'border-color', 'fill']
              .map((property) => t.transitions.create(property, {
                duration: t.transitions.duration.slow,
                easing: t.transitions.easing.smooth,
              }))
              .join(', '),
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          },
        }) }
      />
      { children }
    </ThemeProvider>
  );
}
