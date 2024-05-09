import RefreshCcw01Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { EcommerceCostBreakdown } from 'src/sections/dashboard/ecommerce/ecommerce-cost-breakdown';
import { EcommerceSalesByCountry } from 'src/sections/dashboard/ecommerce/ecommerce-sales-by-country';
import { EcommerceSalesRevenue } from 'src/sections/dashboard/ecommerce/ecommerce-sales-revenue';
import { EcommerceProducts } from 'src/sections/dashboard/ecommerce/ecommerce-products';
import { EcommerceStats } from 'src/sections/dashboard/ecommerce/ecommerce-stats';

const Page = () => {
  const settings = useSettings();

  usePageView();

  return (
    <>
      <Seo title="Dashboard: E-Commerce" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4
            }}
          >
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    E-Commerce
                  </Typography>
                </div>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Button
                    startIcon={(
                      <SvgIcon>
                        <RefreshCcw01Icon />
                      </SvgIcon>
                    )}
                    variant="contained"
                  >
                    Sync Data
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4
                }}
              >
                <EcommerceStats
                  cost={99700}
                  profit={32100}
                  sales={152000}
                />
                <EcommerceSalesRevenue
                  chartSeries={[
                    {
                      name: 'New Customers',
                      data: [3350, 1840, 2254, 5780, 9349, 5241, 2770, 2051, 3764, 2385, 5912, 8323]
                    },
                    {
                      name: 'Up/Cross-Selling',
                      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
                    }
                  ]}
                />
                <EcommerceSalesByCountry
                  sales={[
                    {
                      id: 'us',
                      amount: 60,
                      country: 'United States'
                    },
                    {
                      id: 'es',
                      amount: 20,
                      country: 'Spain'
                    },
                    {
                      id: 'uk',
                      amount: 10,
                      country: 'United Kingdom'
                    },
                    {
                      id: 'de',
                      amount: 5,
                      country: 'Germany'
                    },
                    {
                      id: 'ca',
                      amount: 5,
                      country: 'Canada'
                    }
                  ]}
                />
              </Stack>
            </Grid>
            <Grid
              xs={12}
              lg={4}
            >
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4
                }}
              >
                <EcommerceProducts
                  products={[
                    {
                      id: '5eff2512c6f8737d08325676',
                      category: 'Accessories',
                      image: '/assets/products/product-1.png',
                      name: 'Healthcare Erbology',
                      sales: 13153
                    },
                    {
                      id: '5eff2516247f9a6fcca9f151',
                      category: 'Accessories',
                      image: '/assets/products/product-2.png',
                      name: 'Makeup Lancome Rouge',
                      sales: 10300
                    },
                    {
                      id: '5eff251a3bb9ab7290640f18',
                      category: 'Accessories',
                      name: 'Lounge Puff Fabric Slipper',
                      sales: 5300
                    },
                    {
                      id: '5eff251e297fd17f0dc18a8b',
                      category: 'Accessories',
                      image: '/assets/products/product-4.png',
                      name: 'Skincare Necessaire',
                      sales: 1203
                    },
                    {
                      id: '5eff2524ef813f061b3ea39f',
                      category: 'Accessories',
                      image: '/assets/products/product-5.png',
                      name: 'Skincare Soja CO',
                      sales: 254
                    }
                  ]}
                />
                <EcommerceCostBreakdown
                  chartSeries={[14859, 35690, 45120, 25486]}
                  labels={['Strategy', 'Outsourcing', 'Marketing', 'Other']}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
