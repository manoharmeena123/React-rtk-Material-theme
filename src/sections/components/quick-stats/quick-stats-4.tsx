import type { FC } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SeverityPill } from 'src/components/severity-pill';

export const QuickStats4: FC = () => (
  <Box
    sx={{
      backgroundColor: (theme) => theme.palette.mode === 'dark'
        ? 'neutral.800'
        : 'neutral.100',
      p: 3
    }}
  >
    <Card>
      <Grid
        container
        sx={{
          '& > *:not(:last-of-type)': {
            borderRight: (theme) => ({
              md: `1px solid ${theme.palette.divider}`
            }),
            borderBottom: (theme) => ({
              xs: `1px solid ${theme.palette.divider}`,
              md: 'none'
            })
          }
        }}
      >
        <Grid
          xs={12}
          sm={6}
          md={3}
        >
          <Stack
            alignItems="center"
            spacing={1}
            sx={{ p: 3 }}
          >
            <Typography
              color="text.secondary"
              component="h2"
              variant="overline"
            >
              Total Income
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
            >
              <Typography variant="h5">
                $854,355.00
              </Typography>
              <SeverityPill color="success">
                +25%
              </SeverityPill>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          md={3}
        >
          <Stack
            alignItems="center"
            spacing={1}
            sx={{ p: 3 }}
          >
            <Typography
              color="text.secondary"
              component="h5"
              variant="overline"
            >
              Total Expanses
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
            >
              <Typography variant="h5">
                $373,250.50
              </Typography>
              <SeverityPill color="success">
                +12%
              </SeverityPill>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          md={3}
        >
          <Stack
            alignItems="center"
            spacing={1}
            sx={{ p: 3 }}
          >
            <Typography
              color="text.secondary"
              component="h2"
              variant="overline"
            >
              Net Profit
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
            >
              <Typography variant="h5">
                $123,532.00
              </Typography>
              <SeverityPill color="error">
                -20%
              </SeverityPill>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          md={3}
        >
          <Stack
            alignItems="center"
            spacing={1}
            sx={{ p: 3 }}
          >
            <Typography
              color="text.secondary"
              component="h2"
              variant="overline"
            >
              Active Subscriptions
            </Typography>
            <Typography variant="h5">
              26,000
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  </Box>
);
