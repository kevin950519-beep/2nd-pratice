import { useLayoutEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useSharedElement } from './useSharedElement';

/**
 * SharedElementTarget 컴포넌트
 *
 * 공유 요소의 도착지(상세 히어로 이미지 영역). 마운트될 때 도착 좌표를 알리고,
 * 사라질 때 마지막 좌표를 저장해 뒤로가기(역방향) 전환에 쓴다.
 * 도착 좌표는 스크롤 0 기준(문서 좌표)으로 환산한다 — 페이지 진입 직후 스크롤이 맨 위로 이동하기 때문.
 *
 * Props:
 * @param {string|number} sharedKey - 출발지(카드)와 공유하는 키 (제품 id) [Required]
 * @param {string[]} images - [Day, Night] 이미지 (오버레이 클론용) [Required]
 * @param {node} children - 도착지 내용 (TimeBlendImage 등) [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SharedElementTarget sharedKey={ product.id } images={ product.images }>
 *   <TimeBlendImage images={ product.images } />
 * </SharedElementTarget>
 */
export function SharedElementTarget({ sharedKey, images, children, sx }) {
  const ref = useRef(null);
  const { arrive, capture, activeKey, activeDirection } = useSharedElement();
  /* 정방향 전환 중에는 오버레이가 이 자리로 도착할 때까지 도착지를 숨긴다 */
  const isHidden = activeDirection === 'forward' && String(activeKey) === String(sharedKey);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const rect = node.getBoundingClientRect();
    arrive(sharedKey, {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    });

    return () => {
      capture({ key: sharedKey, images, rect: node.getBoundingClientRect() });
    };
  }, [sharedKey, images, arrive, capture]);

  return <Box ref={ ref } sx={ [{ visibility: isHidden ? 'hidden' : 'visible' }, ...(Array.isArray(sx) ? sx : [sx])] }>{ children }</Box>;
}
