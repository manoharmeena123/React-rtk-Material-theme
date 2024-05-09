import type { FC } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { Review } from 'src/types/job';

import { CompanyReview } from './company-review';
import { CompanyReviewAdd } from './company-review-add';
import { CompanyReviewsSummary } from './company-reviews-summary';

interface CompanyReviewsProps {
  reviews?: Review[];
  averageRating?: number;
}

export const CompanyReviews: FC<CompanyReviewsProps> = (props) => {
  const { reviews= [], averageRating = 0, ...other } = props;

  return (
    <Stack
      spacing={3}
      {...other}
    >
      <div>
        <Typography variant="h6">
          Reviews
        </Typography>
      </div>
      <Stack spacing={3}>
        <CompanyReviewsSummary
          averageRating={averageRating}
          totalReviews={reviews.length}
        />
        {reviews.map((review) => (
          <CompanyReview
            key={review.id}
            review={review}
          />
        ))}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button color="inherit">
            Load more
          </Button>
        </Box>
        <CompanyReviewAdd />
      </Stack>
    </Stack>
  );
};

CompanyReviews.propTypes = {
  reviews: PropTypes.array,
  averageRating: PropTypes.number
};
