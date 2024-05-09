import type { FC } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import type { Company } from 'src/types/job';
import { getInitials } from 'src/utils/get-initials';

interface CompanySummaryProps {
  company: Company;
}

export const CompanySummary: FC<CompanySummaryProps> = (props) => {
  const { company, ...other } = props;

  return (
    <Card {...other}>
      <CardContent>
        <Typography
          color="text.secondary"
          component="p"
          sx={{ mb: 2 }}
          variant="overline"
        >
          About
        </Typography>
        <PropertyList>
          <PropertyListItem
            align="vertical"
            label="Website"
            sx={{
              px: 0,
              py: 1
            }}
            value={company.website}
          />
          <PropertyListItem
            align="vertical"
            label="Locations"
            sx={{
              px: 0,
              py: 1
            }}
          >
            {(company.locations || []).map((location) => (
              <Typography
                key={location}
                color="text.secondary"
                variant="body2"
              >
                {location}
              </Typography>
            ))}
          </PropertyListItem>
          <PropertyListItem
            align="vertical"
            label="Company size"
            sx={{
              px: 0,
              py: 1
            }}
            value={company.employees}
          />
        </PropertyList>
        <Divider sx={{ my: 2 }} />
        <Typography
          color="text.secondary"
          component="p"
          sx={{ mb: 2 }}
          variant="overline"
        >
          Founders
        </Typography>
        <Stack spacing={2}>
          {(company.founders || []).map((founder) => (
            <Stack
              alignItems="center"
              direction="row"
              key={founder.id}
              spacing={2}
            >
              <Avatar src={founder.avatar}>
                {getInitials(founder.name)}
              </Avatar>
              <div>
                <Typography variant="subtitle2">
                  {founder.name}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  {founder.role}
                </Typography>
              </div>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

CompanySummary.propTypes = {
  // @ts-ignore
  company: PropTypes.object.isRequired
};
