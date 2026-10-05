import { useContext } from 'react';
import { SharedElementContext } from './sharedElementContext';

/**
 * Shared Element 전환 컨텍스트 훅
 * @returns {{ begin: function, arrive: function, capture: function, playReturn: function }}
 *  - begin({ key, images, rect }): 출발지(카드)에서 전환 시작
 *  - arrive(key, rect): 도착지(상세 히어로)가 마운트되며 도착 좌표를 알림
 *  - capture({ key, images, rect }): 도착지가 사라질 때 마지막 좌표를 저장(역방향용)
 *  - playReturn(): 되돌아온 화면에서 출발지 카드 좌표를 찾아 역방향 재생
 */
export function useSharedElement() {
  return useContext(SharedElementContext);
}
