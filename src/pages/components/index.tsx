import ArrowDownIcon from '@untitled-ui/icons-react/build/esm/ArrowDown';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import type { PaletteMode } from 'src/theme';

interface Item {
  image: string;
  newTab?: boolean;
  path: string;
  subtitle: string;
  title: string;
}

interface Section {
  title: string;
  items: Item[];
}

const getSections = (paletteMode: PaletteMode): Section[] => ([
  {
    title: 'Data Display',
    items: [
      {
        title: 'Detail Lists',
        subtitle: '8 components',
        image: `/assets/components/detail-list-${paletteMode}.png`,
        path: paths.components.dataDisplay.detailLists
      },
      {
        title: 'Tables',
        subtitle: '11 components',
        image: `/assets/components/tables-${paletteMode}.png`,
        path: paths.components.dataDisplay.tables
      },
      {
        title: 'Quick Stats',
        subtitle: '8 components',
        image: `/assets/components/quick-stats-${paletteMode}.png`,
        path: paths.components.dataDisplay.quickStats
      }
    ]
  },
  {
    title: 'Lists',
    items: [
      {
        title: 'Grouped Lists',
        subtitle: '11 components',
        image: `/assets/components/grouped-lists-${paletteMode}.png`,
        path: paths.components.lists.groupedLists
      },
      {
        title: 'Grid Lists',
        subtitle: '6 components',
        image: `/assets/components/grid-lists-${paletteMode}.png`,
        path: paths.components.lists.gridLists
      }
    ]
  },
  {
    title: 'Forms',
    items: [
      {
        title: 'Forms',
        subtitle: '17 components',
        image: `/assets/components/forms-${paletteMode}.png`,
        path: paths.components.forms
      }
    ]
  },
  {
    title: 'Overlays',
    items: [
      {
        title: 'Modals',
        subtitle: '12 components',
        image: `/assets/components/modals-${paletteMode}.png`,
        path: paths.components.modals
      }
    ]
  },
  {
    title: 'Charts',
    items: [
      {
        title: 'Charts',
        subtitle: '12 components',
        image: `/assets/components/charts-${paletteMode}.png`,
        path: paths.components.charts
      }
    ]
  },
  {
    title: 'Components',
    items: [
      {
        title: 'Buttons',
        subtitle: '',
        image: `/assets/components/buttons-${paletteMode}.png`,
        path: paths.components.buttons
      },
      {
        title: 'Typography',
        subtitle: '',
        image: `/assets/components/typography-${paletteMode}.png`,
        path: paths.components.typography
      },
      {
        title: 'Colors',
        subtitle: '',
        image: `/assets/components/colors-${paletteMode}.png`,
        path: paths.components.colors
      },
      {
        title: 'Inputs',
        subtitle: '',
        image: `/assets/components/inputs-${paletteMode}.png`,
        path: paths.components.inputs
      }
    ]
  }
]);

const Page = () => {
  const theme = useTheme();
  const sections = getSections(theme.palette.mode);

  usePageView();

  return (
    <>
      <Seo title="Components" />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.mode === 'dark'
            ? 'neutral.800'
            : 'neutral.50',
          py: '120px'
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={1}>
            <Typography variant="h1">
              Browse components
            </Typography>
            <Typography
              color="text.secondary"
              variant="body1"
            >
              Browse through over 100 individual components and over 35 screens
            </Typography>
          </Stack>
        </Container>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack
            divider={<Divider />}
            spacing={4}
          >
            {sections.map((section) => (
              <Grid
                key={section.title}
                container
                spacing={4}
              >
                <Grid
                  xs={12}
                  lg={3}
                >
                  <Typography
                    sx={{ fontWeight: 600 }}
                    variant="h5"
                  >
                    {section.title}
                  </Typography>
                </Grid>
                <Grid
                  xs={12}
                  lg={9}
                >
                  <Grid
                    container
                    spacing={4}
                  >
                    {section.items.map((item) => (
                      <Grid
                        key={item.title}
                        xs={12}
                        sm={6}
                        md={4}
                      >
                        <Card
                          component={RouterLink}
                          href={item.path}
                          sx={{
                            display: 'block',
                            textDecoration: 'none',
                            gridColumn: {
                              xs: 'span 3',
                              sm: 'span 1'
                            }
                          }}
                          variant="outlined"
                          {...item.newTab && {
                            component: 'a',
                            target: '_blank'
                          }}
                        >
                          <Box sx={{ p: 2 }}>
                            <Box
                              sx={{
                                position: 'relative',
                                pt: 'calc(300 / 500 * 100%)',
                                '& img': {
                                  height: 'auto',
                                  position: 'absolute',
                                  top: 0,
                                  width: '100%'
                                }
                              }}
                            >
                              <img src={item.image} />
                            </Box>
                            <Box
                              sx={{
                                alignItems: 'flex-end',
                                display: 'flex',
                                mt: 2
                              }}
                            >
                              <Typography variant="subtitle2">
                                {item.title}
                              </Typography>
                              {item.newTab && (
                                <SvgIcon
                                  color="action"
                                  sx={{ ml: 1.5 }}
                                >
                                  <ArrowDownIcon />
                                </SvgIcon>
                              )}
                            </Box>
                            <Typography
                              color="text.secondary"
                              variant="body2"
                            >
                              {item.subtitle}
                            </Typography>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
