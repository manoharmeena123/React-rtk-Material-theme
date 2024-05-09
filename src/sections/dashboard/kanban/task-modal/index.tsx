import type { ChangeEvent, FC, KeyboardEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import debounce from 'lodash.debounce';
import ArchiveIcon from '@untitled-ui/icons-react/build/esm/Archive';
import EyeIcon from '@untitled-ui/icons-react/build/esm/Eye';
import EyeOffIcon from '@untitled-ui/icons-react/build/esm/EyeOff';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { useMockedUser } from 'src/hooks/use-mocked-user';
import type { RootState } from 'src/store';
import { useDispatch, useSelector } from 'src/store';
import { thunks } from 'src/thunks/kanban';
import type { Column, Member, Task } from 'src/types/kanban';

import { TaskChecklist } from './task-checklist';
import { TaskComment } from './task-comment';
import { TaskCommentAdd } from './task-comment-add';
import { TaskLabels } from './task-labels';
import { TaskStatus } from './task-status';

const useColumns = (): Column[] => {
  return useSelector((state) => {
    const { columns } = state.kanban;

    return Object.values(columns.byId);
  });
};

const useTask = (taskId?: string): Task | null => {
  return useSelector((state: RootState) => {
    const { tasks } = state.kanban;

    if (!taskId) {
      return null;
    }

    return tasks.byId[taskId] || null;
  });
};

const useColumn = (columnId?: string): Column | null => {
  return useSelector((state) => {
    const { columns } = state.kanban;

    if (!columnId) {
      return null;
    }

    return columns.byId[columnId] || null;
  });
};

const useAuthor = (authorId?: string): Member | null => {
  return useSelector((state: RootState) => {
    const { members } = state.kanban;

    if (!authorId) {
      return null;
    }

    return members.byId[authorId] || null;
  });
};

const useAssignees = (assigneesIds?: string[]): Member[] => {
  return useSelector((state: RootState) => {
    const { members } = state.kanban;

    if (!assigneesIds) {
      return [];
    }

    return assigneesIds
      .map((assigneeId: string) => members.byId[assigneeId])
      .filter((assignee) => !!assignee);
  });
};

interface TaskModalProps {
  onClose?: () => void;
  open?: boolean;
  taskId?: string;
}

export const TaskModal: FC<TaskModalProps> = (props) => {
  const { taskId, onClose, open = false, ...other } = props;
  const user = useMockedUser();
  const dispatch = useDispatch();
  const columns = useColumns();
  const task = useTask(taskId);
  const column = useColumn(task?.columnId);
  const author = useAuthor(task?.authorId);
  const assignees = useAssignees(task?.assigneesIds);
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [nameCopy, setNameCopy] = useState<string>(task?.name || '');
  const debounceMs = 500;

  const handleTabsReset = useCallback(
    () => {
      setCurrentTab('overview');
    },
    []
  );

  // Reset tab on task change
  useEffect(
    () => {
      handleTabsReset();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [taskId]
  );

  const handleNameReset = useCallback(
    () => {
      setNameCopy(task?.name || '');
    },
    [task]
  );

  // Reset task name copy
  useEffect(
    () => {
      handleNameReset();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [task]
  );

  const handleTabsChange = useCallback(
    (event: ChangeEvent<{}>, value: string): void => {
      setCurrentTab(value);
    },
    []
  );

  const handleMove = useCallback(
    async (columnId: string): Promise<void> => {
      try {
        await dispatch(thunks.moveTask({
          taskId: task!.id,
          position: 0,
          columnId
        }));
        onClose?.();
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
    [dispatch, task, onClose]
  );

  const handleDelete = useCallback(
    async (): Promise<void> => {
      try {
        await dispatch(thunks.deleteTask({
          taskId: task!.id
        }));
        onClose?.();
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
    [dispatch, task, onClose]
  );

  const handleNameUpdate = useCallback(
    async (name: string) => {
      try {
        await dispatch(thunks.updateTask({
          taskId: task!.id,
          update: {
            name
          }
        }));
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
    [dispatch, task]
  );

  const handleNameBlur = useCallback(
    () => {
      if (!nameCopy) {
        setNameCopy(task!.name);
        return;
      }

      if (nameCopy === task!.name) {
        return;
      }

      handleNameUpdate(nameCopy);
    },
    [task, nameCopy, handleNameUpdate]
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
        if (nameCopy && nameCopy !== task!.name) {
          handleNameUpdate(nameCopy);
        }
      }
    },
    [task, nameCopy, handleNameUpdate]
  );

  const handleDescriptionUpdate = useMemo(
    () => debounce(
      async (description: string) => {
        try {
          await dispatch(thunks.updateTask({
            taskId: task!.id,
            update: {
              description
            }
          }));
        } catch (err) {
          console.error(err);
          toast.error('Something went wrong!');
        }
      },
      debounceMs
    ),
    [dispatch, task]
  );

  const handleDescriptionChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      handleDescriptionUpdate(event.target.value);
    },
    [handleDescriptionUpdate]
  );

  const handleSubscribe = useCallback(
    async (): Promise<void> => {
      try {
        await dispatch(thunks.updateTask({
          taskId: task!.id,
          update: { isSubscribed: true }
        }));
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
    [dispatch, task]
  );

  const handleUnsubscribe = useCallback(
    async (): Promise<void> => {
      try {
        await dispatch(thunks.updateTask({
          taskId: task!.id,
          update: { isSubscribed: false }
        }));
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
    [dispatch, task]
  );

  const handleLabelsChange = useCallback(
    async (labels: string[]): Promise<void> => {
      try {
        await dispatch(thunks.updateTask({
          taskId: task!.id,
          update: {
            labels
          }
        }));
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
    [dispatch, task]
  );

  const handleChecklistAdd = useCallback(
    async (): Promise<void> => {
      try {
        await dispatch(thunks.addChecklist({
          taskId: task!.id,
          name: 'Untitled Checklist'
        }));
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
    [dispatch, task]
  );

  const handleChecklistRename = useCallback(
    async (checklistId: string, name: string): Promise<void> => {
      try {
        await dispatch(thunks.updateChecklist({
          taskId: task!.id,
          checklistId,
          update: { name }
        }));
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
    [dispatch, task]
  );

  const handleChecklistDelete = useCallback(
    async (checklistId: string): Promise<void> => {
      try {
        await dispatch(thunks.deleteChecklist({
          taskId: task!.id,
          checklistId
        }));
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
    [dispatch, task]
  );

  const handleCheckItemAdd = useCallback(
    async (checklistId: string, name: string): Promise<void> => {
      try {
        await dispatch(thunks.addCheckItem({
          taskId: task!.id,
          checklistId,
          name
        }));
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
    [dispatch, task]
  );

  const handleCheckItemDelete = useCallback(
    async (checklistId: string, checkItemId: string): Promise<void> => {
      try {
        await dispatch(thunks.deleteCheckItem({
          taskId: task!.id,
          checklistId,
          checkItemId
        }));
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
    [dispatch, task]
  );

  const handleCheckItemCheck = useCallback(
    async (checklistId: string, checkItemId: string): Promise<void> => {
      try {
        await dispatch(thunks.updateCheckItem({
          taskId: task!.id,
          checklistId,
          checkItemId,
          update: {
            state: 'complete'
          }
        }));
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
    [dispatch, task]
  );

  const handleCheckItemUncheck = useCallback(
    async (checklistId: string, checkItemId: string): Promise<void> => {
      try {
        await dispatch(thunks.updateCheckItem({
          taskId: task!.id,
          checklistId,
          checkItemId,
          update: {
            state: 'incomplete'
          }
        }));
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
    [dispatch, task]
  );

  const handleCheckItemRename = useCallback(
    async (checklistId: string, checkItemId: string, name: string): Promise<void> => {
      try {
        await dispatch(thunks.updateCheckItem({
          taskId: task!.id,
          checklistId,
          checkItemId,
          update: {
            name
          }
        }));
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
    [dispatch, task]
  );

  const handleCommentAdd = useCallback(
    async (message: string): Promise<void> => {
      try {
        await dispatch(thunks.addComment({
          taskId: task!.id,
          message
        }));
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
    [dispatch, task]
  );

  const statusOptions = useMemo(
    () => {
      return columns.map((column) => {
        return {
          label: column.name,
          value: column.id
        };
      });
    },
    [columns]
  );

  const content = !!(task && column)
    ? (
      <>
        <Stack
          alignItems={{
            sm: 'center'
          }}
          direction={{
            xs: 'column-reverse',
            sm: 'row'
          }}
          justifyContent={{
            sm: 'space-between'
          }}
          spacing={1}
          sx={{ p: 3 }}
        >
          <div>
            <TaskStatus
              onChange={(columnId) => handleMove(columnId)}
              options={statusOptions}
              value={column.id}
            />
          </div>
          <Stack
            justifyContent="flex-end"
            alignItems="center"
            direction="row"
            spacing={1}
          >
            {
              task.isSubscribed
                ? (
                  <IconButton onClick={handleUnsubscribe}>
                    <SvgIcon>
                      <EyeOffIcon />
                    </SvgIcon>
                  </IconButton>
                )
                : (
                  <IconButton onClick={handleSubscribe}>
                    <SvgIcon>
                      <EyeIcon />
                    </SvgIcon>
                  </IconButton>
                )
            }
            <IconButton onClick={handleDelete}>
              <SvgIcon>
                <ArchiveIcon />
              </SvgIcon>
            </IconButton>
            {!mdUp && (
              <IconButton onClick={onClose}>
                <SvgIcon>
                  <XIcon />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>
        </Stack>
        <Box sx={{ px: 1 }}>
          <Input
            disableUnderline
            fullWidth
            onBlur={handleNameBlur}
            onChange={handleNameChange}
            onKeyUp={handleNameKeyUp}
            placeholder="Task name"
            sx={(theme) => ({
              ...theme.typography.h6,
              '& .MuiInputBase-input': {
                borderRadius: 1.5,
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
            })}
            value={nameCopy}
          />
        </Box>
        <Tabs
          onChange={handleTabsChange}
          sx={{ px: 3 }}
          value={currentTab}
        >
          <Tab
            value="overview"
            label="Overview"
          />
          <Tab
            value="checklists"
            label="Checklists"
          />
          <Tab
            value="comments"
            label="Comments"
          />
        </Tabs>
        <Divider />
        <Box sx={{ p: 3 }}>
          {currentTab === 'overview' && (
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                sm={4}
              >
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  Created by
                </Typography>
              </Grid>
              <Grid
                xs={12}
                sm={8}
              >
                {author && (
                  <Avatar src={author.avatar || undefined} />
                )}
              </Grid>
              <Grid
                xs={12}
                sm={4}
              >
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  Assigned to
                </Typography>
              </Grid>
              <Grid
                xs={12}
                sm={8}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  flexWrap="wrap"
                  spacing={1}
                >
                  <AvatarGroup max={5}>
                    {assignees.map((assignee) => (
                      <Avatar
                        key={assignee.id}
                        src={assignee.avatar || undefined}
                      />
                    ))}
                  </AvatarGroup>
                  <IconButton disabled>
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  </IconButton>
                </Stack>
              </Grid>
              <Grid
                xs={12}
                sm={4}
              >
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  Attachments
                </Typography>
              </Grid>
              <Grid
                xs={12}
                sm={8}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  flexWrap="wrap"
                  spacing={1}
                >
                  {task.attachments.map((attachment) => (
                    <Avatar
                      key={attachment.id}
                      src={attachment.url || undefined}
                      sx={{
                        height: 64,
                        width: 64
                      }}
                      variant="rounded"
                    />
                  ))}
                  <IconButton disabled>
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  </IconButton>
                </Stack>
              </Grid>
              <Grid
                xs={12}
                sm={4}
              >
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  Due date
                </Typography>
              </Grid>
              <Grid
                xs={12}
                sm={8}
              >
                {task.due && (
                  <Chip
                    size="small"
                    label={format(task.due, 'MMM dd, yyyy')}
                  />
                )}
              </Grid>
              <Grid
                xs={12}
                sm={4}
              >
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  Labels
                </Typography>
              </Grid>
              <Grid
                xs={12}
                sm={8}
              >
                <TaskLabels
                  labels={task.labels}
                  onChange={handleLabelsChange}
                />
              </Grid>
              <Grid
                xs={12}
                sm={4}
              >
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  Description
                </Typography>
              </Grid>
              <Grid
                xs={12}
                sm={8}
              >
                <Input
                  defaultValue={task.description}
                  fullWidth
                  multiline
                  disableUnderline
                  onChange={handleDescriptionChange}
                  placeholder="Leave a message"
                  rows={6}
                  sx={{
                    borderColor: 'divider',
                    borderRadius: 1,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    p: 1
                  }}
                />
              </Grid>
            </Grid>
          )}
          {currentTab === 'checklists' && (
            <Stack spacing={2}>
              {task.checklists.map((checklist) => (
                <TaskChecklist
                  key={checklist.id}
                  checklist={checklist}
                  onCheckItemAdd={(name) => handleCheckItemAdd(checklist.id, name)}
                  onCheckItemDelete={(checkItemId) => handleCheckItemDelete(
                    checklist.id,
                    checkItemId
                  )}
                  onCheckItemCheck={(checkItemId) => handleCheckItemCheck(
                    checklist.id,
                    checkItemId
                  )}
                  onCheckItemUncheck={(checkItemId) => handleCheckItemUncheck(
                    checklist.id,
                    checkItemId
                  )}
                  onCheckItemRename={(checkItemId, name) => handleCheckItemRename(
                    checklist.id,
                    checkItemId,
                    name
                  )}
                  onDelete={() => handleChecklistDelete(checklist.id)}
                  onRename={(name) => handleChecklistRename(checklist.id, name)}
                />
              ))}
              <Button
                startIcon={(
                  <SvgIcon>
                    <PlusIcon />
                  </SvgIcon>
                )}
                onClick={handleChecklistAdd}
                variant="contained"
              >
                Add
              </Button>
            </Stack>
          )}
          {currentTab === 'comments' && (
            <Stack spacing={2}>
              {task.comments.map((comment) => (
                <TaskComment
                  key={comment.id}
                  comment={comment}
                />
              ))}
              <TaskCommentAdd
                avatar={user.avatar}
                onAdd={handleCommentAdd}
              />
            </Stack>
          )}
        </Box>
      </>
    )
    : null
  ;

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: 500
        }
      }}
      {...other}
    >
      {content}
    </Drawer>
  );
};

TaskModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  taskId: PropTypes.string
};
