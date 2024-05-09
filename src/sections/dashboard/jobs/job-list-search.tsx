import type { FC } from 'react';
import { useMemo } from 'react';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { MultiSelect } from 'src/components/multi-select';

interface SearchChip {
  label: string;
  field: 'type' | 'level' | 'location' | 'role';
  value: unknown;
  displayValue?: unknown;
}

interface Option {
  label: string;
  value: string;
}

const typeOptions: Option[] = [
  {
    label: 'Freelance',
    value: 'freelance'
  },
  {
    label: 'Full Time',
    value: 'fullTime'
  },
  {
    label: 'Part Time',
    value: 'partTime'
  },
  {
    label: 'Internship',
    value: 'internship'
  }
];

const levelOptions: Option[] = [
  {
    label: 'Novice',
    value: 'novice'
  },
  {
    label: 'Expert',
    value: 'expert'
  }
];

const locationOptions: Option[] = [
  {
    label: 'Africa',
    value: 'africa'
  },
  {
    label: 'Asia',
    value: 'asia'
  },
  {
    label: 'Europe',
    value: 'europe'
  },
  {
    label: 'North America',
    value: 'northAmerica'
  },
  {
    label: 'South America',
    value: 'southAmerica'
  }
];

const roleOptions: Option[] = [
  {
    label: 'Web Developer',
    value: 'webDeveloper'
  },
  {
    label: 'Android Developer',
    value: 'androidDeveloper'
  },
  {
    label: 'iOS Developer',
    value: 'iosDeveloper'
  }
];

export const JobListSearch: FC = (props) => {
  const chips = useMemo<SearchChip[]>(
    () => [
      {
        label: 'Type',
        field: 'type',
        value: 'freelance',
        displayValue: 'Freelance'
      },
      {
        label: 'Type',
        field: 'type',
        value: 'internship',
        displayValue: 'Internship'
      },
      {
        label: 'Level',
        field: 'level',
        value: 'novice',
        displayValue: 'Novice'
      },
      {
        label: 'Location',
        field: 'location',
        value: 'asia',
        displayValue: 'Asia'
      },
      {
        label: 'Role',
        field: 'role',
        value: 'webDeveloper',
        displayValue: 'Web Developer'
      }
    ],
    []
  );

  // We memoize this part to prevent re-render issues
  const typeValues = useMemo(
    () => chips
      .filter((chip) => chip.field === 'type')
      .map((chip) => chip.value),
    [chips]
  );

  const levelValues = useMemo(
    () => chips
      .filter((chip) => chip.field === 'level')
      .map((chip) => chip.value),
    [chips]
  );

  const locationValues = useMemo(
    () => chips
      .filter((chip) => chip.field === 'location')
      .map((chip) => chip.value),
    [chips]
  );

  const roleValues = useMemo(
    () => chips
      .filter((chip) => chip.field === 'role')
      .map((chip) => chip.value),
    [chips]
  );

  const showChips = chips.length > 0;

  return (
    <Card {...props}>
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        sx={{ p: 2 }}
      >
        <SvgIcon>
          <SearchMdIcon />
        </SvgIcon>
        <Box sx={{ flexGrow: 1 }}>
          <Input
            disableUnderline
            fullWidth
            placeholder="Enter a keyword"
          />
        </Box>
      </Stack>
      <Divider />
      {
        showChips
          ? (
            <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              gap={1}
              sx={{ p: 2 }}
            >
              {chips.map((chip, index) => (
                <Chip
                  key={index}
                  label={(
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        '& span': {
                          fontWeight: 600
                        }
                      }}
                    >
                      <>
                        <span>
                          {chip.label}
                        </span>
                        :
                        {' '}
                        {chip.displayValue || chip.value}
                      </>
                    </Box>
                  )}
                  onDelete={(): void => {}}
                  variant="outlined"
                />
              ))}
            </Stack>
          )
          : (
            <Box sx={{ p: 2.5 }}>
              <Typography
                color="text.secondary"
                variant="subtitle2"
              >
                No filters applied
              </Typography>
            </Box>
          )
      }
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={2}
        sx={{ p: 1 }}
      >
        <MultiSelect
          label="Type"
          options={typeOptions}
          value={typeValues}
        />
        <MultiSelect
          label="Level"
          options={levelOptions}
          value={levelValues}
        />
        <MultiSelect
          label="Location"
          options={locationOptions}
          value={locationValues}
        />
        <MultiSelect
          label="Role"
          options={roleOptions}
          value={roleValues}
        />
        <Box sx={{ flexGrow: 1 }} />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="In network"
        />
      </Stack>
    </Card>
  );
};
