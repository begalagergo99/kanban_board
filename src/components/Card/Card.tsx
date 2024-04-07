import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Draggable } from "react-beautiful-dnd";

export interface TaskCardProps {
  id: number;
  content: string;
  index: number;
}

export const TaskCard = (props: TaskCardProps) => {
  return (
    <Draggable draggableId={`draggable-${props.id}`} index={props.id}>
      {(provided) => (
          <Card sx={{ width: "200px" }}
          ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
          >
            <CardContent>
              <h1>{props.content}</h1>
              <p>description</p>
            </CardContent>
          </Card>
      )}
    </Draggable>
  );
};
