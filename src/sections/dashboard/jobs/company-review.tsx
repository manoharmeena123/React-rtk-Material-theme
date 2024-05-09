import type { FC } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceStrict } from 'date-fns';
import type { Review } from 'src/types/job';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { getInitials } from 'src/utils/get-initials';

interface CompanyReviewProps {
  review: Review;
}

export const CompanyReview: FC<CompanyReviewProps> = (props) => {
  const { review } = props;

  const ago = formatDistanceStrict(review.createdAt, new Date(), { addSuffix: true });

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            alignItems={{
              xs: 'flex-start',
              sm: 'center'
            }}
            direction={{
              xs: 'column',
              sm: 'row'
            }}
          >
            <Avatar src={review.avatar}>
              {getInitials(review.author)}
            </Avatar>
            <Stack spacing={1}>
              <Typography variant="subtitle1">
                {review.title}
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                divider={<span>•</span>}
                flexWrap="wrap"
                spacing={2}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Rating
                    value={review.rating / 5}
                    precision={0.1}
                    readOnly
                    max={1}
                  />
                  <Typography
                    noWrap
                    variant="subtitle2"
                  >
                    {review.rating}/5
                  </Typography>
                </Stack>
                <Typography
                  noWrap
                  variant="subtitle2"
                >
                  {review.author}
                </Typography>
                <Typography
                  color="text.secondary"
                  noWrap
                  variant="body2"
                >
                  {ago}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Typography variant="body1">
            {review.description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

CompanyReview.propTypes = {
  // @ts-ignore
  review: PropTypes.object.isRequired
};
