import type { FC } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import ArchiveIcon from '@untitled-ui/icons-react/build/esm/Archive';
import Bell01Icon from '@untitled-ui/icons-react/build/esm/Bell01';
import Camera01Icon from '@untitled-ui/icons-react/build/esm/Camera01';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import PhoneIcon from '@untitled-ui/icons-react/build/esm/Phone';
import SlashCircle01Icon from '@untitled-ui/icons-react/build/esm/SlashCircle01';
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useMockedUser } from 'src/hooks/use-mocked-user';
import { usePopover } from 'src/hooks/use-popover';
import type { Participant } from 'src/types/chat';

const getRecipients = (participants: Participant[], userId: string): Participant[] => {
  return participants.filter((participant) => participant.id !== userId);
};

const getDisplayName = (recipients: Participant[]): string => {
  return recipients
    .map((participant) => participant.name)
    .join(', ');
};

const getLastActive = (recipients: Participant[]): string | null => {
  const hasLastActive = recipients.length === 1 && recipients[0].lastActivity;

  if (hasLastActive) {
    return formatDistanceToNowStrict(recipients[0].lastActivity!, { addSuffix: true });
  }

  return null;
};

interface ChatThreadToolbarProps {
  participants?: Participant[];
}

export const ChatThreadToolbar: FC<ChatThreadToolbarProps> = (props) => {
  const { participants = [], ...other } = props;
  const user = useMockedUser();
  const popover = usePopover<HTMLButtonElement>();

  // Maybe use memo for these values

  const recipients = getRecipients(participants, user.id);
  const displayName = getDisplayName(recipients);
  const lastActive = getLastActive(recipients);

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          flexShrink: 0,
          minHeight: 64,
          px: 2,
          py: 1
        }}
        {...other}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <AvatarGroup
            max={2}
            sx={{
              ...(recipients.length > 1 && {
                '& .MuiAvatar-root': {
                  height: 30,
                  width: 30,
                  '&:nth-of-type(2)': {
                    mt: '10px'
                  }
                }
              })
            }}
          >
            {recipients.map((recipient) => (
              <Avatar
                key={recipient.id}
                src={recipient.avatar || undefined}
              />
            ))}
          </AvatarGroup>
          <div>
            <Typography variant="subtitle2">
              {displayName}
            </Typography>
            {lastActive && (
              <Typography
                color="text.secondary"
                variant="caption"
              >
                Last active
                {' '}
                {lastActive}
              </Typography>
            )}
          </div>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <IconButton>
            <SvgIcon>
              <PhoneIcon />
            </SvgIcon>
          </IconButton>
          <IconButton>
            <SvgIcon>
              <Camera01Icon />
            </SvgIcon>
          </IconButton>
          <Tooltip title="More options">
            <IconButton
              onClick={popover.handleOpen}
              ref={popover.anchorRef}
            >
              <SvgIcon>
                <DotsHorizontalIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Menu
        anchorEl={popover.anchorRef.current}
        keepMounted
        onClose={popover.handleClose}
        open={popover.open}
      >
        <MenuItem>
          <ListItemIcon>
            <SvgIcon>
              <SlashCircle01Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Block" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SvgIcon>
              <Trash02Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SvgIcon>
              <ArchiveIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Archive" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SvgIcon>
              <Bell01Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Mute" />
        </MenuItem>
      </Menu>
    </>
  );
};

ChatThreadToolbar.propTypes = {
  participants: PropTypes.array
};
