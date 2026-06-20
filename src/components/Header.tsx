import { Button } from "@/components/ui/button";
import { Leaf, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { usePointHistory } from "@/hooks/usePointHistory";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const PointHistoryContent = ({
  history,
  loading,
}: {
  history: ReturnType<typeof usePointHistory>["history"];
  loading: boolean;
}) => {
  return (
    <div className="w-[min(18rem,calc(100vw-2rem))] space-y-2">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recent points</div>
      {loading ? (
        <div className="text-sm text-muted-foreground">Loading history...</div>
      ) : history.length === 0 ? (
        <div className="text-sm text-muted-foreground">No point history yet.</div>
      ) : (
        history.map((entry) => (
          <div key={entry.id} className="rounded-md bg-muted/60 px-3 py-2">
            <div className="text-sm font-medium text-foreground">
              {entry.points >= 0 ? "+" : ""}
              {entry.points} {entry.reason}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { profile } = useUserProfile();
  const { history, loading: historyLoading } = usePointHistory();
  const dashboardPath = profile?.role === "teacher" ? "/teacher-dashboard" : "/dashboard";

  useEffect(() => {
    // Inject styles and font
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Tagesschrift&display=swap');

      .tagesschrift-regular {
        font-family: "Tagesschrift", system-ui;
        font-weight: 400;
        font-style: normal;
      }
      .eco-font {
        font-family: Georgia, "Playfair Display", "Merriweather", serif;
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      // Cleanup
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <header className="w-full px-6 py-6 flex items-center justify-between bg-background">
      {/* Left side: logo/title */}
      <div className="flex items-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900 tracking-tight">
          <span className="eco-font">Eco</span>
          <span className="tagesschrift-regular">Shala</span>
        </h1>
      </div>

      {/* Right side: eco-coin, user, buttons */}
      <div className="flex items-center gap-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="eco-coin flex items-center gap-2">
              <Leaf className="w-5 h-5 text-eco-green" />
              <span className="font-semibold text-eco-green">
                {profile?.ecoPoints ?? 0}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="end">
            <PointHistoryContent history={history} loading={historyLoading} />
          </TooltipContent>
        </Tooltip>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-10 h-10 rounded-full bg-eco-green/20 flex items-center justify-center">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-eco-green/20 text-eco-green">
                    <User className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <div className="space-y-1">
                  <div className="font-semibold text-sm">{profile?.name ?? user.displayName ?? "EcoShala User"}</div>
                  <div className="text-xs text-muted-foreground break-all">{profile?.email ?? user.email ?? ""}</div>
                  <div className="text-xs text-muted-foreground">Role: {profile?.role ?? "student"}</div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-xs text-muted-foreground">Eco Points: {profile?.ecoPoints ?? 0}</div>
                    </TooltipTrigger>
                    <TooltipContent side="left" align="start">
                      <PointHistoryContent history={history} loading={historyLoading} />
                    </TooltipContent>
                  </Tooltip>
                  <div className="text-xs text-muted-foreground">Level: {profile?.level ?? 1}</div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(dashboardPath)}>Dashboard</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/leaderboard")}>Leaderboard</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/rewards")}>Rewards</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await logout();
                  navigate("/");
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-eco-green/20 flex items-center justify-center">
              <User className="w-6 h-6 text-eco-green" />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-eco-green text-white hover:bg-eco-green/90">
                  Signup
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
