import type { ChangeEvent, FC } from 'react';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { chatApi } from 'src/api/chat';
import { Scrollbar } from 'src/components/scrollbar';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import { useSelector } from 'src/store';
import type { Contact, Thread } from 'src/types/chat';

import { ChatSidebarSearch } from './chat-sidebar-search';
import { ChatThreadItem } from './chat-thread-item';

const getThreadKey = (thread: Thread, userId: string): string | undefined => {
  let threadKey: string | undefined;

  if (thread.type === 'GROUP') {
    threadKey = thread.id;
  } else {
    // We hardcode the current user ID because the mocked that is not in sync
    // with the auth provider.
    // When implementing this app with a real database, replace this
    // ID with the ID from Auth Context.
    threadKey = thread.participantIds.find((participantId) => (
      participantId !== userId
    ));
  }

  return threadKey;
};

const useThreads = (): { byId: Record<string, Thread>, allIds: string[] } => {
  return useSelector((state) => state.chat.threads);
};

const useCurrentThreadId = (): string | undefined => {
  return useSelector((state) => state.chat.currentThreadId);
};

interface ChatSidebarProps {
  container?: HTMLDivElement | null;
  onClose?: () => void;
  open?: boolean;
}

export const ChatSidebar: FC<ChatSidebarProps> = (props) => {
  const { container, onClose, open, ...other } = props;
  const user = useMockedUser();
  const router = useRouter();
  const threads = useThreads();
  const currentThreadId = useCurrentThreadId();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Contact[]>([]);
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const handleCompose = useCallback(
    (): void => {
      router.push(paths.dashboard.chat + '?compose=true');
    },
    [router]
  );

  const handleSearchChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
      const { value } = event.target;

      setSearchQuery(value);

      if (!value) {
        setSearchResults([]);
        return;
      }

      try {
        const contacts = await chatApi.getContacts({ query: value });

        setSearchResults(contacts);
      } catch (err) {
        console.error(err);
      }
    },
    []
  );

  const handleSearchClickAway = useCallback(
    (): void => {
      if (searchFocused) {
        setSearchFocused(false);
        setSearchQuery('');
      }
    },
    [searchFocused]
  );

  const handleSearchFocus = useCallback(
    (): void => {
      setSearchFocused(true);
    },
    []
  );

  const handleSearchSelect = useCallback(
    (contact: Contact): void => {
      // We use the contact ID as a thread key
      const threadKey = contact.id;

      setSearchFocused(false);
      setSearchQuery('');

      router.push(paths.dashboard.chat + `?threadKey=${threadKey}`);
    },
    [router]
  );

  const handleThreadSelect = useCallback(
    (threadId: string): void => {
      const thread = threads.byId[threadId];
      const threadKey = getThreadKey(thread, user.id);

      if (!threadKey) {
        router.push(paths.dashboard.chat);
      } else {
        router.push(paths.dashboard.chat + `?threadKey=${threadKey}`);
      }
    },
    [router, threads, user]
  );

  const content = (
    <div>
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Typography
          variant="h5"
          sx={{ flexGrow: 1 }}
        >
          Chats
        </Typography>
        <Button
          onClick={handleCompose}
          startIcon={(
            <SvgIcon>
              <PlusIcon />
            </SvgIcon>
          )}
          variant="contained"
        >
          Group
        </Button>
        {!mdUp && (
          <IconButton onClick={onClose}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        )}
      </Stack>
      <ChatSidebarSearch
        isFocused={searchFocused}
        onChange={handleSearchChange}
        onClickAway={handleSearchClickAway}
        onFocus={handleSearchFocus}
        onSelect={handleSearchSelect}
        query={searchQuery}
        results={searchResults}
      />
      <Box sx={{ display: searchFocused ? 'none' : 'block' }}>
        <Scrollbar>
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              m: 0,
              p: 2
            }}
          >
            {threads.allIds.map((threadId) => (
              <ChatThreadItem
                active={currentThreadId === threadId}
                key={threadId}
                onSelect={(): void => handleThreadSelect(threadId)}
                thread={threads.byId[threadId]}
              />
            ))}
          </Stack>
        </Scrollbar>
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
            width: 380
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
          width: 380,
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

ChatSidebar.propTypes = {
  container: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
