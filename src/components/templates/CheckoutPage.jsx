import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ArrowLeft } from 'lucide-react';
import { LucideIcon } from '../../common/ui/LucideIcon';
import { SectionContainer } from '../container/SectionContainer';
import { useCart } from '../commerce/useCart';
import { CheckoutSteps } from '../commerce/CheckoutSteps';
import { CheckoutForm } from '../commerce/CheckoutForm';
import { OrderSummary } from '../commerce/OrderSummary';
import { formatPrice } from '../../utils/format';
import { CHECKOUT_STEPS, DISCOUNT_CODES, SHIPPING_FEE } from '../../data/checkout';

const INITIAL_VALUES = {
  email: '',
  name: '',
  phone: '',
  postcode: '',
  address: '',
  addressDetail: '',
  memo: '',
  discountCode: '',
};

/** 필수 입력 검증. 오류가 없으면 빈 객체 */
function validate(values) {
  const errors = {};
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = '올바른 이메일을 입력해 주세요.';
  if (!values.name.trim()) errors.name = '이름을 입력해 주세요.';
  if (values.phone.replace(/\D/g, '').length < 10) errors.phone = '휴대폰 번호를 입력해 주세요.';
  if (!values.postcode.trim()) errors.postcode = '우편번호를 입력해 주세요.';
  if (!values.address.trim()) errors.address = '주소를 입력해 주세요.';
  return errors;
}

/**
 * CheckoutPage 컴포넌트
 *
 * 격리된 체크아웃 화면. 앱 셸(GNB) 밖에서 렌더되며, 상단에는 로고와 단계 표시만 남는다.
 * 좌측에 폼(연락처 / 배송 / 할인), 우측에 스티키 주문 요약과 결제 액션을 둔다.
 *
 * 동작 방식:
 * 1. 장바구니(useCart)의 아이템으로 주문 요약을 구성한다. 비어 있으면 안내만 보여 준다
 * 2. 할인 코드(data/checkout.js)를 적용하면 소계에서 할인율만큼 차감한다
 * 3. 결제하기 → 필수 입력을 검증하고, 통과하면 주문 접수 화면으로 전환하며 장바구니를 비운다 (결제 연동 없는 목업)
 *
 * Props:
 * @param {node} logo - 상단 바 로고 [Optional]
 * @param {function} onBack - 장바구니/목록으로 돌아가기 핸들러 [Optional]
 * @param {function} onDone - 주문 접수 후 '계속 구경하기' 핸들러 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CheckoutPage logo={ <Logo /> } onBack={ () => navigate(-1) } onDone={ () => navigate('/') } />
 */
export function CheckoutPage({ logo, onBack, onDone, sx }) {
  const { items, totalPrice, clearCart } = useCart();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [appliedRate, setAppliedRate] = useState(0);
  const [discountMessage, setDiscountMessage] = useState('');
  const [order, setOrder] = useState(null);

  const discount = Math.round(totalPrice * appliedRate);
  const total = totalPrice - discount + SHIPPING_FEE;
  const activeStep = order ? 2 : 1;

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (name === 'discountCode') {
      setAppliedRate(0);
      setDiscountMessage('');
    }
  };

  const handleApplyDiscount = () => {
    const rate = DISCOUNT_CODES[values.discountCode.trim().toUpperCase()];
    setAppliedRate(rate ?? 0);
    setDiscountMessage(rate ? `${rate * 100}% 할인이 적용되었습니다.` : '사용할 수 없는 코드입니다.');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setOrder({ number: `LS-${Date.now().toString().slice(-8)}`, email: values.email.trim(), total });
    clearCart();
  };

  const renderBody = () => {
    if (order) {
      return (
        <Box sx={ { py: { xs: 8, md: 12 }, textAlign: 'center' } }>
          <Typography variant="h3" component="h1" sx={ { mb: 2 } }>주문이 접수되었습니다.</Typography>
          <Typography variant="body1" sx={ { color: 'text.secondary' } }>{ `주문번호 ${order.number}` }</Typography>
          <Typography variant="body2" sx={ { mt: 1, mb: 4, color: 'text.secondary' } }>{ `확인 메일을 ${order.email} 로 보내드립니다.` }</Typography>
          { onDone && <Button variant="contained" color="primary" onClick={ onDone }>계속 구경하기</Button> }
        </Box>
      );
    }

    if (items.length === 0) {
      return (
        <Box sx={ { py: { xs: 8, md: 12 }, textAlign: 'center' } }>
          <Typography variant="body1" sx={ { mb: 3, color: 'text.secondary' } }>장바구니가 비어 있습니다.</Typography>
          { onBack && <Button color="primary" onClick={ onBack }>돌아가기</Button> }
        </Box>
      );
    }

    return (
      <Box component="form" noValidate onSubmit={ handleSubmit }>
        { onBack && (
          <Button color="primary" startIcon={ <LucideIcon icon={ ArrowLeft } /> } onClick={ onBack } sx={ { mb: { xs: 2, md: 3 } } }>
            돌아가기
          </Button>
        ) }
        <Grid container spacing={ { xs: 6, md: 10 } }>
          <Grid size={ { xs: 12, md: 7 } }>
            <CheckoutForm
              values={ values }
              errors={ errors }
              onChange={ handleChange }
              onApplyDiscount={ handleApplyDiscount }
              discountMessage={ discountMessage }
              isDiscountApplied={ appliedRate > 0 }
            />
          </Grid>
          <Grid size={ { xs: 12, md: 5 } }>
            <Box sx={ { position: { md: 'sticky' }, top: { md: 32 } } }>
              <OrderSummary items={ items } subtotal={ totalPrice } discount={ discount } shippingFee={ SHIPPING_FEE } total={ total } sx={ { mb: 4 } } />
              <Button type="submit" fullWidth variant="contained" color="primary" size="large">
                { `${formatPrice(total)} 결제하기` }
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={ { minHeight: '100vh', ...sx } }>
      <Box sx={ { borderBottom: '1px solid', borderColor: 'divider' } }>
        <SectionContainer
          maxWidth={ 1120 }
          sx={ { px: { xs: 2, md: 4 }, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 } }
        >
          <Box>{ logo }</Box>
          <CheckoutSteps steps={ CHECKOUT_STEPS } activeStep={ activeStep } />
        </SectionContainer>
      </Box>
      <SectionContainer maxWidth={ 1120 } sx={ { px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } } }>
        { renderBody() }
      </SectionContainer>
    </Box>
  );
}
