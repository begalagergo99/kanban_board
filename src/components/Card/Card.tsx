import { Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Draggable } from "react-beautiful-dnd";

export interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  index: number;
}

export const TaskCard = (props: TaskCardProps) => {
  return (
    <Draggable draggableId={`draggable-${props.id}`} index={props.index}>
      {(provided) => (
          <Card sx={{ width: 300, border: '1px solid #DDDDDD', borderRadius: "8px", backgroundColor: '#FFFFFF', boxShadow: '0px 2px 4px #DDDDDD'}}
          ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
          >
            <CardContent>
              <Stack gap={"2px"} direction="column" justifyContent="start" alignItems="start">
                <Typography variant="h5" color={'black'}>{props.title}</Typography>
                <Typography variant="subtitle1" color={'black'} >{props.description}</Typography>
              </Stack>
            </CardContent>
          </Card>
      )}
    </Draggable>
  );
};
