import { Route, Routes, useNavigate } from 'react-router-dom';
import { LandingPage } from '../components/templates/LandingPage';
import { useSharedElement } from '../components/motion/useSharedElement';
import { useSessionState } from '../hooks/useSessionState';
import { CheckoutRoute } from './CheckoutRoute';
import { ProductDetailRoute } from './ProductDetailRoute';
import { ScrollManager } from './ScrollManager';
import { ShellLayout } from './ShellLayout';

/**
 * AppRoutes 컴포넌트
 *
 * 앱 라우트 정의. 앱 셸 안의 랜딩(/)·제품 상세(/product/:id)와 셸 밖의 격리된 체크아웃(/checkout)을 연결하고 스크롤 복원을 함께 둔다.
 *
 * 동작 방식:
 * 1. 카드를 누르면 카드 이미지의 좌표를 Shared Element 전환에 넘기고 상세로 이동한다
 * 2. 랜딩의 제품 타입 필터는 세션 동안 기억되어 뒤로가기 시 그대로 복원된다
 * 3. 스크롤 위치는 ScrollManager가 경로 단위로 복원한다
 */
export function AppRoutes() {
  const navigate = useNavigate();
  const { begin } = useSharedElement();
  const [selectedType, setSelectedType] = useSessionState('lumenstate-product-type', 'all');

  const handleProductClick = (product, event) => {
    const media = event?.currentTarget?.querySelector('[data-shared-key]');
    if (media) {
      begin({ key: product.id, images: product.images, rect: media.getBoundingClientRect() });
    }
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={ <ShellLayout /> }>
          <Route
            path="/"
            element={ (
              <LandingPage
                onProductClick={ handleProductClick }
                showcaseProps={ { selectedType, onTypeChange: setSelectedType } }
              />
            ) }
          />
          <Route path="/product/:id" element={ <ProductDetailRoute /> } />
        </Route>
        <Route path="/checkout" element={ <CheckoutRoute /> } />
      </Routes>
    </>
  );
}
