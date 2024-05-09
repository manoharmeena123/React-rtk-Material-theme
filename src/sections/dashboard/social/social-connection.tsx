import type { FC } from 'react';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import type { Connection } from 'src/types/social';

interface SocialConnectionProps {
  connection: Connection;
}

export const SocialConnection: FC<SocialConnectionProps> = (props) => {
  const { connection } = props;
  const [status, setStatus] = useState(connection.status);

  const handleConnectionAdd = useCallback(
    (): void => {
      setStatus('pending');
      toast.success('Request sent');
    },
    []
  );

  const handleConnectionRemove = useCallback(
    (): void => {
      setStatus('not_connected');
    },
    []
  );

  const showConnect = status === 'not_connected';
  const showPending = status === 'pending';

  return (
    <Card
      variant="outlined"
      sx={{ height: '100%' }}
    >
      <Stack
        alignItems="flex-start"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="flex-start"
          direction="row"
          spacing={2}
        >
          <Avatar
            component="a"
            href="#"
            src={connection.avatar}
            sx={{
              height: 56,
              width: 56
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Link
              color="text.primary"
              href="#"
              variant="subtitle2"
            >
              {connection.name}
            </Link>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="body2"
            >
              {connection.commonConnections}
              {' '}
              connections in common
            </Typography>
            {showConnect && (
              <Button
                onClick={handleConnectionAdd}
                size="small"
                variant="outlined"
              >
                Connect
              </Button>
            )}
            {showPending && (
              <Button
                onClick={handleConnectionRemove}
                size="small"
                color="inherit"
              >
                Pending
              </Button>
            )}
          </Box>
        </Stack>
        <IconButton>
          <SvgIcon>
            <DotsHorizontalIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
    </Card>
  );
};

SocialConnection.propTypes = {
  // @ts-ignore
  connection: PropTypes.object
};
