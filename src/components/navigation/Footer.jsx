import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Footer 컴포넌트
 *
 * 페이지 하단 푸터. 좌측에 브랜드명·태그라인, 우측에 링크 목록, 하단에 카피라이트를 둔다.
 * 모바일에서는 세로로 쌓인다.
 *
 * Props:
 * @param {node} logo - 브랜드 영역 (로고 또는 이름) [Optional]
 * @param {string} tagline - 브랜드 한 줄 소개 [Optional]
 * @param {Array} links - 링크 목록 [{ id, label, onClick }] [Optional, 기본값: []]
 * @param {string} copyright - 카피라이트 문구 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <Footer logo="Lumenstate" tagline="Light defines the space." links={ [{ id: 'home', label: 'Home', onClick: goHome }] } copyright="© 2025 Lumenstate." />
 */
const Footer = forwardRef(function Footer({ logo, tagline, links = [], copyright, sx, ...props }, ref) {
  return (
    <Box
      ref={ref}
      component="footer"
      sx={ {
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 4, md: 6 },
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        ...sx,
      } }
      { ...props }
    >
      <Box sx={ { display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', gap: 4 } }>
        <Box>
          { logo }
          { tagline && <Typography variant="body2" sx={ { mt: 1, color: 'text.secondary' } }>{ tagline }</Typography> }
        </Box>
        { links.length > 0 && (
          <Box component="nav" aria-label="푸터 링크" sx={ { display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 1.5, md: 4 } } }>
            { links.map((link) => (
              <Typography
                key={ link.id }
                component="button"
                variant="body2"
                onClick={ link.onClick }
                sx={ { p: 0, border: 'none', background: 'none', font: 'inherit', color: 'text.secondary', cursor: 'pointer', textAlign: 'left', '&:hover': { color: 'text.primary' } } }
              >
                { link.label }
              </Typography>
            )) }
          </Box>
        ) }
      </Box>
      { copyright && <Typography variant="caption" sx={ { display: 'block', mt: { xs: 4, md: 6 }, color: 'text.secondary' } }>{ copyright }</Typography> }
    </Box>
  );
});

export { Footer };
