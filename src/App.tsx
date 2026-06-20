import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import ProtectedRoute from "@/components/ProtectedRoute";
import StudentRoute from "@/components/StudentRoute";
import TeacherRoute from "@/components/TeacherRoute";
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
import About from "./pages/about";
import PrivacyPolicy from "./pages/privacy";
import Community from "./pages/community";
import Rewards from "./pages/rewards";
import Geo from "./pages/Geo";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import { Chatbot } from "./components/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quest" element={<QuestPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/levelup" element={<LevelUp />} />
            <Route
              path="/dashboard"
              element={
                <StudentRoute>
                  <StudentDashboard />
                </StudentRoute>
              }
            />
            <Route
              path="/teacher-dashboard"
              element={
                <TeacherRoute>
                  <TeacherDashboard />
                </TeacherRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
            <Route path="/todo" element={<ToDo />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/game" element={<GameOne />} />
            <Route path="/gametwo" element={<GameTwo />} />
            <Route path="/gamefour" element={<GameFour />} />
            <Route path="/gamethree" element={<GameThree />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/planthealth" element={<PLantHealth />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/community" element={<Community />} />
            <Route
              path="/rewards"
              element={
                <ProtectedRoute>
                  <Rewards />
                </ProtectedRoute>
              }
            />
            <Route path="/geo" element={<Geo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
