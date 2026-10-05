import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  ArrowUpDown, Briefcase, ChevronDown, ChevronLeft, ChevronRight, CircleAlert, CircleCheck, CircleUser,
  CloudUpload, Heart, House, Image, Images, Info, LayoutDashboard, LayoutGrid, List, ListFilter, Mail,
  Menu, Pencil, Play, Plus, Quote, Rocket, Search, Settings, SlidersHorizontal, Sparkles, Star, Trash2,
  TriangleAlert, X,
} from 'lucide-react';
import { LucideIcon } from '../../common/ui/LucideIcon';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
} from '../../components/storybookDocumentation';

/** 프로젝트에서 사용하는 아이콘 목록 (lucide-react 컴포넌트 이름 → 컴포넌트) */
const ICONS = {
  ArrowUpDown, Briefcase, ChevronDown, ChevronLeft, ChevronRight, CircleAlert, CircleCheck, CircleUser,
  CloudUpload, Heart, House, Image, Images, Info, LayoutDashboard, LayoutGrid, List, ListFilter, Mail,
  Menu, Pencil, Play, Plus, Quote, Rocket, Search, Settings, SlidersHorizontal, Sparkles, Star, Trash2,
  TriangleAlert, X,
};

export default {
  title: 'Style/Icons',
  component: LucideIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Lucide Icons

프로젝트 기본 아이콘은 **lucide-react**이며, MUI SvgIcon 래퍼 \`LucideIcon\`(\`common/ui/LucideIcon.jsx\`)으로 사용한다.

- 선 굵기 기본값은 **1px**이고 \`non-scaling-stroke\`로 크기와 무관하게 항상 같은 굵기로 그려진다.
- \`fontSize\`(small / medium / large / inherit), \`color\`, \`sx\`는 MUI 아이콘과 동일하게 쓴다.
- 활성 상태(좋아요, 별점 등)는 \`isFilled\`로 면을 채운다.
- MUI 내장 아이콘(Select 화살표, Chip 삭제, Checkbox, Alert)은 테마 defaultProps에서 lucide로 교체되어 있다.
        `,
      },
    },
  },
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(ICONS),
      mapping: ICONS,
      description: 'lucide-react 아이콘 컴포넌트',
    },
    fontSize: {
      control: 'select',
      options: ['inherit', 'small', 'medium', 'large'],
      description: '크기 (small 20px / medium 24px / large 35px)',
    },
    strokeWidth: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.25 },
      description: '선 굵기(px, 크기와 무관하게 고정)',
      table: { defaultValue: { summary: 1 } },
    },
    isFilled: { control: 'boolean', description: '면 채움 여부' },
    sx: { control: 'object', description: '추가 스타일' },
  },
};

export const Default = {
  args: {
    icon: 'Heart',
    fontSize: 'large',
    strokeWidth: 1,
    isFilled: false,
  },
  render: ({ icon, ...args }) => <LucideIcon icon={ ICONS[icon] || icon } { ...args } />,
};

export const Gallery = {
  parameters: { layout: 'padded' },
  render: () => (
    <>
      <DocumentTitle
        title="Icons"
        status="Available"
        note="Lucide icon set (1px stroke)"
        brandName="Lumenstate"
        systemName="Design System"
        version="1.0"
      />
      <PageContainer>
        <SectionTitle title="아이콘 목록" description="프로젝트에서 사용하는 lucide 아이콘 (전체 목록은 lucide.dev)" />
        <Box sx={ { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 2, mb: 6 } }>
          { Object.entries(ICONS).map(([name, icon]) => (
            <Box key={ name } sx={ { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, py: 2 } }>
              <LucideIcon icon={ icon } fontSize="large" />
              <Typography variant="caption" color="text.secondary" sx={ { fontFamily: 'monospace' } }>{ name }</Typography>
            </Box>
          )) }
        </Box>

        <SectionTitle title="크기" description="fontSize 값에 따른 아이콘 크기. 선 굵기는 모두 1px" />
        <TableContainer sx={ { mb: 6 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>fontSize</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>크기</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>예시</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { [['small', '20px'], ['medium (기본)', '24px'], ['large', '35px']].map(([key, px]) => (
                <TableRow key={ key }>
                  <TableCell sx={ { fontFamily: 'monospace' } }>{ key }</TableCell>
                  <TableCell>{ px }</TableCell>
                  <TableCell>
                    <LucideIcon icon={ Search } fontSize={ key.split(' ')[0] } />
                  </TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="면 채움 (isFilled)" description="활성 상태 표현. 선 아이콘이 기본이며 필요한 경우에만 채운다" />
        <Box sx={ { display: 'flex', gap: 3, mb: 6 } }>
          <LucideIcon icon={ Heart } fontSize="large" />
          <LucideIcon icon={ Heart } fontSize="large" isFilled sx={ { color: 'error.main' } } />
          <LucideIcon icon={ Star } fontSize="large" />
          <LucideIcon icon={ Star } fontSize="large" isFilled sx={ { color: 'warning.main' } } />
        </Box>

        <SectionTitle title="사용 예시" />
        <Box
          component="pre"
          sx={ { backgroundColor: 'grey.100', p: 2, fontSize: 12, fontFamily: 'monospace', overflow: 'auto', mb: 6 } }
        >
{`import { Search } from 'lucide-react';
import { LucideIcon } from '../../common/ui/LucideIcon';

<LucideIcon icon={ Search } fontSize="small" />
<LucideIcon icon={ Heart } isFilled sx={ { color: 'error.main' } } />
<Button startIcon={ <LucideIcon icon={ Plus } /> }>추가</Button>`}
        </Box>

        <SectionTitle title="Vibe Coding Prompt" description="AI 코딩 도구에서 활용할 수 있는 프롬프트 예시" />
        <Box
          component="pre"
          sx={ { backgroundColor: 'grey.900', color: 'grey.100', p: 2, fontSize: 12, fontFamily: 'monospace', overflow: 'auto' } }
        >
{`"검색 입력 오른쪽에 lucide의 Search 아이콘을 LucideIcon 래퍼로 넣어줘.
크기는 fontSize="small", 색은 text.secondary로 하고 선 굵기는 기본 1px을 유지해줘."`}
        </Box>
      </PageContainer>
    </>
  ),
};
