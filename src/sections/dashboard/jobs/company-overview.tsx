import type { FC } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import type { Company } from 'src/types/job';

import { CompanyJobs } from './company-jobs';
import { CompanyMember } from './company-member';

const MarkdownWrapper = styled('div')(
  ({ theme }) => ({
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    '& p': {
      fontSize: theme.typography.body2.fontSize,
      lineHeight: theme.typography.body1.lineHeight,
      marginBottom: theme.spacing(2)
    }
  })
);

interface CompanyOverviewProps {
  company: Company;
}

export const CompanyOverview: FC<CompanyOverviewProps> = (props) => {
  const { company, ...other } = props;

  // Limit to 2 members visible
  const members = (company.members || []).slice(0, 2);
  const images = company.images || [];

  return (
    <div {...other}>
      <div>
        <Typography variant="h5">
          {company.shortDescription}
        </Typography>
      </div>
      <Box sx={{ mt: 3 }}>
        <MarkdownWrapper>
          {company.description && (
            <Markdown children={company.description} />
          )}
        </MarkdownWrapper>
      </Box>
      <ImageList
        cols={3}
        gap={24}
        variant="masonry"
      >
        {images.map((image, index) => (
          <ImageListItem key={index}>
            <img
              alt={`${company.name} gallery`}
              src={`${image}?w=248&fit=crop&auto=format`}
              srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        spacing={3}
        sx={{ mt: 3 }}
      >
        <Typography variant="h6">
          Jobs
        </Typography>
        <Link
          color="inherit"
          component={RouterLink}
          href={paths.dashboard.jobs.companies.details}
          variant="subtitle2"
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Typography
            sx={{ mr: 1 }}
            variant="subtitle2"
          >
            Jobs
          </Typography>
          <SvgIcon>
            <ArrowRightIcon />
          </SvgIcon>
        </Link>
      </Stack>
      <Box sx={{ mt: 3 }}>
        <CompanyJobs jobs={company.jobs} />
      </Box>
      <Divider sx={{ my: 3 }} />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        spacing={3}
      >
        <Typography variant="h6">
          Members
        </Typography>
        <Link
          color="inherit"
          component={RouterLink}
          href={paths.dashboard.jobs.companies.details}
          variant="subtitle2"
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Typography
            sx={{ mr: 1 }}
            variant="subtitle2"
          >
            Members
          </Typography>
          <SvgIcon>
            <ArrowRightIcon />
          </SvgIcon>
        </Link>
      </Stack>
      <Box
        sx={{
          mb: -1.5,
          mt: 1.5,
          mx: -1.5
        }}
      >
        <Grid
          container
          spacing={3}
        >
          {members.map((member) => (
            <Grid
              key={member.id}
              xs={12}
              sm={6}
            >
              <CompanyMember member={member} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

CompanyOverview.propTypes = {
  // @ts-ignore
  company: PropTypes.object.isRequired
};
