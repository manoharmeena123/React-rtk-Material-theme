import type { ChangeEvent, FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import type { CheckItem, Checklist } from 'src/types/kanban';

import { TaskCheckItem } from './task-check-item';
import { TaskCheckItemAdd } from './task-check-item-add';

const calculateProgress = (checkItems: CheckItem[]): number => {
  const totalCheckItems = checkItems.length;
  const completedCheckItems = checkItems
    .filter((checkItem) => checkItem.state === 'complete')
    .length;
  const progress = totalCheckItems === 0
    ? 100
    : (completedCheckItems / totalCheckItems) * 100;

  return Math.round(progress);
};

interface TaskChecklistProps {
  checklist: Checklist;
  onCheckItemAdd?: (name: string) => void;
  onCheckItemDelete?: (checkItemId: string) => void;
  onCheckItemCheck?: (checkItemId: string) => void;
  onCheckItemUncheck?: (checkItemId: string) => void;
  onCheckItemRename?: (checkItemId: string, name: string) => void;
  onDelete?: () => void;
  onRename?: (name: string) => void;
}

export const TaskChecklist: FC<TaskChecklistProps> = (props) => {
  const {
    checklist,
    onCheckItemAdd,
    onCheckItemDelete,
    onCheckItemCheck,
    onCheckItemUncheck,
    onCheckItemRename,
    onDelete,
    onRename,
    ...other
  } = props;
  const [nameCopy, setNameCopy] = useState<string>(checklist.name);
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  // The current check item that is being renamed
  const [checkItemId, setCheckItemId] = useState<string | null>(null);

  const handleNameReset = useCallback(
    () => {
      setNameCopy(checklist.name);
    },
    [checklist]
  );

  useEffect(
    () => {
      handleNameReset();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checklist]
  );

  const handleNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setNameCopy(event.target.value);
    },
    []
  );

  const handleRenameInit = useCallback(
    (): void => {
      setIsRenaming(true);
    },
    []
  );

  const handleRenameCancel = useCallback(
    (): void => {
      setIsRenaming(false);
      setNameCopy(checklist.name);
    },
    [checklist]
  );

  const handleRenameComplete = useCallback(
    async (): Promise<void> => {
      if (!nameCopy || nameCopy === checklist.name) {
        setIsRenaming(false);
        setNameCopy(checklist.name);
        return;
      }

      setIsRenaming(false);
      onRename?.(nameCopy);
    },
    [checklist, nameCopy, onRename]
  );

  const handleCheckItemRenameInit = useCallback(
    (checkItemId: string): void => {
      setCheckItemId(checkItemId);
    },
    []
  );

  const handleCheckItemRenameCancel = useCallback(
    (): void => {
      setCheckItemId(null);
    },
    []
  );

  const handleCheckItemRenameComplete = useCallback(
    (checkItemId: string, name: string): void => {
      setCheckItemId(null);
      onCheckItemRename?.(checkItemId, name);
    },
    [onCheckItemRename]
  );

  // Maybe use memo to calculate the progress
  const progress = calculateProgress(checklist.checkItems);
  const hasCheckItems = checklist.checkItems.length > 0;

  return (
    <Card
      variant="outlined"
      {...other}
    >
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        sx={{ p: 1 }}
      >
        <Input
          disableUnderline
          fullWidth
          onChange={handleNameChange}
          onClick={handleRenameInit}
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
                  : 'neutral.100',
                borderRadius: 1
              }
            }
          }}
          value={nameCopy}
        />
        {
          isRenaming
            ? (
              <>
                <Button
                  onClick={handleRenameComplete}
                  size="small"
                  variant="contained"
                >
                  Save
                </Button>
                <Button
                  color="inherit"
                  onClick={handleRenameCancel}
                  size="small"
                >
                  Cancel
                </Button>
              </>
            )
            : (
              <IconButton onClick={onDelete}>
                <SvgIcon fontSize="small">
                  <Trash02Icon />
                </SvgIcon>
              </IconButton>
            )
        }
      </Stack>
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        sx={{
          pb: 3,
          pt: 2,
          px: 3
        }}
      >
        <LinearProgress
          color="primary"
          sx={{
            borderRadius: 1,
            flexGrow: 1,
            height: 8,
            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 'inherit'
            }
          }}
          value={progress}
          variant="determinate"
        />
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {progress}%
        </Typography>
      </Stack>
      <Divider />
      {hasCheckItems && (
        <>
          <Stack
            divider={<Divider />}
            spacing={1}
          >
            {checklist.checkItems.map((checkItem) => {
              const isRenaming = checkItemId === checkItem.id;

              return (
                <TaskCheckItem
                  key={checkItem.id}
                  checkItem={checkItem}
                  onCheck={() => onCheckItemCheck?.(checkItem.id)}
                  onDelete={() => onCheckItemDelete?.(checkItem.id)}
                  onRenameCancel={handleCheckItemRenameCancel}
                  onRenameComplete={(name) => handleCheckItemRenameComplete(checkItem.id, name)}
                  onRenameInit={() => handleCheckItemRenameInit(checkItem.id)}
                  onUncheck={() => onCheckItemUncheck?.(checkItem.id)}
                  isRenaming={isRenaming}
                />
              );
            })}
          </Stack>
          <Divider />
        </>
      )}
      <Box sx={{ p: 1 }}>
        <TaskCheckItemAdd onAdd={onCheckItemAdd} />
      </Box>
    </Card>
  );
};

TaskChecklist.propTypes = {
  // @ts-ignore
  checklist: PropTypes.object.isRequired
};
