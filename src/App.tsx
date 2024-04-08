import "./App.css";
import { Kanbanboard } from "./screens/KanbanBoard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Kanbanboard />
    </QueryClientProvider>
  );
}

export default App;
