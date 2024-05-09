import type { FC } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ChevronLeftIcon from '@untitled-ui/icons-react/build/esm/ChevronLeft';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02';
import ReplyIcon from '@mui/icons-material/Reply';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { RouterLink } from 'src/components/router-link';
import type { EmailParticipant } from 'src/types/mail';
import { getInitials } from 'src/utils/get-initials';

interface MailThreadToolbarProps {
  backHref: string;
  createdAt: number;
  from: EmailParticipant;
  to: EmailParticipant[];
}

export const MailThreadToolbar: FC<MailThreadToolbarProps> = (props) => {
  const { backHref, createdAt, from, to } = props;
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const formattedCreatedAt = format(createdAt, 'MMMM d yyyy, h:mm:ss a');

  return (
    <div>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <div>
          <Tooltip title="Back">
            <IconButton
              component={RouterLink}
              href={backHref}
            >
              <SvgIcon>
                <ArrowLeftIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </div>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <OutlinedInput
            fullWidth
            placeholder="Search message"
            size="small"
            startAdornment={(
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            )}
            sx={{ width: 200 }}
          />
          <Tooltip title="Previous email">
            <IconButton>
              <SvgIcon>
                <ChevronLeftIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Next email">
            <IconButton>
              <SvgIcon>
                <ChevronRightIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 3 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Avatar
            src={from.avatar || undefined}
            sx={{
              height: 48,
              width: 48
            }}
          >
            {getInitials(from.name)}
          </Avatar>
          <div>
            <Typography
              component="span"
              variant="subtitle2"
            >
              {from.name}
            </Typography>
            {' '}
            <Link
              color="text.secondary"
              component="span"
              variant="body2"
            >
              {from.email}
            </Link>
            <Typography
              color="text.secondary"
              variant="subtitle2"
            >
              To:
              {' '}
              {to.map((person) => (
                <Link
                  color="inherit"
                  key={person.email}
                >
                  {person.email}
                </Link>
              ))}
            </Typography>
            {formattedCreatedAt && (
              <Typography
                color="text.secondary"
                noWrap
                variant="caption"
              >
                {formattedCreatedAt}
              </Typography>
            )}
          </div>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          {mdUp && (
            <>
              <Tooltip title="Reply">
                <IconButton>
                  <SvgIcon>
                    <ReplyIcon />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Reply all">
                <IconButton>
                  <SvgIcon>
                    <ReplyAllIcon />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton>
                  <SvgIcon>
                    <Trash02Icon />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="More options">
            <IconButton>
              <SvgIcon>
                <DotsHorizontalIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </div>
  );
};

MailThreadToolbar.propTypes = {
  backHref: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  // @ts-ignore
  from: PropTypes.object.isRequired,
  to: PropTypes.array.isRequired
};
