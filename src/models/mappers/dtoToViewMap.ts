import { TaskDto } from "../Task";

export const taskDtoToViewMap = (taskDto: TaskDto) => {
    return {
        id: taskDto.id,
        title: taskDto.title,
        description: taskDto.description,
        status: taskDto.status,
        prevTaskId: taskDto.prevTaskId.data.id,
    };
}