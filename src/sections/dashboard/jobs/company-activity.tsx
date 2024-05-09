import type { FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';

import type { Activity } from 'src/types/job';
import { getInitials } from 'src/utils/get-initials';

const renderContent = (activity: Activity): JSX.Element | null => {
  switch (activity.type) {
    case 'new_job':
      return (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          <Typography
            sx={{ mr: 0.5 }}
            variant="subtitle2"
          >
            {activity.author}
          </Typography>
          <Typography
            sx={{ mr: 0.5 }}
            variant="body2"
          >
            added a new job
          </Typography>
          <Typography
            color="primary"
            variant="subtitle2"
          >
            <Link href="#">
              {activity.addedJob}
            </Link>
          </Typography>
        </Box>
      );
    case 'new_team_member':
      return (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          <Typography
            sx={{ mr: 0.5 }}
            variant="subtitle2"
          >
            {activity.author}
          </Typography>
          <Typography
            sx={{ mr: 0.5 }}
            variant="body2"
          >
            added
          </Typography>
          <Typography
            sx={{ mr: 0.5 }}
            variant="subtitle2"
          >
            {activity.addedMember}
          </Typography>
          <Typography variant="body2">
            as a team member
          </Typography>
        </Box>
      );
    case 'created':
      return (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          <Typography
            sx={{ mr: 0.5 }}
            variant="subtitle2"
          >
            {activity.author}
          </Typography>
          <Typography
            sx={{ mr: 0.5 }}
            variant="body2"
          >
            created
          </Typography>
          <Typography variant="subtitle2">
            {activity.createdCompany}
          </Typography>
        </Box>
      );
    default:
      return null;
  }
};

interface CompanyActivityProps {
  activities?: Activity[];
}

export const CompanyActivity: FC<CompanyActivityProps> = (props) => {
  const { activities = [], ...other } = props;

  return (
    <Stack
      spacing={3}
      {...other}
    >
      <div>
        <Typography variant="h6">
          Activity
        </Typography>
      </div>
      <Stack spacing={3}>
        <Timeline
          sx={{
            p: 0,
            m: 0
          }}
        >
          {activities.map((activity, index) => {
            const showConnector = activities.length - 1 > index;
            const createdAt = format(activity.createdAt, 'MMM dd, HH:mm a');

            return (
              <TimelineItem
                key={activity.id}
                sx={{
                  '&:before': {
                    display: 'none'
                  }
                }}
              >
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      border: 0,
                      p: 0
                    }}
                  >
                    <Avatar src={activity.avatar}>
                      {getInitials(activity.author)}
                    </Avatar>
                  </TimelineDot>
                  {showConnector && (
                    <TimelineConnector sx={{ minHeight: 30 }} />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  {renderContent(activity)}
                  <Typography
                    color="text.secondary"
                    variant="caption"
                    sx={{ mt: 1 }}
                  >
                    {createdAt}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
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
      </Stack>
    </Stack>
  );
};

CompanyActivity.propTypes = {
  activities: PropTypes.array
};
