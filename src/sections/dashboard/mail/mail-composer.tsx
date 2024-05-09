import type { ChangeEvent, FC } from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import Attachment01Icon from '@untitled-ui/icons-react/build/esm/Attachment01';
import Expand01Icon from '@untitled-ui/icons-react/build/esm/Expand01';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import Minimize01Icon from '@untitled-ui/icons-react/build/esm/Minimize01';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Portal from '@mui/material/Portal';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { QuillEditor } from 'src/components/quill-editor';

interface MailComposerProps {
  maximize?: boolean;
  message?: string;
  onClose?: () => void;
  onMaximize?: () => void;
  onMessageChange?: (value: string) => void;
  onMinimize?: () => void;
  onSubjectChange?: (value: string) => void;
  onToChange?: (value: string) => void;
  open?: boolean;
  subject?: string;
  to?: string;
}

export const MailComposer: FC<MailComposerProps> = (props) => {
  const {
    maximize = false,
    message = '',
    onClose,
    onMaximize,
    onMessageChange,
    onMinimize,
    onSubjectChange,
    onToChange,
    open = false,
    subject = '',
    to = ''
  } = props;

  const handleSubjectChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      onSubjectChange?.(event.target.value);
    },
    [onSubjectChange]
  );

  const handleToChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      onToChange?.(event.target.value);
    },
    [onToChange]
  );

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <Backdrop open={maximize} />
      <Paper
        sx={{
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          margin: 3,
          maxHeight: (theme) => `calc(100% - ${theme.spacing(6)})`,
          maxWidth: (theme) => `calc(100% - ${theme.spacing(6)})`,
          minHeight: 500,
          outline: 'none',
          position: 'fixed',
          right: 0,
          width: 600,
          zIndex: 1400,
          overflow: 'hidden',
          ...(maximize && {
            borderRadius: 0,
            height: '100%',
            margin: 0,
            maxHeight: '100%',
            maxWidth: '100%',
            width: '100%'
          })
        }}
        elevation={12}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            px: 2,
            py: 1
          }}
        >
          <Typography variant="h6">
            New Message
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {
            maximize
              ? (
                <IconButton onClick={onMinimize}>
                  <SvgIcon>
                    <Minimize01Icon />
                  </SvgIcon>
                </IconButton>
              )
              : (
                <IconButton onClick={onMaximize}>
                  <SvgIcon>
                    <Expand01Icon />
                  </SvgIcon>
                </IconButton>
              )
          }
          <IconButton onClick={onClose}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Box>
        <Input
          disableUnderline
          fullWidth
          onChange={handleToChange}
          placeholder="To"
          sx={{
            p: 1,
            borderBottom: 1,
            borderColor: 'divider'
          }}
          value={to}
        />
        <Input
          disableUnderline
          fullWidth
          onChange={handleSubjectChange}
          placeholder="Subject"
          sx={{
            p: 1,
            borderBottom: 1,
            borderColor: 'divider'
          }}
          value={subject}
        />
        <QuillEditor
          onChange={onMessageChange}
          placeholder="Leave a message"
          sx={{
            border: 'none',
            flexGrow: 1
          }}
          value={message}
        />
        <Divider />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
          sx={{ p: 2 }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >
            <Tooltip title="Attach image">
              <IconButton size="small">
                <SvgIcon>
                  <Image01Icon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Attach file">
              <IconButton size="small">
                <SvgIcon>
                  <Attachment01Icon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </Stack>
          <div>
            <Button variant="contained">
              Send
            </Button>
          </div>
        </Stack>
      </Paper>
    </Portal>
  );
};

MailComposer.propTypes = {
  maximize: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func,
  onMaximize: PropTypes.func,
  onMessageChange: PropTypes.func,
  onMinimize: PropTypes.func,
  onSubjectChange: PropTypes.func,
  onToChange: PropTypes.func,
  open: PropTypes.bool,
  subject: PropTypes.string,
  to: PropTypes.string
};
