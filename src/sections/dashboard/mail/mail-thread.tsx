import type { FC } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from 'src/paths';
import { useDispatch, useSelector } from 'src/store';
import { thunks } from 'src/thunks/mail';
import { Email } from 'src/types/mail';

import { MailThreadAttachments } from './mail-thread-attachments';
import { MailThreadMessage } from './mail-thread-message';
import { MailThreadReply } from './mail-thread-reply';
import { MailThreadToolbar } from './mail-thread-toolbar';

const useEmail = (emailId: string): Email => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.mail.emails.byId[emailId]);

  useEffect(
    () => {
      dispatch(thunks.getEmail({
        emailId
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [emailId]
  );

  return email;
};

interface MailThreadProps {
  currentLabelId?: string;
  emailId: string;
}

export const MailThread: FC<MailThreadProps> = (props) => {
  const { emailId, currentLabelId } = props;
  const email = useEmail(emailId);

  if (!email) {
    return null;
  }

  const backHref = (currentLabelId && currentLabelId !== 'inbox')
    ? paths.dashboard.mail + `?label=${currentLabelId}`
    : paths.dashboard.mail;

  const hasMessage = !!email.message;
  const hasAttachments = email.attachments && email.attachments.length > 0;

  return (
    <Stack
      sx={{
        flexGrow: 1,
        height: '100%',
        overflowY: 'auto'
      }}
    >
      <MailThreadToolbar
        backHref={backHref}
        createdAt={email.createdAt}
        from={email.from}
        to={email.to}
      />
      <Box
        sx={{
          flexGrow: 1,
          px: 3,
          py: 6
        }}
      >
        <Typography variant="h3">
          {email.subject}
        </Typography>
        <Stack
          sx={{ mt: 2 }}
          spacing={6}
        >
          {hasMessage && <MailThreadMessage message={email.message} />}
          {hasAttachments && <MailThreadAttachments attachments={email.attachments} />}
        </Stack>
      </Box>
      <MailThreadReply />
    </Stack>
  );
};

MailThread.propTypes = {
  emailId: PropTypes.string.isRequired,
  currentLabelId: PropTypes.string
};
