import type { FC } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface PostCommentProps {
  authorAvatar: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: number;
  isLiked: boolean;
  likes: number;
}

export const PostComment: FC<PostCommentProps> = (props) => {
  const {
    authorAvatar,
    authorName,
    authorRole,
    content,
    createdAt,
    isLiked: isLikedProp,
    likes: likesProp,
    ...other
  } = props;

  return (
    <Stack
      alignItems="flex-start"
      direction="row"
      spacing={2}
      {...other}
    >
      <Avatar src={authorAvatar} />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.mode === 'dark'
            ? 'neutral.900'
            : 'neutral.100',
          borderRadius: 1,
          p: 2,
          flexGrow: 1
        }}
      >
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="subtitle2">
            {authorName}
          </Typography>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ mt: 1 }}
        >
          {content}
        </Typography>
      </Box>
    </Stack>
  );
};

PostComment.propTypes = {
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorRole: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired
};
