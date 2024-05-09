import type { FC } from 'react';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import SwitchVertical01Icon from '@untitled-ui/icons-react/build/esm/SwitchVertical01';
import type { SxProps } from '@mui/system/styleFunctionSx';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const logoMap: Record<string, string> = {
  BTC: '/assets/logos/logo-bitcoin.svg',
  ETH: '/assets/logos/logo-eth.svg'
};

interface CryptoOperationProps {
  sx?: SxProps;
}

export const CryptoOperation: FC<CryptoOperationProps> = (props) => {
  const [op, setOp] = useState<{ from: string; to: string }>({
    from: 'BTC',
    to: 'ETH'
  });

  const handleSwitch = useCallback(
    (): void => {
      if (op.from === 'BTC') {
        setOp({
          from: 'ETH',
          to: 'BTC'
        });
      } else {
        setOp({
          from: 'BTC',
          to: 'ETH'
        });
      }
    },
    [op]
  );

  return (
    <Card {...props}>
      <CardHeader
        title="Operation"
        action={(
          <Tabs value="buy">
            <Tab
              label="Buy"
              value="buy"
            />
            <Tab
              label="Sell"
              value="sell"
            />
          </Tabs>
        )}
      />
      <CardContent sx={{ pt: 0 }}>
        <TextField
          label="From"
          fullWidth
          InputProps={{
            startAdornment: (
              <Box
                sx={{
                  mr: 1,
                  mt: 2.5
                }}
              >
                <Box
                  component="img"
                  src={logoMap[op.from]}
                  sx={{
                    height: 24,
                    width: 24
                  }}
                />
              </Box>
            )
          }}
          value="0.4567"
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 1
          }}
        >
          <IconButton onClick={handleSwitch}>
            <SvgIcon fontSize="small">
              <SwitchVertical01Icon />
            </SvgIcon>
          </IconButton>
        </Box>
        <TextField
          label="To"
          fullWidth
          InputProps={{
            startAdornment: (
              <Box
                sx={{
                  mr: 1,
                  mt: 2.5
                }}
              >
                <Box
                  component="img"
                  src={logoMap[op.to]}
                  sx={{
                    height: 24,
                    width: 24
                  }}
                />
              </Box>
            )
          }}
          value="5.9093"
        />
        <Typography
          color="text.secondary"
          sx={{ mt: 2 }}
          variant="body2"
        >
          1 BTC = $20,024.90
        </Typography>
        <Button
          fullWidth
          size="large"
          sx={{ mt: 2 }}
          variant="contained"
        >
          Buy {op.to === 'BTC' ? 'Bitcoin' : 'Ethereum'}
        </Button>
      </CardContent>
    </Card>
  );
};

CryptoOperation.propTypes = {
  sx: PropTypes.object
};
