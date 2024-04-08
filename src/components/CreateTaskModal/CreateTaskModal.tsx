import { useState } from "react";
import { Modal, TextField, Button, Box, Stack } from "@mui/material";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface CreateTaskModalResponse {
  title: string;
  description: string;
}

export interface CreateTaskModalProps {
  open: boolean;
  onClose: (response?: CreateTaskModalResponse) => void;
}

export const CreateTaskModal = ({
  open,
  onClose,
}: CreateTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onCreateTask = () => {
    onClose({ title, description });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Stack gap={5}>
          <Stack direction={"row"} gap={10}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
          <Stack direction={"row"} gap={5} justifyContent={"flex-end"}>
            <Button variant="contained" onClick={onCreateTask}>
              Create Task
            </Button>
            <Button variant="outlined" onClick={() => onClose()}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateTaskModal;
