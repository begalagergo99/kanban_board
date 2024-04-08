import { Droppable } from "react-beautiful-dnd";
import { TaskCard } from "../Card/Card";
import { Box, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { TaskDto, TaskStatus } from "../../models/Task";

export interface TaskColumnProps {
  label: string;
  type: TaskStatus;
  tasks?: TaskDto[];
  onCreateTask: (type: TaskStatus) => void;
}

export const TaskColumn = (props: TaskColumnProps) => {
  return (
    <Box>
      <Stack gap={2} direction="row" justifyContent="start" alignItems="center">
        <Box>
          <Typography
            sx={{
              backgroundColor: "#E1E4E8",
              paddingY: "4px",
              paddingX: "18px",
              borderRadius: 20,
            }}
            variant="h5"
            color={"black"}
          >
            {props.label}
          </Typography>
        </Box>
        <Box>
          <IconButton
            sx={{
              backgroundColor: "#CBDFD8",
              paddingY: "4px",
              paddingX: "12px",
              borderRadius: "20px",
            }}
            size="small"
            onClick={() => props.onCreateTask(props.type)}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Stack>
      <Droppable droppableId={props.type}>
        {(provided) => (
          <Stack
            gap={2}
            direction={"column"}
            sx={{
              backgroundColor: "#F8F8F8",
              minHeight: 200,
              minWidth: 300,
              marginTop: 5,
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.tasks?.map((task, index) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </Box>
  );
};
