import Stack from "@mui/material/Stack";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { TaskColumn } from "../components/TaskColumn/TaskColumn";
import { useState } from "react";
import * as R from "rambda";

export const enum Status {
  TODO = "todo",
  INPROGRESS = "inprogress",
}

const finalSpaceCharacters = [
  {
    id: 0,
    name: "Gary Goodspeed",
    status: "inprogress",
    thumb: "/images/gary.png",
    prevTaskId: {
      data: {
        id: null,
      },
    },
  },
  {
    id: 1,
    name: "Little Cato",
    status: "todo",
    thumb: "/images/cato.png",
    prevTaskId: {
      data: {
        id: null,
      },
    },
  },
  {
    id: 2,
    name: "KVN",
    status: "todo",
    thumb: "/images/kvn.png",
    prevTaskId: {
      data: {
        id: 1,
      },
    },
  },
  // {
  //   id: 3,
  //   name: "Mooncake",
  //   status: "todo",
  //   thumb: "/images/mooncake.png",
  //   prevTaskId: {
  //     data: {
  //       id: 4,
  //     },
  //   },
  // },
  // {
  //   id: 4,
  //   name: "Quinn Ergon",
  //   status: "todo",
  //   thumb: "/images/quinn.png",
  //   prevTaskId: {
  //     data: {
  //       id: 5,
  //     },
  //   },
  // },
];

export const Kanbanboard = () => {
  const [items, updateItems] = useState(finalSpaceCharacters);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnDragEnd = (result: any) => {
    console.log(result);
    if (!result.destination) return;
    const newStatusItems = items.map((item) => {
      if (item.id === Number(result.draggableId.replace("draggable-", ""))) {
        return {
          ...item,
          status: result.destination.droppableId,
        };
      }
      return item;
    });
    console.log(!result.destination);
    if (!result.destination) return;
    console.log('newStatusItems: ', newStatusItems);
    let newItems = Array.from(newStatusItems.filter((item) => item.status === result.destination.droppableId));
    const [reorderedItem] = newItems.splice(result.source.index -1, 1);
    console.log('reorderedItem: ', reorderedItem);
    newItems.splice(result.destination.index -1 , 0, reorderedItem);
    newItems = newItems.filter(Boolean);
    console.log('newItems: ', newItems);

    // Frissítsd a prevItemId mezőket
    if (result.destination.index === 0) {
      reorderedItem.prevTaskId.data.id = null;
    } else {
      reorderedItem.prevTaskId.data.id = newItems[result.destination.index - 1].id;
    }

    // Frissítsd az újra rendezett lista többi elemének prevTaskId.data.id értékét is
    newItems.forEach((item, index) => {
      if (index === 0) {
        item.prevTaskId.data.id = null;
      } else {
        item.prevTaskId.data.id = newItems[index - 1].id;
      }
    });
    const mergedItems = R.union(newStatusItems,newItems );
    updateItems(mergedItems);
  };

  const getTodoTasks = () => {
    const todoTask = items.filter((task) => task.status === Status.TODO);
    console.log(
      todoTask.sort((a, b) => a.prevTaskId.data.id - b.prevTaskId.data.id)
    );
    return todoTask.sort((a, b) => a.prevTaskId.data.id - b.prevTaskId.data.id);
  };

  const getInProgressTasks = () => {
    const inProgressTask = items.filter(
      (task) => task.status === Status.INPROGRESS
    );
    const sorted = inProgressTask.sort(
      (a, b) => a.prevTaskId.data.id - b.prevTaskId.data.id
    );
    console.log(sorted);
    return sorted;
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Stack direction="row" spacing={2}>
          <TaskColumn label="ToDo" type={Status.TODO} tasks={getTodoTasks()} />
          <TaskColumn
            label="InProgress"
            type={Status.INPROGRESS}
            tasks={getInProgressTasks()}
          />
        </Stack>
      </DragDropContext>
    </div>
  );
};
