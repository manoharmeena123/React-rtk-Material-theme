import type { ChangeEvent, FC, KeyboardEvent } from 'react';
import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Attachment01Icon from '@untitled-ui/icons-react/build/esm/Attachment01';
import Camera01Icon from '@untitled-ui/icons-react/build/esm/Camera01';
import Send01Icon from '@untitled-ui/icons-react/build/esm/Send01';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';

import { useMockedUser } from 'src/hooks/use-mocked-user';

interface ChatMessageAddProps {
  disabled?: boolean;
  onSend?: (value: string) => void;
}

export const ChatMessageAdd: FC<ChatMessageAddProps> = (props) => {
  const { disabled = false, onSend, ...other } = props;
  const user = useMockedUser();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [body, setBody] = useState<string>('');

  const handleAttach = useCallback(
    (): void => {
      fileInputRef.current?.click();
    },
    []
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setBody(event.target.value);
    },
    []
  );

  const handleSend = useCallback(
    (): void => {
      if (!body) {
        return;
      }

      onSend?.(body);
      setBody('');
    },
    [body, onSend]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>): void => {
      if (event.code === 'Enter') {
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <Stack
      alignItems="center"
      direction="row"
      spacing={2}
      sx={{
        px: 3,
        py: 1
      }}
      {...other}
    >
      <Avatar
        sx={{
          display: {
            xs: 'none',
            sm: 'inline'
          }
        }}
        src={user.avatar}
      />
      <OutlinedInput
        disabled={disabled}
        fullWidth
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="Leave a message"
        size="small"
        value={body}
      />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          m: -2,
          ml: 2
        }}
      >
        <Tooltip title="Send">
          <Box sx={{ m: 1 }}>
            <IconButton
              color="primary"
              disabled={!body || disabled}
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark'
                }
              }}
              onClick={handleSend}
            >
              <SvgIcon>
                <Send01Icon />
              </SvgIcon>
            </IconButton>
          </Box>
        </Tooltip>
        <Tooltip title="Attach photo">
          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'inline-flex'
              },
              m: 1
            }}
          >
            <IconButton
              disabled={disabled}
              edge="end"
              onClick={handleAttach}
            >
              <SvgIcon>
                <Camera01Icon />
              </SvgIcon>
            </IconButton>
          </Box>
        </Tooltip>
        <Tooltip title="Attach file">
          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'inline-flex'
              },
              m: 1
            }}
          >
            <IconButton
              disabled={disabled}
              edge="end"
              onClick={handleAttach}
            >
              <SvgIcon>
                <Attachment01Icon />
              </SvgIcon>
            </IconButton>
          </Box>
        </Tooltip>
      </Box>
      <input
        hidden
        ref={fileInputRef}
        type="file"
      />
    </Stack>
  );
};

ChatMessageAdd.propTypes = {
  disabled: PropTypes.bool,
  onSend: PropTypes.func
};
