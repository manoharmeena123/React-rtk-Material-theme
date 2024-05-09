import type { FC } from 'react';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Unstable_Grid2';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import type { File } from 'src/components/file-dropzone';
import { FileDropzone } from 'src/components/file-dropzone';
import { QuillEditor } from 'src/components/quill-editor';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';

interface CategoryOption {
  label: string;
  value: string;
}

const categoryOptions: CategoryOption[] = [
  {
    label: 'Healthcare',
    value: 'healthcare'
  },
  {
    label: 'Makeup',
    value: 'makeup'
  },
  {
    label: 'Dress',
    value: 'dress'
  },
  {
    label: 'Skincare',
    value: 'skincare'
  },
  {
    label: 'Jewelry',
    value: 'jewelry'
  },
  {
    label: 'Blouse',
    value: 'blouse'
  }
];

interface Values {
  barcode: string;
  category: string;
  description: string;
  images: string[];
  name: string;
  newPrice: number;
  oldPrice: number;
  sku: string;
  submit: null;
}

const initialValues: Values = {
  barcode: '925487986526',
  category: '',
  description: '',
  images: [],
  name: '',
  newPrice: 0,
  oldPrice: 0,
  sku: 'IYV-8745',
  submit: null
};

const validationSchema = Yup.object({
  barcode: Yup.string().max(255),
  category: Yup.string().max(255),
  description: Yup.string().max(5000),
  images: Yup.array(),
  name: Yup.string().max(255).required(),
  newPrice: Yup.number().min(0).required(),
  oldPrice: Yup.number().min(0),
  sku: Yup.string().max(255)
});

export const ProductCreateForm: FC = (props) => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        // NOTE: Make API request
        toast.success('Product created');
        router.push(paths.dashboard.products.index);
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleFilesDrop = useCallback(
    (newFiles: File[]): void => {
      setFiles((prevFiles) => {
        return [...prevFiles, ...newFiles];
      });
    },
    []
  );

  const handleFileRemove = useCallback(
    (file: File): void => {
      setFiles((prevFiles) => {
        return prevFiles.filter((_file) => _file.path !== file.path);
      });
    },
    []
  );

  const handleFilesRemoveAll = useCallback(
    (): void => {
      setFiles([]);
    },
    []
  );

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...props}
    >
      <Stack spacing={4}>
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
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Product Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <div>
                    <Typography
                      color="text.secondary"
                      sx={{ mb: 2 }}
                      variant="subtitle2"
                    >
                      Description
                    </Typography>
                    <QuillEditor
                      onChange={(value: string): void => {
                        formik.setFieldValue('description', value);
                      }}
                      placeholder="Write something"
                      sx={{ height: 400 }}
                      value={formik.values.description}
                    />
                    {!!(formik.touched.description && formik.errors.description) && (
                      <Box sx={{ mt: 2 }}>
                        <FormHelperText error>
                          {formik.errors.description}
                        </FormHelperText>
                      </Box>
                    )}
                  </div>
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
                <Stack spacing={1}>
                  <Typography variant="h6">
                    Images
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                    Images will appear in the store front of your website.
                  </Typography>
                </Stack>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <FileDropzone
                  accept={{ 'image/*': [] }}
                  caption="(SVG, JPG, PNG, or gif maximum 900x400)"
                  files={files}
                  onDrop={handleFilesDrop}
                  onRemove={handleFileRemove}
                  onRemoveAll={handleFilesRemoveAll}
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
                  Pricing
                </Typography>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.oldPrice && formik.errors.oldPrice)}
                    fullWidth
                    label="Old price"
                    name="oldPrice"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.oldPrice}
                  />
                  <TextField
                    error={!!(formik.touched.newPrice && formik.errors.newPrice)}
                    fullWidth
                    label="New Price"
                    name="newPrice"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.newPrice}
                  />
                  <div>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Keep selling when stock is empty"
                    />
                  </div>
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
                  Category
                </Typography>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    label="Category"
                    name="category"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    value={formik.values.category}
                  >
                    {categoryOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    disabled
                    error={!!(formik.touched.barcode && formik.errors.barcode)}
                    fullWidth
                    label="Barcode"
                    name="barcode"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.barcode}
                  />
                  <TextField
                    disabled
                    error={!!(formik.touched.sku && formik.errors.sku)}
                    fullWidth
                    label="SKU"
                    name="sku"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.sku}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={1}
        >
          <Button color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
