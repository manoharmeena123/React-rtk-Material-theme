import type { FC } from 'react';
import Box from '@mui/material/Box';

export const BreadcrumbsSeparator: FC = () => (
  <Box
    sx={{
      backgroundColor: 'neutral.500',
      borderRadius: '50%',
      height: 4,
      width: 4
    }}
  />
);
