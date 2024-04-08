import Stack from "@mui/material/Stack";
import { DragDropContext } from "react-beautiful-dnd";
import { TaskColumn } from "../components/TaskColumn/TaskColumn";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { CreateTaskDto, TaskStatus, ViewTask } from "../models/Task";
import * as TaskService from "../services/TaskService";
import CreateTaskModal, {
  CreateTaskModalResponse,
} from "../components/CreateTaskModal/CreateTaskModal";
import { useMutation, useQuery } from "@tanstack/react-query";

export const Kanbanboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const todoList = useQuery({
    queryKey: ["tasks", TaskStatus.TODO],
    queryFn: TaskService.getTasks,
  });
  const inprogressList = useQuery({
    queryKey: ["tasks", TaskStatus.IN_PROGRESS],
    queryFn: TaskService.getTasks,
  });
  const doneList = useQuery({
    queryKey: ["tasks", TaskStatus.DONE],
    queryFn: TaskService.getTasks,
  });
  const onCreateTask = useMutation({
    mutationFn: TaskService.createTask,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      fetchLists()
    },
  });
  const onUpdateTask = useMutation({
    mutationFn:TaskService.updateTask,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      fetchLists()
    },
  });

  const statusToList = {
    [TaskStatus.TODO]: todoList,
    [TaskStatus.IN_PROGRESS]: inprogressList,
    [TaskStatus.DONE]: doneList,
  };

  const fetchLists = () => {
    todoList.refetch();
    inprogressList.refetch();
    doneList.refetch();
  }

  const handleOnDragEnd = (result: any) => {
    const currentTask =
      statusToList[result.source.droppableId].data[result.source.index];
    const destinationTask = statusToList[result.destination.droppableId].data[result.destination.index];
    const updatedTask: ViewTask = {
      id: currentTask.id,
      title: currentTask.title,
      description: currentTask.description,
      status: result.destination.droppableId,
      prevTaskId: destinationTask ? destinationTask.id : null,
    };
    onUpdateTask.mutate(updatedTask);
  };

  const onOpenCreateTaskModal = (status: TaskStatus) => {
    setNewTaskStatus(status);
    setIsModalOpen(true);
  };

  const onCloseCreateTaskModal = (createTask?: CreateTaskModalResponse) => {
    if (createTask) {
      const newTask: CreateTaskDto = {
        title: createTask.title,
        description: createTask.description,
        prevTaskId: null,
        status: newTaskStatus,
      };
      setNewTaskStatus(TaskStatus.TODO);
      onCreateTask.mutate(newTask);
    }
    setIsModalOpen(false);
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Stack spacing={2} sx={{ maxWidth: 1440 }}>
        <Stack
          direction="column"
          spacing={0}
          justifyContent={"start"}
          alignItems={"flex-start"}
        >
          <Typography variant="h3" component="h2" color="black">
            Design weekly
          </Typography>
          <Typography variant="subtitle1" component="h2" color="black">
            A board to keep track of design progress.
          </Typography>
        </Stack>
        <Box sx={{ backgroundColor: "#F8F8F8", padding: 10, borderRadius: 5 }}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Stack direction="row" spacing={5} justifyContent={"center"}>
              <TaskColumn
                label="ToDo"
                type={TaskStatus.TODO}
                tasks={todoList?.data?.data ?? []}
                onCreateTask={onOpenCreateTaskModal}
              />
              <TaskColumn
                label="InProgress"
                type={TaskStatus.IN_PROGRESS}
                tasks={inprogressList?.data?.data ?? []}
                onCreateTask={onOpenCreateTaskModal}
              />
              <TaskColumn
                label="InProgress"
                type={TaskStatus.DONE}
                tasks={doneList?.data?.data ?? []}
                onCreateTask={onOpenCreateTaskModal}
              />
            </Stack>
          </DragDropContext>
        </Box>
      </Stack>
      <CreateTaskModal open={isModalOpen} onClose={onCloseCreateTaskModal} />
    </Box>
  );
};
