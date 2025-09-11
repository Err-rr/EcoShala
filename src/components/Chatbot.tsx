import { useState } from "react";
import { X, MessageCircle } from "lucide-react";

// ✅ Simple bot logic
const getBotReply = (input: string): string => {
  const text = input.toLowerCase().trim();

  // ✅ Normalize common variations
  if (text.includes("how to use")) {
    return "First level-up yourself and explore related Quests, learn more and have fun 🚀";
  }
  if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
    return "Hey there 👋 Welcome to EcoShala!";
  }
  if (text.includes("quest")) {
    return "Quests are fun missions 🌱 Complete them to earn points and badges!";
  }
  if (text.includes("leaderboard")) {
    return "Leaderboard shows the top eco-warriors 🌍 Keep playing to climb up!";
  }
  if (text.includes("reward") || text.includes("badge")) {
    return "You can unlock rewards 🏆 and badges 🎖️ by completing Quests and Eco Activities!";
  }
  if (text.includes("eco activity") || text.includes("activities")) {
    return "Eco Activities are small green actions 🌿 Do them daily to earn eco-points!";
  }
  if (text.includes("plant health") || text.includes("plant")) {
    return "In Plant Health 🌱 you can check if a plant looks healthy or sick!";
  }
  if (text.includes("trash") || text.includes("waste")) {
    return "In Trash to Treasure ♻️ you’ll learn how to recycle and upcycle waste!";
  }
  if (text.includes("game") || text.includes("play")) {
    return "Eco Games 🎮 are fun ways to learn about the environment while playing!";
  }
  if (text.includes("note")) {
    return "Notes 📒 let you keep track of what you’ve learned and your eco-journey!";
  }
  if (text.includes("todo") || text.includes("tasks")) {
    return "Use the To-Do list ✅ to manage your eco-friendly tasks and stay consistent!";
  }
  if (text.includes("login") || text.includes("signup") || text.includes("sign up")) {
    return "Login 🔑 if you already have an account, or Signup ✨ to start your eco journey!";
  }
  if (text.includes("bye") || text.includes("goodbye") || text.includes("see you")) {
    return "Goodbye 👋 See you soon in EcoShala!";
  }

  return "I'm not sure about that 🤔 but I'm still learning! Try asking about quests, leaderboard, games, or rewards.";
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "bot", text: "Welcome to EcoShala! 🌱 I'm your assistant." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botReply = getBotReply(input);
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 600);

    setInput("");
  };

  return (
    <div>
      {/* Floating Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-full shadow-lg transition-all"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-6 w-80 h-96 shadow-2xl rounded-xl flex flex-col animate-fadeIn border"
          style={{
            background: "linear-gradient(to bottom, rgba(209,250,229,0.95) 0%, rgba(167,243,208,0.95) 100%)", // ✅ More solid
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {/* Header */}
          <div className="bg-teal-600 text-white p-3 rounded-t-xl flex justify-between items-center font-bold">
            EcoShala Assistant
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-300">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`my-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <p
                  className={`inline-block px-3 py-2 rounded-lg shadow ${
                    msg.sender === "user" ? "bg-green-300 text-gray-800" : "bg-white text-gray-700"
                  }`}
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 flex gap-2 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-lg px-2 focus:outline-none"
              placeholder="Type a message..."
              style={{ fontFamily: "'Poppins', sans-serif" }}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
