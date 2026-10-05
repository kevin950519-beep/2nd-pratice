import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

/**
 * vertical 인디케이터: 선택 탭 높이만큼 이동(트랜지션)하는 투명 레이어 + 좌측 중앙 점
 */
const verticalIndicatorSx = {
  left: 0,
  right: 'auto',
  width: '100%',
  bgcolor: 'transparent',
  pointerEvents: 'none',
  transition: 'top 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 10,
    top: '50%',
    width: 6,
    height: 6,
    borderRadius: '50%',
    bgcolor: 'text.primary',
    transform: 'translateY(-50%)',
  },
};

/**
 * CategoryTab 컴포넌트
 *
 * 카테고리 필터링을 위한 탭 메뉴.
 *
 * Props:
 * @param {Array} categories - 카테고리 목록 [{ id, label }] [Required]
 * @param {string} selected - 현재 선택된 카테고리 ID [Required]
 * @param {function} onChange - 변경 핸들러 (id) => void [Required]
 * @param {string} orientation - 탭 방향 ('horizontal' | 'vertical'). vertical은 컴팩트 사이즈 + 좌측 중앙 점 인디케이터 [Optional, 기본값: 'horizontal']
 * @param {object} sx - 추가 스타일 [Optional]
 */
export function CategoryTab({ categories = [], selected, onChange, orientation = 'horizontal', sx }) {
  const isVertical = orientation === 'vertical';

  return (
    <Box
      sx={{
        ...(!isVertical && { borderBottom: 1, borderColor: 'divider', mb: 3 }),
        ...sx,
      }}
    >
      <Tabs
        value={selected}
        onChange={(e, newValue) => onChange(newValue)}
        orientation={orientation}
        variant={isVertical ? 'standard' : 'scrollable'}
        scrollButtons={isVertical ? false : 'auto'}
        slotProps={isVertical ? { indicator: { sx: verticalIndicatorSx } } : undefined}
        aria-label="category tabs"
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            minWidth: 'auto',
            ...(isVertical
              ? {
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  minHeight: 32,
                  py: 0.5,
                  pl: 3,
                  pr: 1,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }
              : { mr: 2 }),
          },
        }}
      >
        {categories.map((cat) => (
          <Tab key={cat.id} label={cat.label} value={cat.id} />
        ))}
      </Tabs>
    </Box>
  );
}

