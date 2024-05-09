import type { FC } from 'react';
import numeral from 'numeral';
import { subDays, subHours } from 'date-fns';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

import { Scrollbar } from 'src/components/scrollbar';
import type { SeverityPillColor } from 'src/components/severity-pill';
import { SeverityPill } from 'src/components/severity-pill';

const now = new Date();

type InventoryType = 'in_stock' | 'limited' | 'out_of_stock';

interface Product {
  id: string;
  attributes: string[];
  category: string;
  currency: string;
  createdAt: number;
  image: string | null;
  inventoryType: InventoryType;
  isAvailable: boolean;
  isShippable: boolean;
  name: string;
  price: number;
  quantity: number;
  updatedAt: number;
  variants: number;
}

const products: Product[] = [
  {
    id: '5ece2c077e39da27658aa8a9',
    attributes: ['Cotton'],
    category: 'dress',
    currency: '$',
    createdAt: subDays(now, 1).getTime(),
    image: '/assets/products/product-1.png',
    inventoryType: 'in_stock',
    isAvailable: true,
    isShippable: false,
    name: 'Healthcare Erbology',
    price: 23.99,
    quantity: 85,
    updatedAt: subHours(now, 6).getTime(),
    variants: 2
  },
  {
    id: '5ece2c0d16f70bff2cf86cd8',
    attributes: ['Cotton'],
    category: 'dress',
    currency: '$',
    createdAt: subDays(now, 3).getTime(),
    image: '/assets/products/product-2.png',
    inventoryType: 'out_of_stock',
    isAvailable: false,
    isShippable: true,
    name: 'Makeup Lancome Rouge',
    price: 95.00,
    quantity: 0,
    updatedAt: subDays(subHours(now, 8), 2).getTime(),
    variants: 1
  },
  {
    id: '5ece2c123fad30cbbff8d060',
    attributes: ['Variety of styles'],
    category: 'jewelry',
    currency: '$',
    createdAt: subDays(now, 6).getTime(),
    image: null,
    inventoryType: 'in_stock',
    isAvailable: true,
    isShippable: false,
    name: 'Layering Bracelets Collection',
    price: 155.00,
    quantity: 48,
    updatedAt: subDays(subHours(now, 2), 1).getTime(),
    variants: 5
  },
  {
    id: '5ece2c1be7996d1549d94e34',
    attributes: ['Polyester and Spandex'],
    category: 'blouse',
    currency: '$',
    createdAt: subDays(now, 12).getTime(),
    image: '/assets/products/product-4.png',
    inventoryType: 'limited',
    isAvailable: false,
    isShippable: true,
    name: 'Skincare Necessaire',
    price: 17.99,
    quantity: 5,
    updatedAt: subDays(subHours(now, 7), 1).getTime(),
    variants: 1
  }
];

interface Option {
  label: string;
  value: string;
}

const categoryOptions: Option[] = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Dress',
    value: 'dress'
  },
  {
    label: 'Jewelry',
    value: 'jewelry'
  },
  {
    label: 'Blouse',
    value: 'blouse'
  },
  {
    label: 'Beauty',
    value: 'beauty'
  }
];

const availabilityOptions: Option[] = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Available',
    value: 'available'
  },
  {
    label: 'Unavailable',
    value: 'unavailable'
  }
];

const sortOptions: Option[] = [
  {
    label: 'Last update (newest first)',
    value: 'updatedAt|desc'
  },
  {
    label: 'Last update (oldest first)',
    value: 'updatedAt|asc'
  },
  {
    label: 'Creation date (newest first)',
    value: 'createdAt|desc'
  },
  {
    label: 'Creation date (oldest first)',
    value: 'createdAt|asc'
  }
];

const getInventoryPill = (inventoryType: InventoryType): JSX.Element => {
  const map: Record<InventoryType, { color: SeverityPillColor; text: string; }> = {
    in_stock: {
      color: 'success',
      text: 'In Stock'
    },
    limited: {
      color: 'warning',
      text: 'Limited'
    },
    out_of_stock: {
      color: 'error',
      text: 'Out of Stock'
    }
  };

  const { text, color } = map[inventoryType];

  return (
    <SeverityPill color={color}>
      {text}
    </SeverityPill>
  );
};

export const Table5: FC = () => (
  <Box
    sx={{
      backgroundColor: (theme) => theme.palette.mode === 'dark'
        ? 'neutral.800'
        : 'neutral.100',
      p: 3
    }}
  >
    <Card>
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={2}
        sx={{ p: 3 }}
      >
        <OutlinedInput
          placeholder="Search products"
          startAdornment={(
            <InputAdornment position="start">
              <SvgIcon>
                <SearchMdIcon />
              </SvgIcon>
            </InputAdornment>
          )}
          sx={{
            maxWidth: '100%',
            width: 500
          }}
        />
        <TextField
          label="Sort By"
          name="sort"
          select
          SelectProps={{ native: true }}
          sx={{
            maxWidth: '100%',
            width: 240
          }}
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          label="Category"
          name="category"
          select
          SelectProps={{ native: true }}
          sx={{
            maxWidth: '100%',
            width: 240
          }}
        >
          {categoryOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          label="Availability"
          name="availability"
          select
          SelectProps={{ native: true }}
          sx={{
            maxWidth: '100%',
            width: 240
          }}
        >
          {availabilityOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
        <div>
          <FormControlLabel
            control={<Switch name="inStock" />}
            label="In Stock"
          />
        </div>
        <div>
          <FormControlLabel
            control={<Switch name="Shippable" />}
            label="Shippable"
          />
        </div>
      </Stack>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Inventory
              </TableCell>
              <TableCell>
                Details
              </TableCell>
              <TableCell>
                Attributes
              </TableCell>
              <TableCell>
                Price
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const price = numeral(product.price).format(`${product.currency}0,0.00`);
              const hasManyVariants = product.variants > 1;

              return (
                <TableRow
                  hover
                  key={product.id}
                >
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {
                        product.image
                          ? (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'neutral.50',
                                display: 'flex',
                                height: 100,
                                justifyContent: 'center',
                                overflow: 'hidden',
                                width: 100,
                                '& img': {
                                  height: 'auto',
                                  width: '100%'
                                }
                              }}
                            >
                              <img
                                alt="Product"
                                src={product.image}
                              />
                            </Box>
                          )
                          : (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'neutral.50',
                                display: 'flex',
                                height: 100,
                                justifyContent: 'center',
                                width: 100
                              }}
                            >
                              <SvgIcon>
                                <Image01Icon />
                              </SvgIcon>
                            </Box>
                          )
                      }
                      <Link
                        color="text.primary"
                        underline="none"
                        sx={{ ml: 2 }}
                        variant="subtitle2"
                      >
                        {product.name}
                      </Link>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {getInventoryPill(product.inventoryType)}
                  </TableCell>
                  <TableCell>
                    {product.quantity}
                    {' '}
                    in stock
                    {hasManyVariants && ` in ${product.variants} variants`}
                  </TableCell>
                  <TableCell>
                    {product.attributes.map((attr) => attr)}
                  </TableCell>
                  <TableCell>
                    {price}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton>
                    <IconButton>
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={products.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  </Box>
);
