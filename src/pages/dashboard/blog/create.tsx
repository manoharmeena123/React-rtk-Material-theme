import { useCallback, useState } from 'react';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import type { File } from 'src/components/file-dropzone';
import { FileDropzone } from 'src/components/file-dropzone';
import { QuillEditor } from 'src/components/quill-editor';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { fileToBase64 } from 'src/utils/file-to-base64';

const initialCover = '/assets/covers/abstract-1-4x3-large.png';

const Page = () => {
  const [cover, setCover] = useState<string | null>(initialCover);

  usePageView();

  const handleCoverDrop = useCallback(
    async ([file]: File[]) => {
      const data = await fileToBase64(file) as string;
      setCover(data);
    },
    []
  );

  const handleCoverRemove = useCallback(
    (): void => {
      setCover(null);
    },
    []
  );

  return (
    <>
      <Seo title="Blog: Post Create" />
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
              Create a new post
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
                Create
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
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <Button
                color="inherit"
                component={RouterLink}
                href={paths.dashboard.blog.index}
              >
                Cancel
              </Button>
              <Button
                component={RouterLink}
                href={paths.dashboard.blog.postDetails}
                variant="contained"
              >
                Publish changes
              </Button>
              <IconButton>
                <SvgIcon>
                  <DotsHorizontalIcon />
                </SvgIcon>
              </IconButton>
            </Stack>
          </Card>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    md={4}
                  >
                    <Typography variant="h6">
                      Basic details
                    </Typography>
                  </Grid>
                  <Grid
                    xs={12}
                    md={8}
                  >
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="Post title"
                        name="title"
                      />
                      <TextField
                        fullWidth
                        label="Short description"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    md={4}
                  >
                    <Typography variant="h6">
                      Post cover
                    </Typography>
                  </Grid>
                  <Grid
                    xs={12}
                    md={8}
                  >
                    <Stack spacing={3}>
                      {
                        cover
                          ? (
                            <Box
                              sx={{
                                backgroundImage: `url(${cover})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                borderRadius: 1,
                                height: 230,
                                mt: 3
                              }}
                            />
                          )
                          : (
                            <Box
                              sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                border: 1,
                                borderRadius: 1,
                                borderStyle: 'dashed',
                                borderColor: 'divider',
                                height: 230,
                                mt: 3,
                                p: 3
                              }}
                            >
                              <Typography
                                align="center"
                                color="text.secondary"
                                variant="h6"
                              >
                                Select a cover image
                              </Typography>
                              <Typography
                                align="center"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                                variant="subtitle1"
                              >
                                Image used for the blog post cover and also for Open Graph meta
                              </Typography>
                            </Box>
                          )
                      }
                      <div>
                        <Button
                          color="inherit"
                          disabled={!cover}
                          onClick={handleCoverRemove}
                        >
                          Remove photo
                        </Button>
                      </div>
                      <FileDropzone
                        accept={{ 'image/*': [] }}
                        maxFiles={1}
                        onDrop={handleCoverDrop}
                        caption="(SVG, JPG, PNG, or gif maximum 900x400)"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    md={4}
                  >
                    <Typography variant="h6">
                      Content
                    </Typography>
                  </Grid>
                  <Grid
                    xs={12}
                    md={8}
                  >
                    <QuillEditor
                      placeholder="Write something"
                      sx={{ height: 330 }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    md={4}
                  >
                    <Typography variant="h6">
                      Meta
                    </Typography>
                  </Grid>
                  <Grid
                    xs={12}
                    lg={8}
                  >
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="SEO title"
                        name="title"
                      />
                      <TextField
                        fullWidth
                        label="SEO description"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
          <Box
            sx={{
              display: {
                sm: 'none'
              },
              mt: 2
            }}
          >
            <Button
              component={RouterLink}
              href={paths.dashboard.blog.postDetails}
              variant="contained"
            >
              Publish changes
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;
