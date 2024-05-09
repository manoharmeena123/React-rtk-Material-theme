import type { FC } from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import ClockIcon from '@untitled-ui/icons-react/build/esm/Clock';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import type { Course } from 'src/types/academy';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: FC<CourseCardProps> = (props) => {
  const { course } = props;

  return (
    <Card variant="outlined">
      <CardMedia
        component={RouterLink}
        href={paths.dashboard.academy.courseDetails}
        image={course.media}
        sx={{ height: 180 }}
      />
      <CardContent>
        <Link
          color="text.primary"
          component={RouterLink}
          href={paths.dashboard.academy.courseDetails}
          underline="none"
          variant="subtitle1"
        >
          {course.title}
        </Link>
        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
          variant="body2"
        >
          {course.description}
        </Typography>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
          sx={{ mt: 1 }}
        >
          <SvgIcon>
            <ClockIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            {course.duration}
          </Typography>
        </Stack>
      </CardContent>
      <LinearProgress
        value={course.progress}
        variant="determinate"
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1
        }}
      >
        <Button
          color="inherit"
          component={RouterLink}
          endIcon={(
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          )}
          href={paths.dashboard.academy.courseDetails}
        >
          Continue
        </Button>
      </Box>
    </Card>
  );
};

CourseCard.propTypes = {
  // @ts-ignore
  course: PropTypes.object.isRequired
};
