import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Trash: React.FC = () => {
  const [input, setInput] = useState("");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI("AIzaSyDrrDY3kuPB9YspZza8NrqC2DSafGzka7Y"); // put your key here
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const fallbackIdeas = [
    "♻️ Turn it into a simple container or storage box.",
    "🌱 Use as a planter for small herbs or flowers.",
    "🎨 Repurpose into a craft project or art piece.",
    "🛠️ Cut and reshape into useful household tools.",
  ];

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setIdeas([]);

    try {
      const result = await model.generateContent(
        `You are an eco-friendly AI. 
        The user has this trash item: "${input}".  
        Give at least 6-8 creative and **detailed ideas** for how this item can be reused, recycled, or upcycled.  
        Write them as a clean numbered list, without markdown (*, **, -).  
        Each idea should be 2–3 sentences long, explaining how to do it and why it's useful.`
      );

      const text = result.response.text();

      // Split into ideas
      const formattedIdeas = text
        .split(/\d+\.\s/) // split by "1.", "2.", etc.
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      setIdeas(formattedIdeas.length > 0 ? formattedIdeas : fallbackIdeas);
    } catch (error) {
      console.error(error);
      setIdeas(fallbackIdeas);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to bottom right, rgba(209, 250, 229, 0.8) 0%, rgba(167, 243, 208, 0.8) 100%)",
        fontFamily: "Arial, sans-serif",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          background: "white",
          borderRadius: "20px",
          padding: "2rem",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1.5rem" }}>
          ♻️ Trash to Treasure
        </h1>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a trash item (e.g., plastic bottle, old shoes)..."
          style={{
            width: "100%",
            height: "120px",
            padding: "1rem",
            fontSize: "1rem",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            outline: "none",
            resize: "none",
            marginBottom: "1rem",
          }}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(to right, #34d399, #10b981)",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {loading ? "✨ Generating..." : "Generate Ideas"}
        </button>

        {ideas.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>💡 Ideas</h2>
            <div style={{ display: "grid", gap: "1rem" }}>
              {ideas.map((idea, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "1rem",
                    borderRadius: "12px",
                    background: "#ecfdf5",
                    border: "1px solid #d1fae5",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    fontSize: "1rem",
                    lineHeight: "1.6",
                  }}
                >
                  <strong>Idea {idx + 1}:</strong> {idea}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trash;
