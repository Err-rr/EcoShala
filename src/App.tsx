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
import Signup from "./pages/signup";
import GameOne from "./pages/GameOne";
import GameTwo from "./pages/GameTwo";
import GameThree from "./pages/GameThree";
import GameFour from "./pages/GameFour";
import Activity from "./components/Activity";
import Leaderboard from "./pages/leaderboard";
import PLantHealth from "./pages/PlantHealth";
import Trash from "./pages/Trash";
import Quiz from "./pages/Quiz";


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
          <Route path="/Signup" element={<Signup />} /> 
          <Route path="/todo" element={<ToDo />} />
           <Route path="/quiz" element={<Quiz />} />
          <Route path="/notes" element={<Notes />} /> {/* ✅ fixed */}
          <Route path="*" element={<NotFound />} />
          <Route path="/game" element={<GameOne />} />
          <Route path="/gametwo" element={<GameTwo />} />
          <Route path="/gamefour" element={<GameFour />} />
          <Route path="/gamethree" element={<GameThree />} />
           <Route path="/activity" element={<Activity />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/planthealth" element={<PLantHealth />} />
          <Route path="/trash" element={<Trash />} />
         
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
