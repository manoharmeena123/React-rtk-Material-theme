import type { Board, CheckItem, Checklist, Column, Comment, Task } from 'src/types/kanban';
import { createResourceId } from 'src/utils/create-resource-id';
import { deepCopy } from 'src/utils/deep-copy';
import { data } from './data';

// On server get current identity (user) from the request
const user = {
  id: '5e86809283e28b96d2d38537',
  avatar: '/assets/avatars/avatar-anika-visser.png',
  name: 'Anika Visser'
};

// You'll see here that we start with a deep clone of the board.
// The reason for that is to create a db session wannabe strategy.
// If something fails, we do not affect the original data until everything worked as expected.

type GetBoardRequest = {};

type GetBoardResponse = Promise<Board>;

type CreateColumnRequest = {
  name: string;
};

type CreateColumnResponse = Promise<Column>;

type UpdateColumnRequest = {
  columnId: string;
  update: {
    name: string;
  };
};

type UpdateColumnResponse = Promise<Column>;

type ClearColumnRequest = {
  columnId: string;
};

type ClearColumnResponse = Promise<true>;

type DeleteColumnRequest = {
  columnId: string;
};

type DeleteColumnResponse = Promise<true>;

type CreateTaskRequest = {
  columnId: string;
  name: string;
};

type CreateTaskResponse = Promise<Task>;

type UpdateTaskRequest = {
  taskId: string;
  update: {
    name?: string;
    description?: string;
    isSubscribed?: boolean;
    labels?: string[];
  }
};

type UpdateTaskResponse = Promise<Task>;

type MoveTaskRequest = {
  taskId: string;
  position: number;
  columnId?: string;
};

type MoveTaskResponse = Promise<true>;

type DeleteTaskRequest = {
  taskId: string;
};

type DeleteTaskResponse = Promise<true>;

type AddCommentRequest = {
  taskId: string;
  message: string;
};

type AddCommentResponse = Promise<Comment>;

type AddChecklistRequest = {
  taskId: string;
  name: string;
};

type AddChecklistResponse = Promise<Checklist>;

type UpdateChecklistRequest = {
  taskId: string;
  checklistId: string;
  update: {
    name: string
  };
};

type UpdateChecklistResponse = Promise<Checklist>;

type DeleteChecklistRequest = {
  taskId: string;
  checklistId: string;
};

type DeleteChecklistResponse = Promise<true>;

type AddCheckItemRequest = {
  taskId: string;
  checklistId: string;
  name: string;
};

type AddCheckItemResponse = Promise<CheckItem>;

type UpdateCheckItemRequest = {
  taskId: string;
  checklistId: string;
  checkItemId: string;
  update: {
    name?: string;
    state?: 'complete' | 'incomplete';
  };
};

type UpdateCheckItemResponse = Promise<CheckItem>;

type DeleteCheckItemRequest = {
  taskId: string;
  checklistId: string;
  checkItemId: string;
};

type DeleteCheckItemResponse = Promise<true>;

class KanbanApi {
  getBoard(request?: GetBoardRequest): GetBoardResponse {
    return Promise.resolve(deepCopy(data.board));
  }

  createColumn(request: CreateColumnRequest): CreateColumnResponse {
    const { name } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard = deepCopy(data.board);

        // Create the new column
        const column: Column = {
          id: createResourceId(),
          name,
          taskIds: []
        };

        clonedBoard.columns.push(column);

        // Save changes
        data.board = clonedBoard;

        resolve(deepCopy(column));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  updateColumn(request: UpdateColumnRequest): UpdateColumnResponse {
    const { columnId, update } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard: Board = deepCopy(data.board);

        // Find the column to clear
        const column = clonedBoard.columns.find((column) => column.id === columnId);

        if (!column) {
          reject(new Error('Column not found'));
          return;
        }

        // Update the column
        Object.assign(column, update);

        // Save changes
        data.board = clonedBoard;

        resolve(deepCopy(column));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  clearColumn(request: ClearColumnRequest): ClearColumnResponse {
    const { columnId } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard: Board = deepCopy(data.board);

        // Find the column to clear
        const column = clonedBoard.columns.find((column) => column.id === columnId);

        if (!column) {
          reject(new Error('Column not found'));
          return;
        }

        // Remove the tasks with columnId reference
        clonedBoard.tasks = clonedBoard.tasks.filter((task) => task.columnId !== columnId);

        // Remove all taskIds from the column
        column.taskIds = [];

        // Save changes
        data.board = clonedBoard;

        resolve(true);
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  deleteColumn(request: DeleteColumnRequest): DeleteColumnResponse {
    const { columnId } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard: Board = deepCopy(data.board);

        // Find the column to remove
        const column = clonedBoard.columns.find((column) => column.id === columnId);

        if (!column) {
          reject(new Error('Column not found'));
          return;
        }

        // Remove the tasks with columnId reference
        clonedBoard.tasks = clonedBoard.tasks.filter((task) => task.columnId !== columnId);

        // Remove the column from the board
        clonedBoard.columns = clonedBoard.columns.filter((column) => column.id !== columnId);

        // Save changes
        data.board = clonedBoard;

        resolve(true);
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  createTask(request: CreateTaskRequest): CreateTaskResponse {
    const { columnId, name } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard: Board = deepCopy(data.board);

        // Find the column where the new task will be added
        const column = clonedBoard.columns.find((column) => column.id === columnId);

        if (!column) {
          reject(new Error('Column not found'));
          return;
        }

        // Create the new task
        const task: Task = {
          id: createResourceId(),
          assigneesIds: [],
          attachments: [],
          authorId: user.id,
          checklists: [],
          columnId,
          comments: [],
          description: null,
          due: null,
          isSubscribed: false,
          labels: [],
          name
        };

        // Add the new task
        clonedBoard.tasks.push(task);

        // Add the taskId reference to the column
        column.taskIds.push(task.id);

        // Save changes
        data.board = clonedBoard;

        resolve(deepCopy(task));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  updateTask(request: UpdateTaskRequest): UpdateTaskResponse {
    const { taskId, update } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard: Board = deepCopy(data.board);

        // Find the task that will be updated
        const task = clonedBoard.tasks.find((task) => task.id === taskId);

        if (!task) {
          reject(new Error('Task not found'));
          return;
        }

        // Update the task
        Object.assign(task, update);

        // Save changes
        data.board = clonedBoard;

        resolve(deepCopy(task));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  moveTask(request: MoveTaskRequest): MoveTaskResponse {
    const { taskId, position, columnId } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard: Board = deepCopy(data.board);

        // Find the task that will be moved
        const task = clonedBoard.tasks.find((task) => task.id === taskId);

        if (!task) {
          reject(new Error('Task not found'));
          return;
        }

        // Find the source column of the task
        const sourceColumn = clonedBoard.columns.find((column) => column.id === task.columnId);

        if (!sourceColumn) {
          reject(new Error('Column not found'));
          return;
        }

        // Remove the taskId reference from the source list
        sourceColumn.taskIds = sourceColumn.taskIds.filter((id) => taskId !== id);

        if (!columnId) {
          // If columnId is not provided, it means that we move the task in the same list
          sourceColumn.taskIds.splice(position, 0, task.id);
        } else {
          // Find the destination column for the task
          const destinationColumn = clonedBoard.columns.find((column) => column.id === columnId);

          if (!destinationColumn) {
            reject(new Error('Column not found'));
            return;
          }

          // Add the taskId reference to the destination list
          destinationColumn.taskIds.splice(position, 0, task.id);

          // Store the new columnId reference
          task.columnId = destinationColumn.id;
        }

        // Save changes
        data.board = clonedBoard;

        resolve(true);
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  deleteTask(request: DeleteTaskRequest): DeleteTaskResponse {
    const { taskId } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard: Board = deepCopy(data.board);

        // Find the task that will be removed
        const task = clonedBoard.tasks.find((task) => task.id === taskId);

        if (!task) {
          reject(new Error('Task not found'));
          return;
        }

        // Remove the task from board
        clonedBoard.tasks = clonedBoard.tasks.filter((task) => task.id !== taskId);

        // Find the column using the columnId reference
        const column = clonedBoard.columns.find((column) => column.id === task.columnId);

        // If for some reason it does not exist, there's no problem. Maybe something broke before.
        if (column) {
          column.taskIds = column.taskIds.filter((_taskId) => _taskId !== taskId);
        }

        // Save changes
        data.board = clonedBoard;

        resolve(true);
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  addComment(request: AddCommentRequest): AddCommentResponse {
    const { taskId, message } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard: Board = deepCopy(data.board);

        // Find the task where the comment will be added
        const task = clonedBoard.tasks.find((task) => task.id === taskId);

        if (!task) {
          reject(new Error('Task not found'));
          return;
        }

        // Create the new comment
        const comment = {
          id: createResourceId(),
          authorId: user.id,
          createdAt: new Date().getTime(),
          message
        };

        // Add the new comment to task
        task.comments.push(comment);

        // Save changes
        data.board = clonedBoard;

        resolve(deepCopy(comment));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  addChecklist(request: AddChecklistRequest): AddChecklistResponse {
    const { taskId, name } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard: Board = deepCopy(data.board);

        // Find the task where the checklist will be added
        const task = clonedBoard.tasks.find((task) => task.id === taskId);

        if (!task) {
          reject(new Error('Task not found'));
          return;
        }

        // Create the new checklist
        const checklist: Checklist = {
          id: createResourceId(),
          name,
          checkItems: []
        };

        // Add the new checklist to task
        task.checklists.push(checklist);

        // Save changes
        data.board = clonedBoard;

        resolve(deepCopy(checklist));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  updateChecklist(request: UpdateChecklistRequest): UpdateChecklistResponse {
    const { taskId, checklistId, update } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard: Board = deepCopy(data.board);

        // Find the task that contains the checklist that will be updated
        const task = clonedBoard.tasks.find((task) => task.id === taskId);

        if (!task) {
          reject(new Error('Task not found'));
          return;
        }

        // Find the checklist that will be updated
        const checklist = task.checklists.find((checklist) => checklist.id === checklistId);

        if (!checklist) {
          reject(new Error('Checklist not found'));
          return;
        }

        // Update the checklist
        Object.assign(checklist, update);

        // Save changes
        data.board = clonedBoard;

        resolve(deepCopy(checklist));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  deleteChecklist(request: DeleteChecklistRequest): DeleteChecklistResponse {
    const { taskId, checklistId } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard: Board = deepCopy(data.board);

        // Find the task that contains the checklist that will be removed
        const task = clonedBoard.tasks.find((task) => task.id === taskId);

        if (!task) {
          reject(new Error('Task not found'));
          return;
        }

        // Remove the checklist from the task
        task.checklists = task.checklists.filter((checklists) => checklists.id !== checklistId);

        // Save changes
        data.board = clonedBoard;

        resolve(true);
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  addCheckItem(request: AddCheckItemRequest): AddCheckItemResponse {
    const { taskId, checklistId, name } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard: Board = deepCopy(data.board);

        // Find the task where the checklist will be added
        const task = clonedBoard.tasks.find((task) => task.id === taskId);

        if (!task) {
          reject(new Error('Task not found'));
          return;
        }

        // Find the checklist where the check item will be added
        const checklist = task.checklists.find((checklist) => checklist.id === checklistId);

        if (!checklist) {
          reject(new Error('Checklist not found'));
          return;
        }

        // Create the new check item
        const checkItem: CheckItem = {
          id: createResourceId(),
          name,
          state: 'incomplete'
        };

        // Add the check item to the checklist
        checklist.checkItems.push(checkItem);

        // Save changes
        data.board = clonedBoard;

        resolve(deepCopy(checkItem));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  updateCheckItem(request: UpdateCheckItemRequest): UpdateCheckItemResponse {
    const { taskId, checklistId, checkItemId, update } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard: Board = deepCopy(data.board);

        // Find the task where the checklist will be added
        const task = clonedBoard.tasks.find((task) => task.id === taskId);

        if (!task) {
          reject(new Error('Task not found'));
          return;
        }

        // Find the checklist where the check item will be updated
        const checklist = task.checklists.find((checklist) => checklist.id === checklistId);

        if (!checklist) {
          reject(new Error('Checklist not found'));
          return;
        }

        // Find the checklist where the check item will be updated
        const checkItem = checklist.checkItems.find((checkItem) => checkItem.id === checkItemId);

        if (!checkItem) {
          reject(new Error('Check item not found'));
          return;
        }

        // Update the check item
        Object.assign(checkItem, update);

        // Save changes
        data.board = clonedBoard;

        resolve(deepCopy(checkItem));
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  deleteCheckItem(request: DeleteCheckItemRequest): DeleteCheckItemResponse {
    const { taskId, checklistId, checkItemId } = request;

    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedBoard: Board = deepCopy(data.board);

        // Find the task that contains the checklist that contains the check item that will be removed
        const task = clonedBoard.tasks.find((task) => task.id === taskId);

        if (!task) {
          reject(new Error('Task not found'));
          return;
        }

        // Find the checklist where the check item will be updated
        const checklist = task.checklists.find((checklist) => checklist.id === checklistId);

        if (!checklist) {
          reject(new Error('Checklist not found'));
          return;
        }

        // Remove the check item from the checklist
        checklist.checkItems = checklist.checkItems.filter((checkItem) => (
          checkItem.id !== checkItemId
        ));

        // Save changes
        data.board = clonedBoard;

        resolve(true);
      } catch (err) {
        console.error('[Kanban Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const kanbanApi = new KanbanApi();
