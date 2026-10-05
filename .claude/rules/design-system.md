# Design System (MUST)

## 핵심 원칙

### 1. 기존 컴포넌트 재활용 (CRITICAL)

새로운 컴포넌트를 만들기 전에 반드시 기존 컴포넌트로 대체 가능한지 확인하고, 가능하면 최대한 재활용해라. 불필요한 중복 컴포넌트 생성을 피해야 함.

### 2. 디자인 토큰 사용 (CRITICAL)

스토리북 Style 카테고리에 명시된 디자인 토큰(색상, 타이포그래피, 간격 등)과 아이콘을 우선 사용해라. 임의의 색상값, 폰트 크기, 간격을 직접 지정하지 말고 theme 토큰을 참조할 것.

#### 색상
```jsx
// theme.palette 토큰 사용
sx={{ color: 'primary.main' }}
sx={{ backgroundColor: 'secondary.main' }}
sx={{ color: 'grey.100' }}
```

#### 시간대 테마 (Light/Dark) 호환
사이트는 시간대(12/16/20/24시)에 따라 배경(4단계)과 UI 색(18시 기준 라이트/다크)이 바뀐다. 모든 UI 색은 theme 토큰으로만 지정한다.
- UI 잉크/종이: `text.primary`, `primary.main`, `primary.contrastText`, `background.*`, `divider`, `action.*` 사용
- `common.black` / `common.white`, 헥스(`#000`), `rgba(0,0,0,…)`로 UI 색을 지정하지 않는다 (다크에서 반전되지 않음)
- 예외: 이미지 위 오버레이·스크림처럼 배경 테마와 무관해야 하는 고정 색 (CustomCard 하단 그라디언트, FileDropzone, ImageCarousel 버튼, Indicator 등)
- 전역 시간은 `useTimeline()` (`components/dynamic-color`)로 구독한다

#### 타이포그래피
```jsx
// theme.typography 사용
<Typography variant="h1">제목</Typography>
<Typography variant="body1">본문</Typography>
```

#### 간격
```jsx
// theme.spacing 기반 값 사용
sx={{ p: 2, m: 3, gap: 1 }}
```

#### 아이콘
- **lucide-react** 아이콘을 `common/ui/LucideIcon` 래퍼로 사용 (선 굵기 기본 1px, `fontSize`/`sx`는 MUI 아이콘과 동일). `@mui/icons-material`은 신규 사용 금지
- 활성 상태는 `isFilled`, MUI 내장 아이콘(Select/Chip/Checkbox/Alert)은 테마 defaultProps에서 lucide로 교체됨
- `src/stories/style/Icons.stories.jsx` 참고

## 스타일링 규칙

### MUI 기반

- 모든 기본 컴포넌트는 MUI의 가장 최신버전 사용
- 모든 컴포넌트의 스타일은 가능한 MUI의 sx 함수를 사용
- Grid 컴포넌트는 반드시 `CLAUDE.md`의 MUI Grid Import 규칙 참조

### 모듈화

- 수정 시 의존성을 줄 만한 기능들을 독립된 컴포넌트로 모듈화
- 새로운 수정, 추가사항이 있을 때 지시하지 않은 기존 기능, 형태에 영향을 주지 않도록 조심

### UX 가이드

- 특별한 의도가 없다면 구글 머티리얼 디자인의 가이드에 기반한 UX에 충실
