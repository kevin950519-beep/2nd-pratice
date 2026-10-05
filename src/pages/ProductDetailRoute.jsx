import { Link as RouterLink, useNavigate, useNavigationType, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ProductDetailPage } from '../components/templates/ProductDetailPage';
import { getProductById } from '../data/products';

/**
 * ProductDetailRoute 컴포넌트
 *
 * /product/:id 라우트. URL의 id로 제품을 찾아 ProductDetailPage를 렌더링한다.
 * 뒤로가기는 앱 안에서 이동해 온 경우 history.back(Shared Element 역방향 + 스크롤 복원),
 * 주소로 바로 들어온 경우 목록('/')으로 이동한다. 없는 제품이면 안내를 보여 준다.
 */
export function ProductDetailRoute() {
  const { id } = useParams();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const product = getProductById(id);

  if (!product) {
    return (
      <Box sx={ { px: { xs: 2, md: 4 }, py: 10, textAlign: 'center' } }>
        <Typography variant="h4" component="h1" sx={ { mb: 2 } }>제품을 찾을 수 없습니다.</Typography>
        <Button component={ RouterLink } to="/" color="primary">Collection으로 돌아가기</Button>
      </Box>
    );
  }

  /* PUSH로 들어온 경우에만 뒤로가기가 앱 안의 이전 화면이다 */
  const handleBack = () => (navigationType === 'PUSH' ? navigate(-1) : navigate('/'));

  return <ProductDetailPage key={ product.id } product={ product } onBack={ handleBack } />;
}
