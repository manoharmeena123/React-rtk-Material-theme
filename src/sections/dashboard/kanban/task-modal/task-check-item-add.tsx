import type { ChangeEvent, FC } from 'react';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';

interface TaskCheckItemAddProps {
  onAdd?: (name: string) => void;
}

export const TaskCheckItemAdd: FC<TaskCheckItemAddProps> = (props) => {
  const { onAdd, ...other } = props;
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const handleAdd = useCallback(
    (): void => {
      setIsAdding(true);
    },
    []
  );

  const handleCancel = useCallback(
    (): void => {
      setIsAdding(false);
      setName('');
    },
    []
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setName(event.target.value);
    },
    []
  );

  const handleSave = useCallback(
    async (): Promise<void> => {
      if (!name) {
        return;
      }

      onAdd?.(name);
      setIsAdding(false);
      setName('');
    },
    [name, onAdd]
  );

  return (
    <div {...other}>
      {
        isAdding
          ? (
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <OutlinedInput
                onChange={handleChange}
                placeholder="Add an item"
                value={name}
                sx={{
                  flexGrow: 1,
                  '& .MuiInputBase-input': {
                    px: 2,
                    py: 1
                  }
                }}
              />
              <Button
                onClick={handleSave}
                size="small"
                variant="contained"
              >
                Add
              </Button>
              <Button
                color="inherit"
                onClick={handleCancel}
                size="small"
              >
                Cancel
              </Button>
            </Stack>
          )
          : (
            <Button
              color="inherit"
              onClick={handleAdd}
              size="small"
              startIcon={(
                <SvgIcon>
                  <PlusIcon />
                </SvgIcon>
              )}
            >
              Add Item
            </Button>
          )
      }
    </div>
  );
};

TaskCheckItemAdd.propTypes = {
  onAdd: PropTypes.func
};
