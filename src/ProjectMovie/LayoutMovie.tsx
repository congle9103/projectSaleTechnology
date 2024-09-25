import Header from "./Header";
import Navbar from "./Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProjectMovie from ".";

const queryClient = new QueryClient();

const LayoutMovie = () => {
  return (
    <div className="bg-slate-900">
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className="flex">
          <Navbar />
          <ProjectMovie />
        </div>
      </QueryClientProvider>
    </div>
  );
};

export default LayoutMovie;
