import { createContext } from 'react';

/** 전역 시간 값 컨텍스트. Provider 밖에서는 Day(0) 고정 */
export const TimelineContext = createContext({ time: 0, setTime: () => {} });
