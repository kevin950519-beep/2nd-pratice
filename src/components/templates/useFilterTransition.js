import { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { animate, useReducedMotion } from 'framer-motion';

const EASE = [0.4, 0, 0.2, 1];
// 감속 꼬리가 긴 곡선: 사라지는 카드의 잔상이 끝까지 희미하게 남는다
const EXIT_EASE = [0.1, 0.6, 0.2, 1];
const MOVE_THRESHOLD = 0.5;

/**
 * 필터 전환 기본 설정 (초 / px)
 */
export const FILTER_TRANSITION_DEFAULTS = {
  exit: 0.6,
  moveX: 0.6,
  moveY: 0.6,
  enter: 0.8,
  blur: 8,
};

/**
 * 노드 fade 애니메이션 (opacity + blur)
 * WAAPI 커밋 시점의 깜빡임을 피하기 위해 값 애니메이션 + 직접 style 기록 방식 사용
 */
const fadeNode = (node, isIn, blur, duration) => animate(isIn ? 0 : 1, isIn ? 1 : 0, {
  duration,
  ease: isIn ? EASE : EXIT_EASE,
  onUpdate: (value) => {
    node.style.opacity = value;
    if (blur) node.style.filter = `blur(${(1 - value) * blur}px)`;
  },
});

/**
 * useFilterTransition 훅
 *
 * 목록이 필터링될 때 아이템 변화를 "연속적으로" 보여주는 전환 오케스트레이터.
 * Framer Motion layout 대신 FLIP을 직접 구현하여 가로/세로를 분리해 이동시킨다.
 *
 * 전환 시퀀스 (단계 간 겹침 없음, 아이템 간 시차 없음):
 * 1. Exit  - 사라질 아이템이 제자리에서 opacity/blur fade-out (이동 없음)
 * 2. Move  - 남는 아이템이 이전 슬롯 → 새 슬롯으로 가로(x) 이동 후 세로(y) 이동 (사선 이동 금지)
 * 3. Enter - 새 아이템이 최종 슬롯에서 opacity/blur fade-in (fade-in 전 이동 금지)
 *
 * 전환 중 목록이 또 바뀌면 중단하지 않고, 현재 전환을 끝낸 뒤 "최신 목록"으로 이어서 전환한다.
 * 애니메이션 값은 React 상태가 아닌 animate()로 직접 제어한다.
 *
 * Params:
 * @param {object[]} items - 목표 아이템 배열 [Required]
 * @param {function} getKey - 아이템 고유 키 추출 함수 [Optional, 기본값: (item) => item.id]
 * @param {boolean} isEnabled - 전환 사용 여부 (false면 즉시 교체) [Optional, 기본값: true]
 * @param {object} durations - { exit, moveX, moveY, enter, blur } 초/px [Optional]
 *
 * Returns:
 * @returns {{ rendered: object[], setNodeRef: function }}
 *   - rendered: [{ key, item, status('stay'|'enter'), style }] DOM에 렌더할 목록
 *   - setNodeRef: (key) => ref 콜백. 각 아이템 루트 DOM에 연결 [Required]
 *
 * Example usage:
 * const { rendered, setNodeRef } = useFilterTransition({ items: products });
 * rendered.map(({ key, item, style }) => <div key={ key } ref={ setNodeRef(key) } style={ style } />);
 */
export function useFilterTransition({
  items,
  getKey = (item) => item.id,
  isEnabled = true,
  durations,
}) {
  const isReduced = useReducedMotion();
  const options = { ...FILTER_TRANSITION_DEFAULTS, ...durations };
  const blur = isReduced ? 0 : options.blur;

  const [rendered, setRendered] = useState(() => (
    items.map((item) => ({ key: getKey(item), item, status: 'stay' }))
  ));

  const renderedRef = useRef(rendered);
  const targetRef = useRef(items);
  const nodesRef = useRef(new Map());
  const isRunningRef = useRef(false);
  const isCancelledRef = useRef(false);
  const latestRef = useRef({});
  latestRef.current = { getKey, isEnabled, options, blur, isMoveEnabled: !isReduced };

  const setNodeRef = (key) => (node) => {
    if (node) nodesRef.current.set(key, node);
    else nodesRef.current.delete(key);
  };

  const commit = (next) => {
    renderedRef.current = next;
    flushSync(() => setRendered(next));
  };

  const transition = async (current, target) => {
    const { getKey: keyOf, isEnabled: enabled, options: opt, blur: blurPx, isMoveEnabled } = latestRef.current;

    // effect 내부 동기 호출 중 flushSync 경고 방지
    await Promise.resolve();
    if (isCancelledRef.current) return;

    const currentKeys = new Set(current.map((entry) => entry.key));
    const targetKeys = new Set(target.map(keyOf));
    const toEntry = (item) => ({
      key: keyOf(item),
      item,
      status: currentKeys.has(keyOf(item)) ? 'stay' : 'enter',
    });

    if (!enabled) {
      commit(target.map((item) => ({ key: keyOf(item), item, status: 'stay' })));
      return;
    }

    // 1. Exit: 제자리 fade-out
    const exitNodes = current
      .filter((entry) => !targetKeys.has(entry.key))
      .map((entry) => nodesRef.current.get(entry.key))
      .filter(Boolean);

    if (exitNodes.length) {
      await Promise.all(exitNodes.map((node) => fadeNode(node, false, blurPx, opt.exit)));
      if (isCancelledRef.current) return;
    }

    // First: 이동 대상의 현재 위치 측정 (exit 아이템은 아직 DOM에 있음)
    const firstRects = new Map();
    current.forEach(({ key }) => {
      if (!targetKeys.has(key)) return;
      const node = nodesRef.current.get(key);
      if (node) firstRects.set(key, node.getBoundingClientRect());
    });

    // 목록 교체: exit 제거, enter는 최종 슬롯에 opacity 0으로 마운트
    commit(target.map(toEntry));

    // Last + Invert: 남는 아이템을 이전 위치에 시각적으로 고정
    const movers = [];
    if (isMoveEnabled) {
      firstRects.forEach((first, key) => {
        const node = nodesRef.current.get(key);
        if (!node) return;
        const last = node.getBoundingClientRect();
        const dx = first.left - last.left;
        const dy = first.top - last.top;
        if (Math.abs(dx) < MOVE_THRESHOLD && Math.abs(dy) < MOVE_THRESHOLD) return;
        node.style.transform = `translateX(${dx}px) translateY(${dy}px)`;
        animate(node, { x: dx, y: dy }, { duration: 0 });
        movers.push({ node, dx, dy });
      });
    }

    // 2-a. Move: 가로 이동
    const xMovers = movers.filter(({ dx }) => Math.abs(dx) >= MOVE_THRESHOLD);
    if (xMovers.length) {
      await Promise.all(xMovers.map(({ node }) => (
        animate(node, { x: 0 }, { duration: opt.moveX, ease: EASE })
      )));
      if (isCancelledRef.current) return;
    }

    // 2-b. Move: 세로 이동 (가로 이동이 모두 끝난 뒤)
    const yMovers = movers.filter(({ dy }) => Math.abs(dy) >= MOVE_THRESHOLD);
    if (yMovers.length) {
      await Promise.all(yMovers.map(({ node }) => (
        animate(node, { y: 0 }, { duration: opt.moveY, ease: EASE })
      )));
      if (isCancelledRef.current) return;
    }

    // 3. Enter: 이동 없이 제자리 fade-in (모든 이동이 끝난 뒤)
    const enterNodes = target
      .filter((item) => !currentKeys.has(keyOf(item)))
      .map((item) => nodesRef.current.get(keyOf(item)))
      .filter(Boolean);

    if (enterNodes.length) {
      await Promise.all(enterNodes.map((node) => fadeNode(node, true, blurPx, opt.enter)));
      if (isCancelledRef.current) return;
      // 마운트 시 부여한 숨김 인라인 스타일 해제 (opacity 1, filter 없음)
      enterNodes.forEach((node) => {
        node.style.opacity = '';
        node.style.filter = '';
      });
    }
  };

  const run = async () => {
    isRunningRef.current = true;
    try {
      // 전환 중 들어온 최신 목록은 현재 전환이 끝난 뒤 이어서 처리
      while (!isCancelledRef.current) {
        const target = targetRef.current;
        const current = renderedRef.current;
        const { getKey: keyOf } = latestRef.current;
        const isSame = current.length === target.length
          && current.every((entry, index) => entry.key === keyOf(target[index]));
        if (isSame) break;
        await transition(current, target);
      }
    } finally {
      isRunningRef.current = false;
    }
  };

  useEffect(() => {
    isCancelledRef.current = false;
    return () => { isCancelledRef.current = true; };
  }, []);

  useEffect(() => {
    targetRef.current = items;
    if (!isRunningRef.current) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // 구조 변화가 없는 prop 갱신(lux 등)을 반영하기 위해 최신 item으로 치환
  const result = useMemo(() => {
    const latest = new Map(items.map((item) => [getKey(item), item]));
    return rendered.map((entry) => ({
      ...entry,
      item: latest.get(entry.key) ?? entry.item,
      style: entry.status === 'enter' && isEnabled
        ? { opacity: 0, ...(blur > 0 && { filter: `blur(${blur}px)` }) }
        : undefined,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendered, items, isEnabled, blur]);

  return { rendered: result, setNodeRef };
}
