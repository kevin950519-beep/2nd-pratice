import { Link as RouterLink, useNavigate, useNavigationType } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { CheckoutPage } from '../components/templates/CheckoutPage';
import content from '../data/content';

/**
 * CheckoutRoute 컴포넌트
 *
 * /checkout 라우트. 앱 셸 밖에서 로고만 남긴 체크아웃 화면을 렌더링한다.
 * 돌아가기는 앱 안에서 이동해 온 경우 history.back, 주소로 바로 들어온 경우 목록('/')으로 이동한다.
 */
export function CheckoutRoute() {
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const handleBack = () => (navigationType === 'PUSH' ? navigate(-1) : navigate('/'));

  return (
    <CheckoutPage
      logo={ (
        <Typography component={ RouterLink } to="/" variant="h5" sx={ { color: 'text.primary', textDecoration: 'none' } }>
          { content.brand.name }
        </Typography>
      ) }
      onBack={ handleBack }
      onDone={ () => navigate('/') }
    />
  );
}
