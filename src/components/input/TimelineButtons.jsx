import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { TIMELINE_STOPS, getNearestStop } from '../../utils/timeline';

/**
 * TimelineButtons 컴포넌트
 *
 * 하루의 4개 시간대(12:00 / 16:00 / 20:00 / 24:00)를 버튼으로 선택해 time 값(0~1)을 바꾼다.
 * 현재 time에 가장 가까운 시간대 버튼이 활성 상태로 표시된다.
 *
 * Props:
 * @param {number} time - 현재 시간 값 0(Day) ~ 1(Night) [Required]
 * @param {function} onChange - 시간대 선택 핸들러 (time) => void [Required]
 * @param {string} size - 버튼 크기 ('small' | 'medium' | 'large') [Optional, 기본값: 'medium']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <TimelineButtons time={ time } onChange={ setTime } />
 */
export function TimelineButtons({ time, onChange, size = 'medium', sx }) {
  const activeKey = getNearestStop(time).key;

  const handleChange = (_, key) => {
    if (!key) return;
    const stop = TIMELINE_STOPS.find((item) => item.key === key);
    onChange(stop.time);
  };

  return (
    <ToggleButtonGroup
      exclusive
      size={ size }
      value={ activeKey }
      onChange={ handleChange }
      aria-label="시간대 선택"
      sx={ sx }
    >
      { TIMELINE_STOPS.map(({ key, label, name }) => (
        <ToggleButton key={ key } value={ key } aria-label={ name } sx={ { px: 2.5, textTransform: 'none' } }>
          { label }
        </ToggleButton>
      )) }
    </ToggleButtonGroup>
  );
}
