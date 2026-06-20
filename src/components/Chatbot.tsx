import { useEffect, useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

type ChatSender = "user" | "bot";

interface ChatMessage {
  sender: ChatSender;
  text: string;
}

const getBotReply = (input: string, name: string, role: string, ecoPoints: number, level: number): string => {
  const text = input.toLowerCase().trim();
  const displayName = name || "there";
  const roleLabel = role === "teacher" ? "teacher" : "student";

  if (text.includes("how to use")) {
    return `Start with Quests, Lectures, and Eco Activities, ${displayName}. That’s the fastest way to grow your points.`;
  }
  if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
    return `Hi ${displayName}, I see you're Level ${level} with ${ecoPoints} points.`;
  }
  if (text.includes("quest")) {
    return `Quests are a great fit for you, ${displayName}. Complete them to earn points and move up faster.`;
  }
  if (text.includes("leaderboard")) {
    return `The leaderboard shows how you compare with other ${roleLabel}s. Keep going and you’ll climb higher.`;
  }
  if (text.includes("reward") || text.includes("badge")) {
    return `You can unlock rewards and badges by completing eco actions, ${displayName}.`;
  }
  if (text.includes("eco activity") || text.includes("activities")) {
    return "Upload eco activities, plant health checks, and other green actions to keep your points growing.";
  }
  if (text.includes("plant health") || text.includes("plant")) {
    return "Plant Health Check awards points when you analyze a plant image successfully.";
  }
  if (text.includes("trash") || text.includes("waste")) {
    return "Trash to Treasure turns waste into ideas and rewards you for completing it.";
  }
  if (text.includes("game") || text.includes("play")) {
    return "Games are a fun way to earn points while learning eco concepts.";
  }
  if (text.includes("note")) {
    return "Notes help you remember what you’ve learned and keep track of your eco journey.";
  }
  if (text.includes("todo") || text.includes("tasks")) {
    return "Use the To-Do list to stay consistent with eco-friendly habits and daily tasks.";
  }
  if (text.includes("login") || text.includes("signup") || text.includes("sign up")) {
    return "Login if you already have an account, or signup to begin your EcoShala journey.";
  }
  if (text.includes("bye") || text.includes("goodbye") || text.includes("see you")) {
    return `Goodbye ${displayName}. Keep building your eco impact.`;
  }

  return `I’m still learning, but I can help with quests, rewards, leaderboard, and your ${roleLabel} dashboard.`;
};

export const Chatbot = () => {
  const { user } = useAuth();
  const { profile } = useUserProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "bot", text: "Welcome to EcoShala! I’m your assistant." },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!isOpen) {
      const name = profile?.name ?? user?.displayName ?? "there";
      const role = profile?.role ?? "student";
      const points = profile?.ecoPoints ?? 0;
      const level = profile?.level ?? 1;

      setMessages([
        {
          sender: "bot",
          text: user
            ? `Hi ${name}, I see you're Level ${level} with ${points} points. How can I help?`
            : "Welcome to EcoShala! I’m your assistant.",
        },
      ]);
    }
  }, [isOpen, profile, user]);

  const handleSend = () => {
    if (!input.trim()) return;

    const nextInput = input;
    const userMessage: ChatMessage = { sender: "user", text: nextInput };
    setMessages((previousMessages) => [...previousMessages, userMessage]);

    setTimeout(() => {
      const botReply = getBotReply(
        nextInput,
        profile?.name ?? user?.displayName ?? "there",
        profile?.role ?? "student",
        profile?.ecoPoints ?? 0,
        profile?.level ?? 1,
      );
      setMessages((previousMessages) => [...previousMessages, { sender: "bot", text: botReply }]);
    }, 500);

    setInput("");
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-full shadow-lg transition-all z-50"
      >
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div
          className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-80 max-w-sm h-[min(24rem,calc(100vh-6rem))] shadow-2xl rounded-xl flex flex-col animate-fadeIn border z-50"
          style={{
            background: "linear-gradient(to bottom, rgba(209,250,229,0.95) 0%, rgba(167,243,208,0.95) 100%)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <div className="bg-teal-600 text-white p-3 rounded-t-xl flex justify-between items-center font-bold">
            EcoShala Assistant
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-300">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={`${msg.sender}-${index}`} className={`my-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <p
                  className={`inline-block max-w-[85%] break-words px-3 py-2 rounded-lg shadow ${
                    msg.sender === "user" ? "bg-green-300 text-gray-800" : "bg-white text-gray-700"
                  }`}
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3 flex gap-2 border-t">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="flex-1 min-w-0 border rounded-lg px-2 focus:outline-none"
              placeholder="Type a message..."
              style={{ fontFamily: "'Poppins', sans-serif" }}
              onKeyDown={(event) => event.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg whitespace-nowrap"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
