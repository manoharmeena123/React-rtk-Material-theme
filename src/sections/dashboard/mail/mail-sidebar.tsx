import type { FC } from 'react';
import { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import type { Label, LabelType } from 'src/types/mail';

import { MailLabel } from './mail-label';

type GroupedLabels = {
  [key in LabelType]: Label[];
};

const groupLabels = (labels: Label[]): GroupedLabels => {
  const groups: GroupedLabels = {
    system: [],
    custom: []
  };

  labels.forEach((label) => {
    if (label.type === 'system') {
      groups.system.push(label);
    } else {
      groups.custom.push(label);
    }
  });

  return groups;
};

interface MailSidebarProps {
  container?: HTMLDivElement | null;
  currentLabelId?: string;
  labels: Label[];
  open?: boolean;
  onClose?: () => void;
  onCompose?: () => void;
}

export const MailSidebar: FC<MailSidebarProps> = (props) => {
  const {
    currentLabelId = 'inbox',
    container,
    labels,
    onClose,
    onCompose,
    open,
    ...other
  } = props;
  const router = useRouter();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const handleLabelSelect = useCallback(
    (label: Label): void => {
      if (!mdUp) {
        onClose?.();
      }

      const href = label.id !== 'inbox'
        ? paths.dashboard.mail + `?label=${label.id}`
        : paths.dashboard.mail;

      router.push(href);
    },
    [router, mdUp, onClose]
  );

  // Maybe use memo
  const groupedLabels: GroupedLabels = groupLabels(labels);

  const content = (
    <div>
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        sx={{
          pt: 2,
          px: 2
        }}
      >
        <Typography
          variant="h5"
          sx={{ flexGrow: 1 }}
        >
          Mailbox
        </Typography>
        {!mdUp && (
          <IconButton onClick={onClose}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        )}
      </Stack>
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          onClick={onCompose}
          startIcon={(
            <SvgIcon>
              <PlusIcon />
            </SvgIcon>
          )}
          sx={{ mt: 2 }}
          variant="contained"
        >
          Compose
        </Button>
      </Box>
      <Box
        sx={{
          pb: 2,
          px: 2
        }}
      >
        {(Object.keys(groupedLabels) as LabelType[]).map((type) => (
          <Fragment key={type}>
            {type === 'custom' && (
              <ListSubheader disableSticky={true}>
                <Typography
                  color="text.secondary"
                  variant="overline"
                >
                  Labels
                </Typography>
              </ListSubheader>
            )}
            <List disablePadding>
              {groupedLabels[type].map((label) => {
                const isActive = currentLabelId === label.id;

                return (
                  <MailLabel
                    active={isActive}
                    key={label.id}
                    label={label}
                    onClick={() => handleLabelSelect(label)}
                  />
                );
              })}
            </List>
          </Fragment>
        ))}
      </Box>
    </div>
  );

  if (mdUp) {
    return (
      <Drawer
        anchor="left"
        open={open}
        PaperProps={{
          sx: {
            position: 'relative',
            width: 280
          }
        }}
        SlideProps={{ container }}
        variant="persistent"
        {...other}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      hideBackdrop
      ModalProps={{
        container,
        sx: {
          pointerEvents: 'none',
          position: 'absolute'
        }
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: 280,
          pointerEvents: 'auto',
          position: 'absolute'
        }
      }}
      SlideProps={{ container }}
      variant="temporary"
      {...other}
    >
      {content}
    </Drawer>
  );
};

MailSidebar.propTypes = {
  container: PropTypes.any,
  currentLabelId: PropTypes.string,
  labels: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  onCompose: PropTypes.func,
  open: PropTypes.bool
};
