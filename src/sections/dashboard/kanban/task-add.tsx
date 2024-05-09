import type { ChangeEvent, FC } from 'react';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

interface TaskAddProps {
  onAdd?: (name?: string) => void;
}

export const TaskAdd: FC<TaskAddProps> = (props) => {
  const { onAdd, ...other } = props;
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const handleNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setName(event.target.value);
    },
    []
  );

  const handleAddInit = useCallback(
    (): void => {
      setIsAdding(true);
    },
    []
  );

  const handleAddCancel = useCallback(
    (): void => {
      setIsAdding(false);
      setName('');
    },
    []
  );

  const handleAddConfirm = useCallback(
    async (): Promise<void> => {
      onAdd?.(name);
      setIsAdding(false);
      setName('');
    },
    [name, onAdd]
  );

  return (
    <Card
      sx={{
        backgroundColor: (theme) => theme.palette.mode === 'dark'
          ? 'neutral.800'
          : 'background.paper'
      }}
      {...other}
    >
      {
        isAdding
          ? (
            <Box sx={{ p: 2 }}>
              <OutlinedInput
                autoFocus
                fullWidth
                placeholder="My new task"
                name="name"
                onChange={handleNameChange}
                sx={{
                  '& .MuiInputBase-input': {
                    px: 2,
                    py: 1
                  }
                }}
                value={name}
              />
              <Stack
                alignItems="center"
                direction="row"
                spacing={2}
                sx={{ mt: 2 }}
              >
                <Button
                  onClick={handleAddConfirm}
                  size="small"
                  startIcon={(
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add Task
                </Button>
                <Button
                  color="inherit"
                  onClick={handleAddCancel}
                  size="small"
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          )
          : (
            <Stack
              alignItems="center"
              direction="row"
              onClick={handleAddInit}
              spacing={1}
              sx={{
                cursor: 'pointer',
                p: 2,
                userSelect: 'none'
              }}
            >
              <SvgIcon color="action">
                <PlusIcon />
              </SvgIcon>
              <Typography
                color="text.secondary"
                variant="subtitle1"
              >
                Add Task
              </Typography>
            </Stack>
          )
      }
    </Card>
  );
};

TaskAdd.propTypes = {
  onAdd: PropTypes.func
};
