import { useCallback, useState } from 'react';

/**
 * sessionStorage에 값을 보관하는 useState. 새 세션(탭을 닫았다 열면)에서는 초기값으로 리셋된다.
 * 저장소에 접근할 수 없는 환경에서는 메모리 상태로만 동작한다.
 *
 * @param {string} key - 저장 키
 * @param {*} initialValue - 초기값 (JSON 직렬화 가능해야 함)
 * @returns {[*, function]} [value, setValue]
 */
export function useSessionState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.sessionStorage.getItem(key);
      return stored === null ? initialValue : JSON.parse(stored);
    } catch {
      return initialValue;
    }
  });

  const setAndStore = useCallback((next) => {
    setValue(next);
    try {
      window.sessionStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* 저장 불가 환경에서는 무시 */
    }
  }, [key]);

  return [value, setAndStore];
}
