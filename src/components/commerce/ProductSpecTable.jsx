import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

/**
 * ProductSpecTable 컴포넌트
 *
 * 제품 스펙을 라벨/값 2열 표로 보여준다.
 *
 * Props:
 * @param {object[]} specs - 스펙 목록 [{ label, value }] [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductSpecTable specs={ [{ label: '조도', value: '260 lx' }] } />
 */
export function ProductSpecTable({ specs, sx }) {
  return (
    <Table
      size="small"
      aria-label="제품 스펙"
      sx={ {
        '& .MuiTableCell-root': { fontSize: '0.75rem', py: 0.75 },
        '& .MuiTableCell-root:first-of-type': { pl: 0 },
        ...sx,
      } }
    >
      <TableBody>
        { specs.map(({ label, value }) => (
          <TableRow key={ label }>
            <TableCell component="th" scope="row" sx={ { width: 96, color: 'text.secondary' } }>{ label }</TableCell>
            <TableCell>{ value }</TableCell>
          </TableRow>
        )) }
      </TableBody>
    </Table>
  );
}
