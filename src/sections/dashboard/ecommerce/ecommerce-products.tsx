import type { FC } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { MoreMenu } from 'src/components/more-menu';
import { Scrollbar } from 'src/components/scrollbar';

interface Product {
  id: string;
  category: string;
  image?: string;
  name: string;
  sales: number;
}

interface EcommerceProductsProps {
  products: Product[];
}

export const EcommerceProducts: FC<EcommerceProductsProps> = (props) => {
  const { products } = props;

  return (
    <Card>
      <CardHeader
        action={<MoreMenu />}
        title="Top Selling Products"
      />
      <Scrollbar>
        <Table sx={{ minWidth: 300 }}>
          <TableBody>
            {products.map((product, index) => {
              const sales = numeral(product.sales).format('0,0');

              return (
                <TableRow
                  hover
                  key={product.id}
                >
                  <TableCell>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                    >
                      {
                        product.image
                          ? (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'neutral.50',
                                backgroundImage: `url(${product.image})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                borderRadius: 1,
                                display: 'flex',
                                height: 80,
                                justifyContent: 'center',
                                overflow: 'hidden',
                                width: 80
                              }}
                            />
                          )
                          : (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: (theme) => theme.palette.mode === 'dark'
                                  ? 'neutral.700'
                                  : 'neutral.50',
                                borderRadius: 1,
                                display: 'flex',
                                height: 80,
                                justifyContent: 'center',
                                width: 80
                              }}
                            >
                              <SvgIcon>
                                <Image01Icon />
                              </SvgIcon>
                            </Box>
                          )
                      }
                      <div>
                        <Typography variant="subtitle2">
                          {product.name}
                        </Typography>
                        <Typography
                          color="text.secondary"
                          variant="body2"
                        >
                          in {product.category}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      {sales}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      noWrap
                      variant="body2"
                    >
                      in sales
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'dark'
                          ? 'neutral.700'
                          : 'neutral.200',
                        borderRadius: 1.5,
                        px: 1,
                        py: 0.5,
                        display: 'inline-block'
                      }}
                    >
                      <Typography variant="subtitle2">
                        #{index + 1}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
        >
          See All
        </Button>
      </CardActions>
    </Card>
  );
};

EcommerceProducts.propTypes = {
  products: PropTypes.array.isRequired
};
