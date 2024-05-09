import type { ChangeEvent, FC, KeyboardEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';

import { usePopover } from 'src/hooks/use-popover';

interface ColumnHeaderProps {
  tasksCount: number;
  name: string;
  onClear?: () => void;
  onDelete?: () => void;
  onRename?: (name: string) => void;
}

export const ColumnHeader: FC<ColumnHeaderProps> = (props) => {
  const { tasksCount, name, onClear, onDelete, onRename } = props;
  const popover = usePopover<HTMLButtonElement>();
  const [nameCopy, setNameCopy] = useState<string>(name);

  const handleNameReset = useCallback(
    () => {
      setNameCopy(name);
    },
    [name]
  );

  useEffect(
    () => {
      handleNameReset();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name]
  );

  const handleNameBlur = useCallback(
    () => {
      if (!nameCopy) {
        setNameCopy(name);
        return;
      }

      if (nameCopy === name) {
        return;
      }

      onRename?.(nameCopy);
    },
    [nameCopy, name, onRename]
  );

  const handleNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setNameCopy(event.target.value);
    },
    []
  );

  const handleNameKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>): void => {
      if (event.code === 'Enter') {
        if (nameCopy && nameCopy !== name) {
          onRename?.(nameCopy);
        }
      }
    },
    [nameCopy, name, onRename]
  );

  const handleClear = useCallback(
    (): void => {
      popover.handleClose();
      onClear?.();
    },
    [popover, onClear]
  );

  const handleDelete = useCallback(
    (): void => {
      popover.handleClose();
      onDelete?.();
    },
    [popover, onDelete]
  );

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          pr: 2,
          py: 1
        }}
      >
        <Input
          disableUnderline
          fullWidth
          onBlur={handleNameBlur}
          onChange={handleNameChange}
          onKeyUp={handleNameKeyUp}
          placeholder="Column Name"
          sx={{
            '& .MuiInputBase-input': {
              borderRadius: 1.5,
              fontWeight: 500,
              overflow: 'hidden',
              px: 2,
              py: 1,
              textOverflow: 'ellipsis',
              wordWrap: 'break-word',
              '&:hover, &:focus': {
                backgroundColor: (theme) => theme.palette.mode === 'dark'
                  ? 'neutral.800'
                  : 'neutral.100'
              }
            }
          }}
          value={nameCopy}
        />
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Chip label={tasksCount} />
          <IconButton
            edge="end"
            onClick={popover.handleOpen}
            ref={popover.anchorRef}
          >
            <SvgIcon>
              <DotsHorizontalIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
      </Stack>
      <Menu
        anchorEl={popover.anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        keepMounted
        onClose={popover.handleClose}
        open={popover.open}
      >
        <MenuItem onClick={handleClear}>
          Clear
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

ColumnHeader.propTypes = {
  tasksCount: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClear: PropTypes.func,
  onDelete: PropTypes.func,
  onRename: PropTypes.func
};
