import { useContext } from 'react';
import { TimelineContext } from './timelineContext';

/**
 * 전역 시간 값 구독 훅
 * @returns {{ time: number, setTime: function }} time 0(정오/Day) ~ 1(자정/Night)
 */
export function useTimeline() {
  return useContext(TimelineContext);
}
