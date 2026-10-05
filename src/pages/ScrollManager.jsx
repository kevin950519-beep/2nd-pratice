import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { useSharedElement } from '../components/motion/useSharedElement';

const KEY_PREFIX = 'lumenstate-scroll:';

const readScroll = (pathname) => {
  try {
    return Number(window.sessionStorage.getItem(KEY_PREFIX + pathname)) || 0;
  } catch {
    return 0;
  }
};

const writeScroll = (pathname, value) => {
  try {
    window.sessionStorage.setItem(KEY_PREFIX + pathname, String(value));
  } catch {
    /* 저장 불가 환경에서는 복원 없이 동작 */
  }
};

/**
 * ScrollManager 컴포넌트
 *
 * 라우팅과 연동된 스크롤 복원 (렌더링 결과 없음). 세션 단위(sessionStorage)로 경로별 스크롤을 저장한다.
 *
 * 동작 방식:
 * 1. 스크롤할 때마다 현재 경로의 위치를 저장한다 (rAF 단위로 간격 조절)
 * 2. 새 페이지로 이동(PUSH/REPLACE)하면 맨 위로, 뒤로/앞으로가기(POP)이면 저장된 위치로 복원한다
 * 3. POP 복원 직후 Shared Element 역방향 전환을 재생한다 (카드가 복원된 위치에 있어야 하므로 복원 후 호출)
 * 4. 브라우저 기본 스크롤 복원은 끈다(manual)
 * 5. 타임라인 값은 복원하지 않는다 (휘발)
 *
 * Example usage:
 * <BrowserRouter><ScrollManager /><Routes>...</Routes></BrowserRouter>
 */
export function ScrollManager() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const { playReturn } = useSharedElement();
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        writeScroll(pathnameRef.current, window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useLayoutEffect(() => {
    if (navigationType === 'POP') {
      window.scrollTo(0, readScroll(pathname));
      playReturn();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType, playReturn]);

  return null;
}
