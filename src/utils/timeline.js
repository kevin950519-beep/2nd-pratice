/**
 * 하루 타임라인 상수/유틸
 *
 * 정오(12시) → 자정(24시)을 time 0(Day) ~ 1(Night)로 매핑한다.
 * 4개 앵커는 theme.palette.timeline.* 키와 동일하며 time 축에서 균등 간격(1/3)이다.
 */
export const TIMELINE_STOPS = [
  { key: 'noon', hour: 12, label: '12:00', name: 'Noon', time: 0 },
  { key: 'afternoon', hour: 16, label: '16:00', name: 'Afternoon', time: 1 / 3 },
  { key: 'evening', hour: 20, label: '20:00', name: 'Evening', time: 2 / 3 },
  { key: 'midnight', hour: 24, label: '24:00', name: 'Midnight', time: 1 },
];

/**
 * 시각(12~24)을 time(0~1)으로 변환. 범위를 벗어나면 clamp.
 * @param {number} hour - 시각 (12~24)
 * @returns {number} time 0~1
 */
export function hourToTime(hour) {
  return Math.min(1, Math.max(0, (hour - 12) / 12));
}

/**
 * time에 가장 가까운 앵커를 반환
 * @param {number} time - 0~1
 * @returns {object} TIMELINE_STOPS 항목
 */
export function getNearestStop(time) {
  return TIMELINE_STOPS.reduce((nearest, stop) => (
    Math.abs(stop.time - time) < Math.abs(nearest.time - time) ? stop : nearest
  ));
}
