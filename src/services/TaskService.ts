import { CreateTaskDto, ViewTask } from "../models/Task";
import { httpClient } from "./axios";

interface GetTaskProps {
  meta: unknown
  queryKey: Array<string>;
  signal: AbortSignal;
}

export const getTasks = async ({queryKey}: GetTaskProps, params?: object) => {
  const defaultParams = {
    filters: {
      status: {
        $eq: queryKey[1],
      },
    },
  };
  return (await httpClient.get("/tasks", { params: { ...defaultParams, ...params } })).data;
};

export const createTask = async (createTask: CreateTaskDto) => {
  return await httpClient.post("/tasks", createTask);
};

export const updateTask = async (updateTask: ViewTask) => {
  return httpClient.put(`/tasks/${updateTask.id}`, updateTask);
};
