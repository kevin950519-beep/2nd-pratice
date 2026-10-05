import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SharedElementContext } from './sharedElementContext';
import { SharedElementOverlay } from './SharedElementOverlay';

/** 도착지가 나타나지 않을 때 오버레이를 정리하기까지의 대기 시간(ms) */
const ARRIVE_TIMEOUT_MS = 1500;

/** 좌표가 화면 안에 일부라도 보이는지 */
const isVisible = (rect) => rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;

/**
 * SharedElementProvider 컴포넌트
 *
 * 공간 전이(Shared Element) 전역 레이어. 목록의 이미지가 상세의 히어로 위치로 같은 대상인 채로 이동하고,
 * 뒤로가기 시에는 역방향으로 재생된다. 전환 상태(키 · 좌표 · 방향)는 휘발되며 저장하지 않는다.
 *
 * 동작 방식:
 * 1. 정방향: 카드에서 begin(출발 좌표) → 상세 히어로가 마운트되며 arrive(도착 좌표) → 오버레이가 이동 후 제거
 * 2. 역방향: 상세 히어로가 사라질 때 capture(마지막 좌표) → 목록 복귀 후 playReturn()이 카드 좌표를 찾아 이동
 * 3. 도착지/카드가 화면에 없으면 이동 없이 정리
 *
 * Props:
 * @param {node} children - 하위 요소 [Required]
 *
 * Example usage:
 * <SharedElementProvider><App /></SharedElementProvider>
 */
export function SharedElementProvider({ children }) {
  const [transition, setTransition] = useState(null);
  const pendingReturn = useRef(null);
  const hiddenCard = useRef(null);

  const end = useCallback(() => {
    /* 역방향 중 숨겨 둔 카드 이미지를 되돌린다 */
    if (hiddenCard.current) {
      hiddenCard.current.style.visibility = '';
      hiddenCard.current = null;
    }
    setTransition(null);
  }, []);

  const begin = useCallback(({ key, images, rect }) => {
    pendingReturn.current = null;
    setTransition({ key, images, from: rect, to: null, direction: 'forward' });
  }, []);

  const arrive = useCallback((key, rect) => {
    setTransition((current) => (current && current.key === key && current.direction === 'forward' && !current.to
      ? { ...current, to: rect }
      : current));
  }, []);

  const capture = useCallback(({ key, images, rect }) => {
    pendingReturn.current = { key, images, from: rect };
  }, []);

  const playReturn = useCallback(() => {
    const pending = pendingReturn.current;
    pendingReturn.current = null;
    if (!pending || !isVisible(pending.from)) return;

    const card = document.querySelector(`[data-shared-key="${pending.key}"]`);
    const target = card?.getBoundingClientRect();
    if (!target || !isVisible(target)) return;

    /* 도착지 카드는 오버레이가 덮을 때까지 숨겨 같은 이미지가 둘로 보이지 않게 한다 */
    card.style.visibility = 'hidden';
    hiddenCard.current = card;
    setTransition({ ...pending, to: target, direction: 'back' });
  }, []);

  /* 정방향 도착지가 끝내 나타나지 않으면(없는 제품 등) 오버레이를 정리한다 */
  useEffect(() => {
    if (!transition || transition.to) return undefined;
    const timer = setTimeout(end, ARRIVE_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [transition, end]);

  const activeKey = transition?.key ?? null;
  const activeDirection = transition?.direction ?? null;
  const value = useMemo(
    () => ({ begin, arrive, capture, playReturn, activeKey, activeDirection }),
    [begin, arrive, capture, playReturn, activeKey, activeDirection],
  );

  return (
    <SharedElementContext.Provider value={ value }>
      { children }
      { transition && <SharedElementOverlay transition={ transition } onComplete={ end } /> }
    </SharedElementContext.Provider>
  );
}
