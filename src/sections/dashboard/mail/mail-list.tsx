import type { ChangeEvent, FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import ChevronLeftIcon from '@untitled-ui/icons-react/build/esm/ChevronLeft';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import Menu01Icon from '@untitled-ui/icons-react/build/esm/Menu01';
import RefreshCcw02Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw02';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { paths } from 'src/paths';
import { useDispatch, useSelector } from 'src/store';
import { thunks } from 'src/thunks/mail';
import type { Email } from 'src/types/mail';

import { MailItem } from './mail-item';

const useEmails = (currentLabelId?: string): { byId: Record<string, Email>; allIds: string[]; } => {
  const dispatch = useDispatch();
  const { emails } = useSelector((state) => state.mail);

  useEffect(
    () => {
      dispatch(thunks.getEmails({ label: currentLabelId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLabelId]
  );

  return emails;
};

interface SelectionModel {
  handleDeselectAll: () => void;
  handleDeselectOne: (emailId: string) => void;
  handleSelectAll: () => void;
  handleSelectOne: (emailId: string) => void;
  selected: string[];
}

const useSelectionModel = (emailIds: string[]): SelectionModel => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(
    () => {
      setSelected([]);
    },
    [emailIds]
  );

  const handleSelectAll = useCallback(
    (): void => {
      setSelected([...emailIds]);
    },
    [emailIds]
  );

  const handleSelectOne = useCallback(
    (emailId: string): void => {
      setSelected((prevState) => {
        if (!prevState.includes(emailId)) {
          return [...prevState, emailId];
        }

        return prevState;
      });
    },
    []
  );

  const handleDeselectAll = useCallback(
    (): void => {
      setSelected([]);
    },
    []
  );

  const handleDeselectOne = useCallback(
    (emailId: string): void => {
      setSelected((prevState) => {
        return prevState.filter((id) => id !== emailId);
      });
    },
    []
  );

  return {
    handleDeselectAll,
    handleDeselectOne,
    handleSelectAll,
    handleSelectOne,
    selected
  };
};

interface MailListProps {
  currentLabelId?: string;
  onSidebarToggle?: () => void;
}

export const MailList: FC<MailListProps> = (props) => {
  const { currentLabelId, onSidebarToggle, ...other } = props;
  const emails = useEmails(currentLabelId);
  const {
    handleDeselectAll,
    handleDeselectOne,
    handleSelectAll,
    handleSelectOne,
    selected
  } = useSelectionModel(emails.allIds);

  const handleToggleAll = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.checked) {
        handleSelectAll();
      } else {
        handleDeselectAll();
      }
    },
    [handleSelectAll, handleDeselectAll]
  );

  const selectedAll = selected.length === emails.allIds.length;
  const selectedSome = selected.length > 0 && selected.length < emails.allIds.length;
  const hasEmails = emails.allIds.length > 0;

  return (
    <Stack
      sx={{
        height: '100%',
        overflow: 'hidden'
      }}
      {...other}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <div>
          <IconButton onClick={onSidebarToggle}>
            <SvgIcon>
              <Menu01Icon />
            </SvgIcon>
          </IconButton>
        </div>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <OutlinedInput
            fullWidth
            placeholder="Search email"
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
          <Typography
            color="text.secondary"
            sx={{
              display: {
                xs: 'none',
                md: 'block'
              },
              mx: 2,
              whiteSpace: 'nowrap'
            }}
            variant="body2"
          >
            1 - {emails.allIds.length} of {emails.allIds.length}
          </Typography>
          <Tooltip title="Next page">
            <IconButton>
              <SvgIcon>
                <ChevronLeftIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Previous page">
            <IconButton>
              <SvgIcon>
                <ChevronRightIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton>
              <SvgIcon>
                <RefreshCcw02Icon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Divider />
      {
        hasEmails
          ? (
            <>
              <Box
                sx={{
                  alignItems: 'center',
                  borderBottomColor: 'divider',
                  borderBottomStyle: 'solid',
                  borderBottomWidth: 1,
                  display: {
                    xs: 'none',
                    md: 'flex'
                  },
                  p: 2
                }}
              >
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={handleToggleAll}
                />
                <Typography variant="subtitle2">
                  Select all
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Tooltip title="More options">
                  <IconButton>
                    <SvgIcon>
                      <DotsHorizontalIcon />
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
              </Box>
              <div>
                {emails.allIds.map((emailId: string) => {
                  const isSelected = selected.includes(emailId);

                  const href = currentLabelId && currentLabelId !== 'inbox'
                    ? paths.dashboard.mail + `?emailId=${emailId}&label=${currentLabelId}`
                    : paths.dashboard.mail + `?emailId=${emailId}`;

                  return (
                    <MailItem
                      email={emails.byId[emailId]}
                      href={href}
                      key={emailId}
                      onDeselect={(): void => handleDeselectOne(emailId)}
                      onSelect={(): void => handleSelectOne(emailId)}
                      selected={isSelected}
                    />
                  );
                })}
              </div>
            </>
          )
          : (
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={2}
              sx={{
                flexGrow: 1,
                p: 2
              }}
            >
              <Box
                component="img"
                src="/assets/errors/error-404.png"
                sx={{
                  height: 'auto',
                  maxWidth: 120
                }}
              />
              <Typography
                color="text.secondary"
                variant="h5"
              >
                There are no emails
              </Typography>
            </Stack>
          )
      }
    </Stack>
  );
};

MailList.propTypes = {
  currentLabelId: PropTypes.string,
  onSidebarToggle: PropTypes.func
};
