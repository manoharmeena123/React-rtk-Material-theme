import type { FC } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import type { Customer } from 'src/types/customer';
import { wait } from 'src/utils/wait';

interface CustomerEditFormProps {
  customer: Customer;
}

export const CustomerEditForm: FC<CustomerEditFormProps> = (props) => {
  const { customer, ...other } = props;
  const formik = useFormik({
    initialValues: {
      address1: customer.address1 || '',
      address2: customer.address2 || '',
      country: customer.country || '',
      email: customer.email || '',
      hasDiscount: customer.hasDiscount || false,
      isVerified: customer.isVerified || false,
      name: customer.name || '',
      phone: customer.phone || '',
      state: customer.state || '',
      submit: null
    },
    validationSchema: Yup.object({
      address1: Yup.string().max(255),
      address2: Yup.string().max(255),
      country: Yup.string().max(255),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      hasDiscount: Yup.bool(),
      isVerified: Yup.bool(),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      phone: Yup.string().max(15),
      state: Yup.string().max(255)
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        // NOTE: Make API request
        await wait(500);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success('Customer updated');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...other}
    >
      <Card>
        <CardHeader title="Edit Customer" />
        <CardContent sx={{ pt: 0 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Full name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.email}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.country && formik.errors.country)}
                fullWidth
                helperText={formik.touched.country && formik.errors.country}
                label="Country"
                name="country"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.state && formik.errors.state)}
                fullWidth
                helperText={formik.touched.state && formik.errors.state}
                label="State/Region"
                name="state"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.state}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.address1 && formik.errors.address1)}
                fullWidth
                helperText={formik.touched.address1 && formik.errors.address1}
                label="Address 1"
                name="address1"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address1}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.address2 && formik.errors.address2)}
                fullWidth
                helperText={formik.touched.address2 && formik.errors.address2}
                label="Address 2"
                name="address2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address2}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="Phone number"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </Grid>
          </Grid>
          <Stack
            divider={<Divider />}
            spacing={3}
            sx={{ mt: 3 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                >
                  Make Contact Info Public
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Means that anyone viewing your profile will be able to see your contacts
                  details
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.isVerified}
                color="primary"
                edge="start"
                name="isVerified"
                onChange={formik.handleChange}
                value={formik.values.isVerified}
              />
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                >
                  Available to hire
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Toggling this will let your teammates know that you are available for
                  acquiring new projects
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.hasDiscount}
                color="primary"
                edge="start"
                name="hasDiscount"
                onChange={formik.handleChange}
                value={formik.values.hasDiscount}
              />
            </Stack>
          </Stack>
        </CardContent>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row'
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Update
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            disabled={formik.isSubmitting}
            href={paths.dashboard.customers.details}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

CustomerEditForm.propTypes = {
  // @ts-ignore
  customer: PropTypes.object.isRequired
};
