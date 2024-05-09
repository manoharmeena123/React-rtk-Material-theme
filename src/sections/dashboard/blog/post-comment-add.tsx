import type { FC } from 'react';
import FaceSmileIcon from '@untitled-ui/icons-react/build/esm/FaceSmile';
import Attachment01Icon from '@untitled-ui/icons-react/build/esm/Attachment01';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { useMockedUser } from 'src/hooks/use-mocked-user';
import { getInitials } from 'src/utils/get-initials';

export const PostCommentAdd: FC = (props) => {
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const user = useMockedUser();

  return (
    <div {...props}>
      <Stack
        alignItems="flex-start"
        direction="row"
        spacing={2}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 40,
            width: 40
          }}
        >
          {getInitials(user.name)}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <OutlinedInput
            fullWidth
            multiline
            placeholder="Add a comment"
            rows={3}
          />
          <Stack
            alignItems="center"
            direction="row"
            spacing={3}
            justifyContent="space-between"
            sx={{ mt: 3 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
            >
              {!smUp && (
                <IconButton>
                  <SvgIcon>
                    <PlusIcon />
                  </SvgIcon>
                </IconButton>
              )}
              {smUp && (
                <>
                  <IconButton>
                    <SvgIcon>
                      <Image01Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <Attachment01Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <FaceSmileIcon />
                    </SvgIcon>
                  </IconButton>
                </>
              )}
            </Stack>
            <div>
              <Button variant="contained">
                Send
              </Button>
            </div>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
};
