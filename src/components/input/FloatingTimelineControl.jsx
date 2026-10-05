import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { alpha } from '@mui/material/styles';
import { CloudSun, MoonStar, Sun, Sunset } from 'lucide-react';
import { LucideIcon } from '../../common/ui/LucideIcon';
import { useTimeline } from '../dynamic-color/useTimeline';
import { TIMELINE_STOPS, getNearestStop } from '../../utils/timeline';

/** 시간대별 아이콘 (낮 → 밤 흐름: 정오 해 / 오후 구름 낀 해 / 저녁 노을 / 자정 달) */
const STOP_ICONS = {
  noon: Sun,
  afternoon: CloudSun,
  evening: Sunset,
  midnight: MoonStar,
};

/**
 * FloatingTimelineControl 컴포넌트
 *
 * 화면 중앙 하단에 항상 떠 있는 시간대 선택 컨트롤. 전역 시간(useTimeline)을 직접 조작한다.
 * 글래스모피즘 컨테이너(반투명 배경 + backdrop blur + 얇은 테두리)로 뒤의 콘텐츠가 비쳐 공간감을 준다.
 *
 * 동작 방식:
 * 1. 시간 옆에 시간대와 어울리는 아이콘(해 / 구름 낀 해 / 노을 / 달, 1px 선)을 함께 표시한다
 *    12:00 / 16:00 / 20:00 / 24:00 버튼 중 하나를 누르면 전역 time이 해당 값(0 / 1/3 / 2/3 / 1)으로 바뀐다
 * 2. 현재 time에 가장 가까운 시간대 버튼이 활성 상태로 표시된다
 * 3. 컨테이너는 큰 border radius(pill), 활성 버튼은 배경을 칠하지 않고 테두리 링 + 진한 글자로만 표시해 유리 투과감을 유지
 * 4. 컨테이너 색은 현재 시간대 테마(background, text)를 따라가므로 낮/밤 모두에서 읽힌다
 * 5. TimelineProvider 안에서 사용해야 한다
 *
 * Props:
 * @param {number} offset - 화면 하단에서의 거리 (theme.spacing) [Optional, 기본값: 3]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <TimelineProvider>
 *   <TimeThemeProvider>
 *     <App />
 *     <FloatingTimelineControl />
 *   </TimeThemeProvider>
 * </TimelineProvider>
 */
export function FloatingTimelineControl({ offset = 3, sx }) {
  const { time, setTime } = useTimeline();
  const activeKey = getNearestStop(time).key;

  const handleChange = (_, key) => {
    if (!key) return;
    setTime(TIMELINE_STOPS.find((stop) => stop.key === key).time);
  };

  return (
    <Box
      sx={ (theme) => ({
        position: 'fixed',
        left: '50%',
        bottom: `calc(${theme.spacing(offset)} + env(safe-area-inset-bottom, 0px))`,
        transform: 'translateX(-50%)',
        zIndex: theme.zIndex.speedDial,
        p: 0.5,
        borderRadius: '9999px', // 숫자는 theme.shape.borderRadius(0)와 곱해지므로 문자열로 지정
        border: '1px solid',
        borderColor: alpha(theme.palette.text.primary, 0.16),
        backgroundColor: alpha(theme.palette.background.default, 0.4),
        backdropFilter: 'blur(16px) saturate(160%)',
        WebkitBackdropFilter: 'blur(16px) saturate(160%)',
        boxShadow: theme.shadows[4],
        ...(typeof sx === 'function' ? sx(theme) : sx),
      }) }
    >
      <ToggleButtonGroup
        exclusive
        size="small"
        value={ activeKey }
        onChange={ handleChange }
        aria-label="시간대 선택"
        sx={ (theme) => ({
          gap: 0.5,
          '& .MuiToggleButtonGroup-grouped': {
            border: '1px solid transparent',
            borderRadius: '9999px', // 숫자는 theme.shape.borderRadius(0)와 곱해지므로 문자열로 지정
            px: { xs: 1.25, sm: 2 },
            gap: 0.75,
            color: 'text.secondary',
            textTransform: 'none',
            backgroundColor: 'transparent',
            transition: theme.transitions.create(['color', 'border-color'], {
              duration: theme.transitions.duration.slow,
              easing: theme.transitions.easing.smooth,
            }),
            // MUI 그룹 기본 규칙(인접 버튼 모서리 0, 음수 마진)을 되돌려 각 버튼을 독립된 pill로 유지
            '&:not(:first-of-type), &:not(:last-of-type)': {
              borderRadius: '9999px', // 숫자는 theme.shape.borderRadius(0)와 곱해지므로 문자열로 지정
              marginLeft: 0,
              border: '1px solid transparent',
            },
            '&:hover': { backgroundColor: 'transparent', color: 'text.primary' },
            // 활성: 배경을 칠하지 않고 링 + 진한 글자로만 표시
            '&.Mui-selected': {
              backgroundColor: 'transparent',
              color: 'text.primary',
              fontWeight: 700,
              borderColor: alpha(theme.palette.text.primary, 0.6),
              '&:not(:first-of-type), &:not(:last-of-type)': {
                borderColor: alpha(theme.palette.text.primary, 0.6),
              },
              '&:hover': { backgroundColor: 'transparent' },
            },
          },
        }) }
      >
        { TIMELINE_STOPS.map(({ key, label, name }) => (
          <ToggleButton key={ key } value={ key } aria-label={ `${label} ${name}` }>
            <LucideIcon icon={ STOP_ICONS[key] } fontSize="small" />
            { label }
          </ToggleButton>
        )) }
      </ToggleButtonGroup>
    </Box>
  );
}
