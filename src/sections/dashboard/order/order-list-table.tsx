import type { ChangeEvent, FC, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import type { SeverityPillColor } from 'src/components/severity-pill';
import { SeverityPill } from 'src/components/severity-pill';
import type { Order, OrderStatus } from 'src/types/order';

const statusMap: Record<OrderStatus, SeverityPillColor> = {
  complete: 'success',
  pending: 'info',
  canceled: 'warning',
  rejected: 'error'
};

interface OrderListTableProps {
  count?: number;
  items?: Order[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (orderId: string) => void;
  page?: number;
  rowsPerPage?: number;
}

export const OrderListTable: FC<OrderListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelect,
    page = 0,
    rowsPerPage = 0
  } = props;

  return (
    <div>
      <Table>
        <TableBody>
          {items.map((order) => {
            const createdAtMonth = format(order.createdAt, 'LLL').toUpperCase();
            const createdAtDay = format(order.createdAt, 'd');
            const totalAmount = numeral(order.totalAmount).format(`${order.currency}0,0.00`);
            const statusColor = statusMap[order.status] || 'warning';

            return (
              <TableRow
                hover
                key={order.id}
                onClick={() => onSelect?.(order.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: (theme) => theme.palette.mode === 'dark'
                        ? 'neutral.800'
                        : 'neutral.200',
                      borderRadius: 2,
                      maxWidth: 'fit-content',
                      ml: 3,
                      p: 1
                    }}
                  >
                    <Typography
                      align="center"
                      variant="subtitle2"
                    >
                      {createdAtMonth}
                    </Typography>
                    <Typography
                      align="center"
                      variant="h6"
                    >
                      {createdAtDay}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle2">
                      {order.number}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      Total of
                      {' '}
                      {totalAmount}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <SeverityPill color={statusColor}>
                    {order.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

OrderListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number
};
