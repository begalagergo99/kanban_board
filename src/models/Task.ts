interface PaginationDto {
  page: number;
  pageSize: number;
  minimum: number;
  pageCount: number;
  maximum: number;
  total: number;
}


interface AttributeContainer<T> {
  id: number;
  attributes: T;
}

interface AttributeContainerWithData<T> {
  data: AttributeContainer<T>;
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

export interface TaskDto {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  prevTaskId: AttributeContainerWithData<object>;
  createdAt: string;
  updatedAt: string;
  createdBy: AttributeContainerWithData<object>;
  updatedBy: AttributeContainerWithData<object>;
}

export interface TaskListResponseDto {
  data: AttributeContainer<TaskDto>[];
  meta: {
    pagination: PaginationDto;
  };
}

export interface ViewTask  {
  id: number;
  title: string;
  description: string;
  status: string;
  prevTaskId: number;
}

export interface CreateTaskDto extends Omit<ViewTask, 'id' > {}