import { useCallback, useEffect, useState } from 'react';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { blogApi } from 'src/api/blog';
import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { PostNewsletter } from 'src/sections/dashboard/blog/post-newsletter';
import { PostCard } from 'src/sections/dashboard/blog/post-card';
import type { Post } from 'src/types/blog';

const usePosts = (): Post[] => {
  const isMounted = useMounted();
  const [posts, setPosts] = useState<Post[]>([]);

  const handlePostsGet = useCallback(async () => {
    try {
      const response = await blogApi.getPosts();

      if (isMounted()) {
        setPosts(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handlePostsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return posts;
};

const Page = () => {
  const posts = usePosts();

  usePageView();

  return (
    <>
      <Seo title="Blog: Post List" />
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
              Blog
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
                List
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
              New Post
            </Button>
          </Card>
          <Typography variant="h4">
            Recent Articles
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mt: 2 }}
            variant="body1"
          >
            Discover the latest news, tips and user research insights from Acme.
          </Typography>
          <Typography
            color="text.secondary"
            variant="body1"
          >
            You will learn about web infrastructure, design systems and devops APIs best
            practices.
          </Typography>
          <Divider sx={{ my: 4 }} />
          <Grid
            container
            spacing={4}
          >
            {posts.map((post) => (
              <Grid
                key={post.title}
                xs={12}
                md={6}
              >
                <PostCard
                  authorAvatar={post.author.avatar}
                  authorName={post.author.name}
                  category={post.category}
                  cover={post.cover}
                  publishedAt={post.publishedAt}
                  readTime={post.readTime}
                  shortDescription={post.shortDescription}
                  title={post.title}
                  sx={{ height: '100%' }}
                />
              </Grid>
            ))}
          </Grid>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="center"
            spacing={1}
            sx={{
              mt: 4,
              mb: 8
            }}
          >
            <Button
              disabled
              startIcon={(
                <SvgIcon>
                  <ArrowLeftIcon />
                </SvgIcon>
              )}
            >
              Newer
            </Button>
            <Button
              endIcon={(
                <SvgIcon>
                  <ArrowRightIcon />
                </SvgIcon>
              )}
            >
              Older posts
            </Button>
          </Stack>
          <Box sx={{ mt: 8 }}>
            <PostNewsletter />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;
