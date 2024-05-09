import { useCallback, useEffect, useState } from 'react';
import { format, subHours } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { blogApi } from 'src/api/blog';
import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { PostComment } from 'src/sections/dashboard/blog/post-comment';
import { PostCommentAdd } from 'src/sections/dashboard/blog/post-comment-add';
import { PostNewsletter } from 'src/sections/dashboard/blog/post-newsletter';
import { PostContent } from 'src/sections/dashboard/blog/post-content';
import type { Post } from 'src/types/blog';

interface Comment {
  id: string;
  authorAvatar: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: number;
  isLiked: boolean;
  likes: number;
}

const useComments = (): Comment[] => {
  return [
    {
      id: 'd0ab3d02ef737fa6b007e35d',
      authorAvatar: '/assets/avatars/avatar-alcides-antonio.png',
      authorName: 'Alcides Antonio',
      authorRole: 'Product Designer',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      createdAt: subHours(new Date(), 2).getTime(),
      isLiked: true,
      likes: 12
    },
    {
      id: '3ac1e17289e38a84108efdf3',
      authorAvatar: '/assets/avatars/avatar-jie-yan-song.png',
      authorName: 'Jie Yan Song',
      authorRole: 'Web Developer',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      createdAt: subHours(new Date(), 8).getTime(),
      isLiked: false,
      likes: 8
    }
  ];
};

const usePost = (): Post | null => {
  const isMounted = useMounted();
  const [post, setPost] = useState<Post | null>(null);

  const handlePostGet = useCallback(async () => {
    try {
      const response = await blogApi.getPost();

      if (isMounted()) {
        setPost(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handlePostGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return post;
};

const Page = () => {
  const post = usePost();
  const comments = useComments();

  usePageView();

  if (!post) {
    return null;
  }

  const publishedAt = format(post.publishedAt, 'MMMM d, yyyy');

  return (
    <>
      <Seo title="Blog: Post Details" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={1}>
            <Typography variant="h3">
              Post
            </Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link
                color="text.primary"
                component={RouterLink}
                href={paths.dashboard.index}
                variant="subtitle2"
              >
                Dashboard
              </Link>
              <Link
                color="text.primary"
                component={RouterLink}
                href={paths.dashboard.blog.index}
                variant="subtitle2"
              >
                Blog
              </Link>
              <Typography
                color="text.secondary"
                variant="subtitle2"
              >
                Details
              </Typography>
            </Breadcrumbs>
          </Stack>
          <Card
            elevation={16}
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'space-between',
              mb: 8,
              mt: 6,
              px: 3,
              py: 2
            }}
          >
            <Typography variant="subtitle1">
              Hello, Admin
            </Typography>
            <Button
              component={RouterLink}
              href={paths.dashboard.blog.postCreate}
              variant="contained"
            >
              Edit Post
            </Button>
          </Card>
          <Stack spacing={3}>
            <div>
              <Chip label={post.category} />
            </div>
            <Typography variant="h3">
              {post.title}
            </Typography>
            <Typography
              color="text.secondary"
              variant="subtitle1"
            >
              {post.shortDescription}
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ mt: 3 }}
            >
              <Avatar src={post.author.avatar} />
              <div>
                <Typography variant="subtitle2">
                  By
                  {' '}
                  {post.author.name}
                  {' '}
                  •
                  {' '}
                  {publishedAt}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  {post.readTime} read
                </Typography>
              </div>
            </Stack>
          </Stack>
          <Box
            sx={{
              backgroundImage: `url(${post.cover})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              borderRadius: 1,
              height: 380,
              mt: 3
            }}
          />
          {post.content && (
            <Container sx={{ py: 3 }}>
              <PostContent content={post.content} />
            </Container>
          )}
          <Divider sx={{ my: 3 }} />
          <Stack spacing={2}>
            {comments.map((comment) => (
              <PostComment
                key={comment.id}
                {...comment}
              />
            ))}
          </Stack>
          <Divider sx={{ my: 3 }} />
          <PostCommentAdd />
          <Box sx={{ mt: 8 }}>
            <PostNewsletter />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;
