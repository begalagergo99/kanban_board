import { Droppable } from "react-beautiful-dnd";
import { TaskCard } from "../Card/Card";
import { Status } from "../../screens/KanbanBoard";

export interface TaskColumnProps {
  label: string;
  type: Status;
  tasks?: any[];
}

export const TaskColumn = (props: TaskColumnProps) => {
  return (
    <div style={{width: '30vw'}} >
      <h3>{props.label}</h3>
      <Droppable droppableId={props.type} >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
            }}
            {...provided.droppableProps}
          >
            <h4 style={{minHeight: '20vh'}} >I am a droppable!</h4>
            {
              props.tasks?.map((task, index) => (
                <TaskCard key={index} id={task.id} content={task.name} index={task.prevTaskId.data.id} />
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
