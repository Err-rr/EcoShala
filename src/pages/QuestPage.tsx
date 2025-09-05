export default function QuestPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-eco-gradient text-white font-eco">
      <h1 className="text-4xl font-bold mb-6">🌱 Start Your Quest</h1>
      <p className="text-lg max-w-xl text-center mb-8">
        Welcome to EcoQuest! Here you’ll begin your journey to earn eco-coins,
        badges, and make the world greener through fun challenges. 🚀
      </p>
      <button className="px-8 py-3 bg-ecoGold text-black rounded-full font-semibold shadow-lg hover:bg-yellow-400 transition">
        Begin Adventure
      </button>
    </div>
  );
}
