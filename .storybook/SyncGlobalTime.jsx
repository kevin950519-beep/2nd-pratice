import { useEffect } from 'react';
import { useTimeline } from '../src/components/dynamic-color';

/** 툴바 시간대 선택(globals.time)을 전역 time 상태에 동기화 */
export function SyncGlobalTime({ time, children }) {
  const { setTime } = useTimeline();

  useEffect(() => {
    setTime(time);
  }, [time, setTime]);

  return children;
}
