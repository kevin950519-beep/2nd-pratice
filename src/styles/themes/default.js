/**
 * Lumenstate Theme Configuration
 *
 * "빛은 공간의 상태다."
 *
 * 3800K 색온도 기반의 따뜻한 조명 브랜드 테마.
 * 4색만 사용 (그래디언트/글로우/블러 금지).
 *
 * ## 컬러 토큰
 * - Wall Tint White (#E8E5E1): 라이트 배경
 * - 3800K White (#F2E9DA): 다크 모드 텍스트
 * - Warm Black (#12100E): 다크 배경 / 라이트 모드 텍스트
 * - 3800K Accent (#FFC66E): 액센트
 *
 * ## 타이포그래피
 * - Display: Tiempos Headline (세리프, 빛의 확산 연상)
 * - Body: Pretendard Variable (한글/영문 혼용 최적화)
 */

import { createTheme } from '@mui/material/styles';
import { SelectChevron, chipDeleteIcon, checkboxIcons, alertIconMapping } from './themeIcons';

// ============================================================
// Lumenstate Brand Colors (4색 제한)
// ============================================================
const BRAND_COLORS = {
  wallTintWhite: '#E8E5E1',   // 라이트 배경 (제품 Day 이미지 배경과 동일)
  warmWhite: '#F2E9DA',       // 3800K White (다크 모드 텍스트)
  warmBlack: '#12100E',       // 다크 배경 / 라이트 모드 텍스트
  accent: '#FFC66E',          // 3800K Accent
};

// ============================================================
// 1. Palette (색상 토큰)
// ============================================================
const palette = {
  mode: 'light',

  // 브랜드 Primary - Warm Black
  primary: {
    light: '#3D3835',
    main: BRAND_COLORS.warmBlack,     // #12100E
    dark: '#0A0908',
    contrastText: BRAND_COLORS.wallTintWhite,
  },

  // Secondary - Accent Color
  secondary: {
    light: '#FFD89A',
    main: BRAND_COLORS.accent,        // #FFC66E
    dark: '#E6A84A',
    contrastText: BRAND_COLORS.warmBlack,
  },

  // 상태 색상 (브랜드 톤에 맞춰 조정)
  error: {
    light: '#E57373',
    main: '#D32F2F',
    dark: '#B71C1C',
    contrastText: '#FFFFFF',
  },

  warning: {
    light: '#FFB74D',
    main: '#F9A825',
    dark: '#F57F17',
    contrastText: BRAND_COLORS.warmBlack,
  },

  info: {
    light: '#64B5F6',
    main: '#1976D2',
    dark: '#0D47A1',
    contrastText: '#FFFFFF',
  },

  success: {
    light: '#81C784',
    main: '#388E3C',
    dark: '#1B5E20',
    contrastText: '#FFFFFF',
  },

  // Grey 스케일 (Warm tone으로 조정)
  grey: {
    50: '#FAF9F7',
    100: '#E8E5E1',    // Wall Tint White
    200: '#E8E4DF',
    300: '#D4CFC8',
    400: '#B8B2A9',
    500: '#9C958B',
    600: '#7A746B',
    700: '#5A554E',
    800: '#3D3835',
    900: '#12100E',    // Warm Black
    A100: '#E8E5E1',
    A200: '#E8E4DF',
    A400: '#B8B2A9',
    A700: '#5A554E',
  },

  // 텍스트 색상
  text: {
    primary: BRAND_COLORS.warmBlack,                    // #12100E
    secondary: `${BRAND_COLORS.warmBlack}CC`,           // 80% opacity
    disabled: `${BRAND_COLORS.warmBlack}61`,            // 38% opacity
  },

  // 배경 색상
  background: {
    default: BRAND_COLORS.wallTintWhite,  // #E8E5E1
    paper: BRAND_COLORS.wallTintWhite,    // #E8E5E1
  },

  // 구분선
  divider: `${BRAND_COLORS.warmBlack}1F`,  // 12% opacity

  // 액션 상태 색상
  action: {
    active: `${BRAND_COLORS.warmBlack}8A`,              // 54% opacity
    hover: `${BRAND_COLORS.warmBlack}0A`,               // 4% opacity
    hoverOpacity: 0.04,
    selected: `${BRAND_COLORS.warmBlack}14`,            // 8% opacity
    selectedOpacity: 0.08,
    disabled: `${BRAND_COLORS.warmBlack}42`,            // 26% opacity
    disabledBackground: `${BRAND_COLORS.warmBlack}1F`,  // 12% opacity
    disabledOpacity: 0.38,
    focus: `${BRAND_COLORS.warmBlack}1F`,               // 12% opacity
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },

  // 공통 색상
  common: {
    black: BRAND_COLORS.warmBlack,
    white: BRAND_COLORS.wallTintWhite,
  },

  // Lumenstate 커스텀 토큰
  brand: BRAND_COLORS,

  // 시간대별 배경색 토큰. 제품 Day 이미지 배경(#F5F5F5)↔Night 이미지 배경(#12100E)의 선형 보간.
  // 이미지 재보정: scripts/normalize-product-bg.js
  timeline: {
    noon: '#F5F5F5',      // 12pm (Day 이미지 배경과 동일)
    afternoon: '#A9A9A8',  // 4pm (선형 보간)
    evening: '#5E5C5B',    // 8pm (선형 보간)
    midnight: '#12100E',   // 12am
  },

  contrastThreshold: 3,
  tonalOffset: 0.2,
};

// ============================================================
// 2. Typography (타이포그래피 토큰)
// ============================================================
const displayFontFamily = [
  '"Tiempos Headline"',
  'Georgia',
  '"Times New Roman"',
  'serif',
].join(',');

const bodyFontFamily = [
  '"Pretendard Variable"',
  'Pretendard',
  '-apple-system',
  'BlinkMacSystemFont',
  'system-ui',
  'Roboto',
  '"Helvetica Neue"',
  '"Segoe UI"',
  '"Apple SD Gothic Neo"',
  '"Noto Sans KR"',
  '"Malgun Gothic"',
  'sans-serif',
].join(',');

const typography = {
  fontFamily: bodyFontFamily,
  fontSize: 14,
  htmlFontSize: 16,

  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  // Display Typography (Tiempos Headline)
  h1: {
    fontFamily: displayFontFamily,
    fontWeight: 800,
    fontSize: '6rem',         // 96px
    lineHeight: 1.05,
    letterSpacing: '-0.04em',
    wordSpacing: '0.1em',
  },

  h2: {
    fontFamily: displayFontFamily,
    fontWeight: 700,
    fontSize: '4.5rem',       // 72px
    lineHeight: 1.1,
    letterSpacing: '-0.04em',
    wordSpacing: '0.1em',
  },

  h3: {
    fontFamily: displayFontFamily,
    fontWeight: 700,
    fontSize: '3rem',         // 48px
    lineHeight: 1.15,
    letterSpacing: '-0.03em',
    wordSpacing: '0.08em',
  },

  h4: {
    fontFamily: displayFontFamily,
    fontWeight: 700,
    fontSize: '2.25rem',      // 36px
    lineHeight: 1.2,
    letterSpacing: '-0.03em',
    wordSpacing: '0.08em',
  },

  h5: {
    fontFamily: displayFontFamily,
    fontWeight: 700,
    fontSize: '1.75rem',      // 28px
    lineHeight: 1.3,
    letterSpacing: '-0.02em',
    wordSpacing: '0.06em',
  },

  h6: {
    fontFamily: displayFontFamily,
    fontWeight: 500,
    fontSize: '1.5rem',       // 24px
    lineHeight: 1.35,
    letterSpacing: '-0.02em',
    wordSpacing: '0.06em',
  },

  // Body Typography (Pretendard)
  subtitle1: {
    fontFamily: bodyFontFamily,
    fontSize: '1rem',         // 16px
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },

  subtitle2: {
    fontFamily: bodyFontFamily,
    fontSize: '0.875rem',     // 14px
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },

  body1: {
    fontFamily: bodyFontFamily,
    fontSize: '1.25rem',      // 20px
    fontWeight: 400,
    lineHeight: 1.7,
    letterSpacing: '0',
  },

  body2: {
    fontFamily: bodyFontFamily,
    fontSize: '1rem',         // 16px
    fontWeight: 400,
    lineHeight: 1.7,
    letterSpacing: '0',
  },

  button: {
    fontFamily: bodyFontFamily,
    fontSize: '0.875rem',     // 14px
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: '0.02em',
    textTransform: 'none',
  },

  caption: {
    fontFamily: bodyFontFamily,
    fontSize: '0.75rem',      // 12px
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.02em',
  },

  overline: {
    fontFamily: bodyFontFamily,
    fontSize: '0.75rem',      // 12px
    fontWeight: 500,
    lineHeight: 2,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
};

// ============================================================
// 3. Spacing (간격 토큰)
// ============================================================
const spacing = 8;

// ============================================================
// 4. Shape (모양 토큰)
// ============================================================
const shape = {
  borderRadius: 0,  // Sharp corners - 기하학적 형태 강조
};

// ============================================================
// 5. Shadows (그림자 토큰)
// ============================================================
// Dimmed shadow - offset 없이 blur만 사용
const shadows = [
  'none',                                           // 0
  '0 0 12px rgba(18, 16, 14, 0.04)',               // 1 - sm
  '0 0 14px rgba(18, 16, 14, 0.05)',               // 2
  '0 0 16px rgba(18, 16, 14, 0.06)',               // 3 - md
  '0 0 18px rgba(18, 16, 14, 0.07)',               // 4
  '0 0 20px rgba(18, 16, 14, 0.08)',               // 5 - lg
  '0 0 22px rgba(18, 16, 14, 0.09)',               // 6
  '0 0 24px rgba(18, 16, 14, 0.10)',               // 7 - xl
  '0 0 26px rgba(18, 16, 14, 0.11)',               // 8
  '0 0 28px rgba(18, 16, 14, 0.12)',               // 9
  '0 0 30px rgba(18, 16, 14, 0.13)',               // 10
  '0 0 32px rgba(18, 16, 14, 0.14)',               // 11
  '0 0 34px rgba(18, 16, 14, 0.15)',               // 12
  '0 0 36px rgba(18, 16, 14, 0.16)',               // 13
  '0 0 38px rgba(18, 16, 14, 0.17)',               // 14
  '0 0 40px rgba(18, 16, 14, 0.18)',               // 15
  '0 0 42px rgba(18, 16, 14, 0.19)',               // 16
  '0 0 44px rgba(18, 16, 14, 0.20)',               // 17
  '0 0 46px rgba(18, 16, 14, 0.21)',               // 18
  '0 0 48px rgba(18, 16, 14, 0.22)',               // 19
  '0 0 50px rgba(18, 16, 14, 0.23)',               // 20
  '0 0 52px rgba(18, 16, 14, 0.24)',               // 21
  '0 0 54px rgba(18, 16, 14, 0.25)',               // 22
  '0 0 56px rgba(18, 16, 14, 0.26)',               // 23
  '0 0 58px rgba(18, 16, 14, 0.27)',               // 24
];

// ============================================================
// 6. Breakpoints (브레이크포인트)
// ============================================================
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1440,
  },
};

// ============================================================
// 7. Z-Index (레이어 순서)
// ============================================================
const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

// ============================================================
// 8. Transitions (전환 효과)
// ============================================================
// 모션 원칙: easeInOutSine, 점멸 없음
const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
    // Lumenstate custom
    slow: 600,
    slower: 900,
    slowest: 1200,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    // Lumenstate - easeInOutSine (부드러운 조명 전환)
    smooth: 'cubic-bezier(0.37, 0, 0.63, 1)',
  },
};

// ============================================================
// 9. Components (컴포넌트 오버라이드)
// ============================================================
/**
 * 컴포넌트 오버라이드 팩토리
 * 색상은 전달받은 palette 토큰만 참조해 라이트/다크/시간대 테마가 공유한다.
 * @param {object} p - MUI palette
 */
const buildComponents = (p) => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin',
        backgroundColor: p.background.default,
        color: p.text.primary,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        textTransform: 'none',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        backgroundColor: 'transparent',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
  MuiChip: {
    defaultProps: {
      deleteIcon: chipDeleteIcon,
    },
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
  // MUI 내장 아이콘을 lucide로 교체
  MuiCheckbox: {
    defaultProps: checkboxIcons,
  },
  MuiAlert: {
    defaultProps: {
      iconMapping: alertIconMapping,
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 0,
        },
      },
    },
  },
  // Underline Input 스타일 (standard variant)
  MuiInput: {
    defaultProps: {
      disableUnderline: true,
    },
    styleOverrides: {
      root: {
        fontSize: '0.9375rem',
        fontWeight: 400,
        borderBottom: `1px solid ${p.text.primary}1F`,
        transition: 'border-color 200ms ease',
        '&:hover': {
          borderBottomColor: `${p.text.primary}CC`,
        },
        '&.Mui-focused': {
          borderBottomColor: p.text.primary,
        },
        '&.Mui-disabled': {
          borderBottomColor: `${p.text.primary}1F`,
        },
      },
      input: {
        padding: 0,
        paddingTop: 4,
        paddingBottom: 4,
        height: 'auto',
        '&::placeholder': {
          color: `${p.text.primary}CC`,
          opacity: 0.6,
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      standard: {
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.02em',
        color: `${p.text.primary}CC`,
      },
    },
  },
  // Underline Select 스타일 (standard variant)
  MuiSelect: {
    defaultProps: {
      IconComponent: SelectChevron,
    },
    styleOverrides: {
      standard: {
        padding: 0,
        paddingRight: '24px !important',
        minHeight: 'auto',
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
      icon: {
        color: `${p.text.primary}CC`,
        right: 0,
        transition: 'transform 200ms ease',
      },
      iconOpen: {
        transform: 'rotate(180deg)',
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        fontSize: '0.9375rem',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
      },
    },
  },
  // Breadcrumbs 스타일
  MuiBreadcrumbs: {
    styleOverrides: {
      root: {
        fontSize: '0.75rem',
        letterSpacing: '0.02em',
      },
      separator: {
        color: `${p.text.primary}CC`,
      },
    },
  },
});

const components = buildComponents(palette);

// ============================================================
// Theme 생성
// ============================================================
const defaultTheme = createTheme({
  palette,
  typography,
  spacing,
  shape,
  shadows,
  breakpoints,
  zIndex,
  transitions,
  components,
});

export default defaultTheme;

// 개별 토큰 내보내기 (Storybook 문서화용)
export {
  BRAND_COLORS,
  buildComponents,
  palette,
  typography,
  spacing,
  shape,
  shadows,
  breakpoints,
  zIndex,
  transitions,
  components,
  displayFontFamily,
  bodyFontFamily,
};
