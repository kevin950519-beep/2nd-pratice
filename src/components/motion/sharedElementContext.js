import { createContext } from 'react';

/** Shared Element 전환 컨텍스트. Provider 밖에서는 모든 동작이 no-op */
export const SharedElementContext = createContext({
  begin: () => {},
  arrive: () => {},
  capture: () => {},
  playReturn: () => {},
  activeKey: null,
  activeDirection: null,
});
