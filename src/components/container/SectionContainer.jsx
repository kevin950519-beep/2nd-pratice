import Box from '@mui/material/Box';

/**
 * SectionContainer
 * 
 * 페이지 내의 각 섹션을 구분하는 컨테이너입니다.
 * 기본적으로 100% 너비를 가지며, 상하 여백(py)을 제공합니다.
 * 
 * @param {node} children - 콘텐츠
 * @param {string|number} maxWidth - 최대 너비 (지정 시 가운데 정렬) [Optional]
 * @param {object} sx - 추가 스타일
 */
export const SectionContainer = ({ children, maxWidth, sx, ...props }) => {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        py: { xs: 4, md: 6 }, // 기본 섹션 간격
        ...(maxWidth && { maxWidth, mx: 'auto' }),
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

