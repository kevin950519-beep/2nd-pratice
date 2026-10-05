import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { LucideIcon } from '../../common/ui/LucideIcon';
import { SectionContainer } from '../container/SectionContainer';
import { TimeBlendImage } from '../media/TimeBlendImage';
import { SharedElementTarget } from '../motion/SharedElementTarget';
import { useTimeline } from '../dynamic-color/useTimeline';
import { useCart } from '../commerce/useCart';
import { ProductOptionSelector } from '../commerce/ProductOptionSelector';
import { AddToCartAction } from '../commerce/AddToCartAction';
import { ProductSpecTable } from '../commerce/ProductSpecTable';
import { PRODUCT_OPTIONS } from '../../data/products';

/** 에셋 원본 규격 (1792x2400) */
const IMAGE_RATIO = '1792/2400';

/** 옵션 value → 표시 라벨 */
const labelOf = (group, value) => PRODUCT_OPTIONS[group].find((option) => option.value === value)?.label ?? value;

/**
 * ProductDetailPage 컴포넌트
 *
 * 제품 상세 페이지. 좌측에 낮밤이 블렌딩되는 대형 이미지, 우측에 제품 정보·옵션·담기, 설명 아래에 스펙 표를 둔다.
 *
 * 동작 방식:
 * 1. 대형 이미지는 SharedElementTarget으로 감싸져 목록의 카드 이미지에서 이어져 도착한다 (뒤로가기 시 역방향)
 *    - 이미지 영역은 카드와 같은 비율(1792/2400)이며 화면 높이를 넘지 않도록 폭을 제한한다
 *    - 전역 시간(useTimeline)에 맞춰 낮밤이 블렌딩된다 (time prop으로 직접 지정 가능)
 * 2. 옵션(유리 마감 · 금속 마감 · 높이)의 기본값은 각 목록의 첫 번째 값
 * 3. 담기 → 같은 제품+옵션 조합이면 수량이 합쳐지고 우측 장바구니 패널이 열린다 (useCart)
 * 4. 이미지 외의 내용은 이미지 전환이 끝날 즈음 부드럽게 나타난다
 * 5. 데스크탑(md 이상)에서는 정보 영역이 sticky, 모바일에서는 세로로 쌓인다
 *
 * Props:
 * @param {object} product - 제품 데이터 (data/products.js 항목) [Required]
 * @param {function} onBack - 목록으로 돌아가기 핸들러 [Optional]
 * @param {number} time - 시간 값 0(Day) ~ 1(Night) [Optional, 기본값: 전역 시간]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductDetailPage product={ product } onBack={ () => navigate(-1) } />
 */
export function ProductDetailPage({ product, onBack, time, sx }) {
  const { time: globalTime } = useTimeline();
  const { addItem } = useCart();
  const currentTime = time ?? globalTime;
  const [selected, setSelected] = useState({
    glassFinish: PRODUCT_OPTIONS.glassFinish[0].value,
    hardware: PRODUCT_OPTIONS.hardware[0].value,
    height: PRODUCT_OPTIONS.height[0].value,
  });

  const specs = [
    { label: '품번', value: product.sku },
    { label: '타입', value: product.type },
    { label: '설치 방식', value: product.mounting },
    { label: '형태', value: product.form },
    { label: '배광', value: product.lightPattern },
    { label: '조도', value: `${product.lux} lx` },
    { label: '색온도', value: `${product.kelvin} K` },
    { label: '리드타임', value: product.leadTime },
    { label: '배송', value: product.shipping },
  ];

  const handleAdd = (quantity) => {
    const optionSummary = [
      labelOf('glassFinish', selected.glassFinish),
      labelOf('hardware', selected.hardware),
      labelOf('height', selected.height),
    ].join(' · ');

    addItem({
      key: `${product.id}|${selected.glassFinish}|${selected.hardware}|${selected.height}`,
      productId: product.id,
      title: product.title,
      image: product.images[0],
      price: product.price,
      options: selected,
      optionSummary,
    }, quantity);
  };

  const fadeIn = (delay = 0.6) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.37, 0, 0.63, 1] },
  });

  return (
    <SectionContainer maxWidth={ 1120 } sx={ { px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 }, ...sx } }>
      { onBack && (
        <Button
          color="primary"
          startIcon={ <LucideIcon icon={ ArrowLeft } /> }
          onClick={ onBack }
          sx={ { mb: { xs: 2, md: 3 } } }
        >
          Collection
        </Button>
      ) }

      <Grid container spacing={ { xs: 4, md: 8 } }>
        <Grid size={ { xs: 12, md: 7 } }>
          <SharedElementTarget
            sharedKey={ product.id }
            images={ product.images }
            sx={ {
              width: '100%',
              // 화면 높이를 넘지 않도록 폭 제한 (이미지 비율 기준)
              maxWidth: `calc((100vh - 160px) * ${IMAGE_RATIO.replace('/', ' / ')})`,
              mx: { xs: 'auto', md: 0 },
            } }
          >
            <TimeBlendImage images={ product.images } alt={ product.title } time={ currentTime } ratio={ IMAGE_RATIO } fit="contain" />
          </SharedElementTarget>
        </Grid>

        <Grid size={ { xs: 12, md: 5 } }>
          <Box sx={ { position: { md: 'sticky' }, top: { md: 96 } } }>
            <motion.div { ...fadeIn() }>
              <Chip
                label={ product.type }
                size="small"
                sx={ { mb: 2, height: 20, fontSize: '0.7rem', bgcolor: 'primary.main', color: 'primary.contrastText' } }
              />
              <Typography variant="h3" component="h1">{ product.title }</Typography>
              <Typography variant="caption" sx={ { display: 'block', mt: 1, color: 'text.secondary' } }>
                { `${product.lux} lx · ${product.kelvin} K` }
              </Typography>
              <Typography variant="body1" sx={ { mt: 3, mb: 2 } }>{ product.description }</Typography>
              <ProductSpecTable specs={ specs } sx={ { mb: 4 } } />
              <ProductOptionSelector
                options={ PRODUCT_OPTIONS }
                value={ selected }
                onChange={ (name, value) => setSelected((prev) => ({ ...prev, [name]: value })) }
                sx={ { mb: 5 } }
              />
              <AddToCartAction price={ product.price } onAdd={ handleAdd } />
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}
