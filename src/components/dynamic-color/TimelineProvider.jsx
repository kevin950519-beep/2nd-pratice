import { useMemo, useState } from 'react';
import { TimelineContext } from './timelineContext';

/**
 * TimelineProvider 컴포넌트
 *
 * 사이트 전체가 공유하는 전역 시간 값(0~1)을 제공한다. 값은 저장하지 않고 매번 initialTime에서 시작한다.
 * 하위에서는 useTimeline()으로 { time, setTime }을 구독한다.
 *
 * Props:
 * @param {number} initialTime - 시작 시간 값 0(정오) ~ 1(자정) [Optional, 기본값: 0]
 * @param {node} children - 하위 요소 [Required]
 *
 * Example usage:
 * <TimelineProvider><TimeThemeProvider><App /></TimeThemeProvider></TimelineProvider>
 */
export function TimelineProvider({ initialTime = 0, children }) {
  const [time, setTime] = useState(initialTime);
  const value = useMemo(() => ({ time, setTime }), [time]);

  return <TimelineContext.Provider value={ value }>{ children }</TimelineContext.Provider>;
}
