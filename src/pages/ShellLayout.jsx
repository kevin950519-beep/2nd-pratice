import { useEffect } from 'react';
import { Link as RouterLink, Outlet, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { CartDrawer } from '../components/commerce';
import { useCart } from '../components/commerce/useCart';
import { FloatingTimelineControl } from '../components/input/FloatingTimelineControl';
import { AppShell } from '../components/layout/AppShell';
import { Footer } from '../components/navigation/Footer';
import { ShellNav } from './ShellNav';
import content from '../data/content';

/** 현재 경로에 해당하는 메뉴 id. 제품 상세는 Collection에 속한다 */
const getActiveId = (pathname) => (pathname.startsWith('/product/') ? 'collection' : 'home');

/** 섹션 id 위치로 부드럽게 스크롤 */
const scrollToSection = (sectionId) => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });

/**
 * ShellLayout 컴포넌트
 *
 * 앱 셸 안에서 렌더되는 라우트(랜딩·상세)의 공통 레이아웃. 현재 페이지를 반영한 GNB(로고 + 메뉴 + 장바구니 버튼)와
 * 푸터, 전역 레이어(장바구니 패널, 플로팅 타임라인)를 제공한다. 체크아웃은 이 레이아웃 바깥에서 렌더된다.
 *
 * 동작 방식:
 * 1. 메뉴의 활성 항목은 경로로 결정한다 (/ → Home, /product/:id → Collection)
 * 2. 섹션 메뉴(Collection)는 랜딩이면 해당 섹션으로 스크롤, 다른 페이지면 랜딩으로 이동한 뒤 스크롤한다
 * 3. 장바구니 패널의 '결제하기' → 패널을 닫고 /checkout 으로 이동한다
 */
export function ShellLayout() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const navigationType = useNavigationType();
  const { closeCart } = useCart();

  /* 다른 페이지에서 섹션 메뉴로 넘어온 경우(PUSH), 이동 후 섹션으로 스크롤. 뒤로가기(POP)는 스크롤 복원에 맡긴다 */
  useEffect(() => {
    if (navigationType !== 'PUSH' || !state?.sectionId) return undefined;
    const frame = requestAnimationFrame(() => scrollToSection(state.sectionId));
    return () => cancelAnimationFrame(frame);
  }, [state, navigationType]);

  const handleNavigate = ({ path, sectionId }) => {
    if (pathname === path) {
      if (sectionId) scrollToSection(sectionId);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate(path, { state: sectionId ? { sectionId } : undefined });
  };

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const logo = (
    <Typography component={ RouterLink } to="/" variant="h5" sx={ { color: 'text.primary', textDecoration: 'none' } }>
      { content.brand.name }
    </Typography>
  );

  return (
    <>
      <AppShell
        isHeaderTranslucent
        headerCollapsible={ <ShellNav activeId={ getActiveId(pathname) } onNavigate={ handleNavigate } /> }
        hasCart
        footer={ (
          <Footer
            logo={ logo }
            tagline={ content.brand.tagline }
            links={ content.navigation.menuItems.map((item) => ({ ...item, onClick: () => handleNavigate(item) })) }
            copyright={ content.footer.copyright }
          />
        ) }
      >
        <Outlet />
      </AppShell>
      <CartDrawer onCheckout={ handleCheckout } />
      <FloatingTimelineControl />
    </>
  );
}
