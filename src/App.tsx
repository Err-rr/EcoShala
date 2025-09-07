import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import QuestPage from "./pages/QuestPage";
import Login from "./pages/login";  
import LevelUp from "./pages/LevelUp";
import ToDo from "./pages/ToDo";
import Notes from "./pages/Notes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quest" element={<QuestPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/levelup" element={<LevelUp />} /> 
          <Route path="/todo" element={<ToDo />} />
          <Route path="/notes" element={<Notes />} /> {/* ✅ fixed */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
