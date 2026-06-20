import React, { useEffect, useMemo, useRef, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { awardPoints } from "@/lib/pointsService";

type QuizLevel = 1 | 2 | 3;

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  difficulty: "easy" | "medium" | "hard";
  level: QuizLevel;
}

const QUESTION_POOL: Question[] = [
  { id: "q1", question: "Which gas makes up approximately 78% of Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], correct: 2, difficulty: "easy", level: 1 },
  { id: "q2", question: "What does biodiversity mean?", options: ["The number of trees in a forest", "The variety of life in an ecosystem", "The amount of rainfall", "The height of mountains"], correct: 1, difficulty: "easy", level: 1 },
  { id: "q3", question: "Which energy source uses sunlight?", options: ["Coal", "Solar", "Diesel", "Petrol"], correct: 1, difficulty: "easy", level: 1 },
  { id: "q4", question: "Which action helps reduce plastic waste?", options: ["Using single-use bags", "Recycling and reusing containers", "Burning trash", "Buying more bottled water"], correct: 1, difficulty: "easy", level: 1 },
  { id: "q5", question: "Which is a renewable resource?", options: ["Wind", "Coal", "Petroleum", "Natural gas"], correct: 0, difficulty: "easy", level: 1 },
  { id: "q6", question: "Which practice saves water?", options: ["Leaving taps open", "Fixing leaks quickly", "Washing driveways with hoses", "Watering at noon"], correct: 1, difficulty: "easy", level: 1 },
  { id: "q7", question: "What is compost made from?", options: ["Plastic", "Organic waste", "Glass", "Metal"], correct: 1, difficulty: "easy", level: 1 },
  { id: "q8", question: "What should you do with old paper?", options: ["Throw it away", "Recycle it", "Burn it at home", "Hide it"], correct: 1, difficulty: "easy", level: 1 },
  { id: "q9", question: "Which is an eco-friendly transport option?", options: ["Bicycle", "Idling car", "Private jet", "Truck only"], correct: 0, difficulty: "easy", level: 1 },
  { id: "q10", question: "Trees help the environment by...", options: ["Increasing pollution", "Producing oxygen", "Making plastic", "Stopping rain"], correct: 1, difficulty: "easy", level: 1 },
  { id: "q11", question: "What does recycling do?", options: ["Turns waste into usable materials", "Creates more trash", "Stops plants from growing", "Heats the planet"], correct: 0, difficulty: "easy", level: 1 },
  { id: "q12", question: "Which item is recyclable?", options: ["Glass bottle", "Used tissue", "Food waste", "Dirty napkin"], correct: 0, difficulty: "easy", level: 1 },
  { id: "q13", question: "Which habit saves electricity?", options: ["Leaving lights on", "Using LED bulbs", "Opening the fridge repeatedly", "Charging unused devices"], correct: 1, difficulty: "easy", level: 1 },
  { id: "q14", question: "Which one is natural pollution-free energy?", options: ["Wind", "Petrol", "Coal", "Diesel"], correct: 0, difficulty: "easy", level: 1 },
  { id: "q15", question: "What is the best way to dispose of batteries?", options: ["Throw in general trash", "Give to e-waste collection", "Bury in soil", "Burn them"], correct: 1, difficulty: "easy", level: 1 },
  { id: "q16", question: "Which is a benefit of planting trees?", options: ["More oxygen", "Less biodiversity", "More noise", "Less shade"], correct: 0, difficulty: "easy", level: 1 },

  { id: "q17", question: "What causes acid rain?", options: ["Excess oxygen", "Sulfur dioxide and nitrogen oxides", "Water vapour", "Helium"], correct: 1, difficulty: "medium", level: 2 },
  { id: "q18", question: "Which layer contains the ozone layer?", options: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"], correct: 1, difficulty: "medium", level: 2 },
  { id: "q19", question: "What is eutrophication?", options: ["Soil turning into rock", "Excess nutrients in water causing algae growth", "Ocean tides", "Wind erosion"], correct: 1, difficulty: "medium", level: 2 },
  { id: "q20", question: "What is the main purpose of a wetland?", options: ["Increase desert area", "Filter water and support biodiversity", "Create plastic", "Stop evaporation"], correct: 1, difficulty: "medium", level: 2 },
  { id: "q21", question: "Which gas is a major greenhouse gas?", options: ["Carbon dioxide", "Helium", "Neon", "Oxygen"], correct: 0, difficulty: "medium", level: 2 },
  { id: "q22", question: "Which agreement aims to limit global warming?", options: ["Paris Agreement", "Geneva Pact", "Delhi Accord", "Amazon Treaty"], correct: 0, difficulty: "medium", level: 2 },
  { id: "q23", question: "What is ecological footprint?", options: ["Size of a shoe print", "Human demand on Earth's ecosystems", "Forest cover", "River depth"], correct: 1, difficulty: "medium", level: 2 },
  { id: "q24", question: "Which action reduces carbon emissions most?", options: ["Carpooling", "Keeping engine idling", "Flying short trips", "Using more coal"], correct: 0, difficulty: "medium", level: 2 },
  { id: "q25", question: "What does a higher albedo surface do?", options: ["Absorbs more heat", "Reflects more sunlight", "Creates ozone", "Produces methane"], correct: 1, difficulty: "medium", level: 2 },
  { id: "q26", question: "Which is a major source of marine pollution?", options: ["Plastic waste", "Rainwater", "Algae", "Sand"], correct: 0, difficulty: "medium", level: 2 },
  { id: "q27", question: "What is the best example of circular economy?", options: ["Use and throw", "Repair, reuse, recycle", "Buy and burn", "Dump and forget"], correct: 1, difficulty: "medium", level: 2 },
  { id: "q28", question: "Which farming method avoids chemical fertilizers?", options: ["Organic farming", "Industrial dumping", "Open burning", "Mining"], correct: 0, difficulty: "medium", level: 2 },
  { id: "q29", question: "Which energy source is intermittent?", options: ["Solar", "Coal", "Oil", "Natural gas"], correct: 0, difficulty: "medium", level: 2 },
  { id: "q30", question: "What is the main reason for coral bleaching?", options: ["Cold water", "Rising sea temperatures", "Too much salt", "Lack of rocks"], correct: 1, difficulty: "medium", level: 2 },
  { id: "q31", question: "Which is an example of e-waste?", options: ["Old phone", "Banana peel", "Paper sheet", "Wood plank"], correct: 0, difficulty: "medium", level: 2 },
  { id: "q32", question: "Why are bees important?", options: ["They pollinate plants", "They reduce rain", "They stop oxygen", "They make plastic"], correct: 0, difficulty: "medium", level: 2 },

  { id: "q33", question: "Which process allows plants to make food?", options: ["Respiration", "Photosynthesis", "Combustion", "Decomposition"], correct: 1, difficulty: "hard", level: 3 },
  { id: "q34", question: "What is the meaning of biomagnification?", options: ["Heat absorption by oceans", "Increase in pollutant concentration up the food chain", "Tree planting", "Water evaporation"], correct: 1, difficulty: "hard", level: 3 },
  { id: "q35", question: "What is the main gas involved in ozone depletion?", options: ["CFCs", "Nitrogen", "Argon", "Oxygen"], correct: 0, difficulty: "hard", level: 3 },
  { id: "q36", question: "Which biome has the highest biodiversity per unit area?", options: ["Tropical rainforest", "Desert", "Tundra", "Grassland"], correct: 0, difficulty: "hard", level: 3 },
  { id: "q37", question: "What is the role of decomposers?", options: ["Create sunlight", "Break down dead matter", "Make plastic", "Block water flow"], correct: 1, difficulty: "hard", level: 3 },
  { id: "q38", question: "Which pollutant is linked to photochemical smog?", options: ["Nitrogen oxides", "Sand", "Salt", "Clay"], correct: 0, difficulty: "hard", level: 3 },
  { id: "q39", question: "Which ecosystem service is provided by forests?", options: ["Carbon storage", "Salt production", "Oil refinement", "Noise increase"], correct: 0, difficulty: "hard", level: 3 },
  { id: "q40", question: "Which is a direct effect of deforestation?", options: ["Loss of habitat", "More coral reefs", "Cleaner air always", "Less soil erosion"], correct: 0, difficulty: "hard", level: 3 },
  { id: "q41", question: "What does 'resilience' in ecology refer to?", options: ["Ability to recover after disturbance", "Ability to burn faster", "Ability to freeze", "Ability to pollute"], correct: 0, difficulty: "hard", level: 3 },
  { id: "q42", question: "Which process removes carbon from the atmosphere naturally?", options: ["Photosynthesis", "Smelting", "Incineration", "Mining"], correct: 0, difficulty: "hard", level: 3 },
  { id: "q43", question: "What is the main cause of biodiversity loss?", options: ["Habitat destruction", "More rainfall", "More sunlight", "More rivers"], correct: 0, difficulty: "hard", level: 3 },
  { id: "q44", question: "Which term describes species at high risk of extinction?", options: ["Endangered", "Abundant", "Common", "Domestic"], correct: 0, difficulty: "hard", level: 3 },
  { id: "q45", question: "What is the correct meaning of 'sustainable'?", options: ["Can continue long term without damage", "Can be used once", "Must be burned", "Needs no resources"], correct: 0, difficulty: "hard", level: 3 },
  { id: "q46", question: "Which action best supports a low-carbon lifestyle?", options: ["Choosing public transport", "Buying more single-use plastics", "Turning on more AC", "Burning leaves"], correct: 0, difficulty: "hard", level: 3 },
  { id: "q47", question: "Which is an example of biodiversity conservation?", options: ["Protected wildlife sanctuary", "Open dumping site", "Illegal hunting", "Deforestation"], correct: 0, difficulty: "hard", level: 3 },
  { id: "q48", question: "What does 'net zero' mean?", options: ["No electricity use", "Emissions balanced by removals", "No trees planted", "Zero rainfall"], correct: 1, difficulty: "hard", level: 3 },
  { id: "q49", question: "Which gas is heavily associated with methane leakage?", options: ["Methane", "Helium", "Neon", "Argon"], correct: 0, difficulty: "hard", level: 3 },
  { id: "q50", question: "Which approach is the most climate-friendly?", options: ["Reduce, reuse, recycle", "Throw everything away", "Use more fossil fuels", "Burn all waste"], correct: 0, difficulty: "hard", level: 3 },
];

const QUESTION_OPTIONS = [10, 20, 30, 40, 50] as const;
const TIME_OPTIONS = [10, 15, 20, 30] as const;

const shuffleArray = <T,>(items: T[]): T[] => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
};

const selectQuestions = (count: number): Question[] => {
  const levelOne = shuffleArray(QUESTION_POOL.filter((question) => question.level === 1));
  const levelTwo = shuffleArray(QUESTION_POOL.filter((question) => question.level === 2));
  const levelThree = shuffleArray(QUESTION_POOL.filter((question) => question.level === 3));

  const desiredEasy = Math.min(levelOne.length, Math.max(1, Math.round(count * 0.34)));
  const desiredMedium = Math.min(levelTwo.length, Math.max(1, Math.round(count * 0.33)));
  const desiredHard = Math.min(levelThree.length, count - desiredEasy - desiredMedium);

  const selected = [
    ...levelOne.slice(0, desiredEasy),
    ...levelTwo.slice(0, desiredMedium),
    ...levelThree.slice(0, desiredHard),
  ];

  const remainder = count - selected.length;
  if (remainder > 0) {
    const remainingPool = shuffleArray(
      QUESTION_POOL.filter((question) => !selected.some((selectedQuestion) => selectedQuestion.id === question.id)),
    );
    selected.push(...remainingPool.slice(0, remainder));
  }

  return shuffleArray(selected).slice(0, count);
};

const Quiz: React.FC = () => {
  const { user } = useAuth();
  const [showStartModal, setShowStartModal] = useState(true);
  const [questionCount, setQuestionCount] = useState<(typeof QUESTION_OPTIONS)[number]>(20);
  const [timePerQuestion, setTimePerQuestion] = useState<(typeof TIME_OPTIONS)[number]>(20);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [timerActive, setTimerActive] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const awardedQuestionsRef = useRef<Set<string>>(new Set());
  const completionAwardedRef = useRef(false);

  const question = quizQuestions[currentQuestion];
  const currentLevelQuestions = useMemo(
    () => quizQuestions.filter((entry) => entry.level === question?.level),
    [quizQuestions, question?.level],
  );
  const currentLevelIndex = question ? currentLevelQuestions.findIndex((entry) => entry.id === question.id) : -1;
  const currentLevelProgress = question && currentLevelQuestions.length > 0 ? currentLevelIndex + 1 : 0;
  const currentLevelTotal = currentLevelQuestions.length;
  const currentLevelLabel = question ? `Level ${question.level}` : "Level 1";
  const progressPercentage = showResults ? 100 : quizQuestions.length > 0 ? ((currentQuestion + 1) / quizQuestions.length) * 100 : 0;

  useEffect(() => {
    setTimeLeft(timePerQuestion);
  }, [timePerQuestion]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (timerActive && timeLeft > 0 && !answered) {
      interval = setInterval(() => {
        setTimeLeft((previous) => previous - 1);
      }, 1000);
    } else if (timeLeft === 0 && !answered) {
      setAnswered(true);
      setTimerActive(false);
      setFeedbackMessage("Time's up! The correct answer is highlighted.");
      setShowFeedback(true);
      setStreak(0);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerActive, timeLeft, answered]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (!showStartModal && !showResults) {
      interval = setInterval(() => {
        setTotalTime((previous) => previous + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showStartModal, showResults]);

  const startQuiz = () => {
    const selectedQuestions = selectQuestions(questionCount);
    setQuizQuestions(selectedQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setShowResults(false);
    setTimeLeft(timePerQuestion);
    setTimerActive(true);
    setStreak(0);
    setShowFeedback(false);
    setFeedbackMessage("");
    setTotalTime(0);
    awardedQuestionsRef.current = new Set();
    completionAwardedRef.current = false;
    setShowStartModal(false);
  };

  const selectOption = (index: number) => {
    if (answered) {
      return;
    }
    setSelectedAnswer(index);
  };

  const saveQuizResult = async (earnedPoints: number) => {
    if (!user) {
      return;
    }

    await addDoc(collection(db, "quizResults"), {
      uid: user.uid,
      score,
      totalQuestions: quizQuestions.length,
      earnedPoints,
      selectedQuestionCount: questionCount,
      timePerQuestion,
      timestamp: serverTimestamp(),
    });
  };

  const handleAnswer = async () => {
    if (!question || (selectedAnswer === null && !answered)) {
      return;
    }

    if (!answered) {
      setAnswered(true);
      setTimerActive(false);

      const isCorrect = selectedAnswer === question.correct;
      if (isCorrect) {
        setScore((previous) => previous + 1);
        setStreak((previous) => previous + 1);
        const timeBonus = timeLeft > Math.max(3, Math.floor(timePerQuestion / 2)) ? " Quick answer!" : "";
        setFeedbackMessage(`Correct!${timeBonus}`);

        if (user && !awardedQuestionsRef.current.has(question.id)) {
          awardedQuestionsRef.current.add(question.id);
          awardPoints(user.uid, 10, "Correct Quiz Answer").catch((error) => {
            console.error("Failed to award quiz points:", error);
          });
        }
      } else {
        setStreak(0);
        setFeedbackMessage("Incorrect. The correct answer is highlighted.");
      }

      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1500);
      return;
    }

    if (currentQuestion === quizQuestions.length - 1) {
      if (user && !completionAwardedRef.current) {
        completionAwardedRef.current = true;
        const earnedPoints = score * 10 + 20;
        await awardPoints(user.uid, 20, "Quiz Completed");
        await saveQuizResult(earnedPoints);
      }
      setShowResults(true);
      return;
    }

    setCurrentQuestion((previous) => previous + 1);
    setSelectedAnswer(null);
    setAnswered(false);
    setTimeLeft(timePerQuestion);
    setTimerActive(true);
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setTimeLeft(timePerQuestion);
      setTimerActive(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setShowResults(false);
    setShowStartModal(true);
    setTimeLeft(timePerQuestion);
    setTimerActive(false);
    setStreak(0);
    setShowFeedback(false);
    setFeedbackMessage("");
    setTotalTime(0);
    setQuizQuestions([]);
    awardedQuestionsRef.current = new Set();
    completionAwardedRef.current = false;
  };

  const getScoreMessage = () => {
    const percentage = quizQuestions.length > 0 ? (score / quizQuestions.length) * 100 : 0;
    const avgTime = quizQuestions.length > 0 ? Math.round(totalTime / quizQuestions.length) : 0;

    if (percentage >= 90) {
      return `Perfect! Environmental Expert! Average: ${avgTime}s per question`;
    }
    if (percentage >= 80) {
      return `Excellent! You're an environmental champion! Average: ${avgTime}s per question`;
    }
    if (percentage >= 60) {
      return `Good job! Keep learning about our environment! Average: ${avgTime}s per question`;
    }
    if (percentage >= 40) {
      return `Not bad! There's room for improvement! Average: ${avgTime}s per question`;
    }
    return `Keep studying! Every expert was once a beginner! Average: ${avgTime}s per question`;
  };

  const getDifficultyClass = (difficulty: Question["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700 border border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getTimerColor = () => {
    if (timeLeft > Math.max(6, Math.floor(timePerQuestion * 0.66))) {
      return "text-green-600";
    }
    if (timeLeft > Math.max(3, Math.floor(timePerQuestion * 0.33))) {
      return "text-yellow-600";
    }
    return "text-red-600";
  };

  const getOptionClass = (index: number) => {
    let baseClass = "bg-white border-2 border-gray-200 rounded-lg p-4 cursor-pointer transition-colors duration-200 hover:border-green-400 hover:bg-green-50";

    if (selectedAnswer === index && !answered) {
      baseClass += " bg-green-100 border-green-500 text-green-800";
    }

    if (answered && question) {
      baseClass += " cursor-default";
      if (index === question.correct) {
        baseClass += " bg-green-100 border-green-500 text-green-800";
      } else if (selectedAnswer === index && index !== question.correct) {
        baseClass += " bg-red-100 border-red-500 text-red-800";
      } else {
        baseClass += " opacity-60";
      }
    }

    return baseClass;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      {showFeedback && (
        <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
          <div className="text-sm font-medium text-gray-800">{feedbackMessage}</div>
        </div>
      )}

      {showStartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-2xl text-center max-w-2xl w-full shadow-xl">
            <div className="text-4xl mb-4">🌱</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Eco Quiz</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Pick your quiz size and timer, then answer random eco questions arranged by level.
            </p>

            <div className="grid gap-5 md:grid-cols-2 text-left">
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Questions</div>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {QUESTION_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setQuestionCount(option)}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                        questionCount === option
                          ? "bg-green-600 text-white"
                          : "bg-white text-gray-700 border border-gray-200 hover:border-green-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Time / Question</div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {TIME_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setTimePerQuestion(option)}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                        timePerQuestion === option
                          ? "bg-green-600 text-white"
                          : "bg-white text-gray-700 border border-gray-200 hover:border-green-300"
                      }`}
                    >
                      {option}s
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-xl bg-green-50 p-3">
                <div className="font-bold text-lg text-gray-700">50</div>
                <div className="text-gray-500">Max Questions</div>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3">
                <div className="font-bold text-lg text-gray-700">3</div>
                <div className="text-gray-500">Levels</div>
              </div>
              <div className="rounded-xl bg-lime-50 p-3">
                <div className="font-bold text-lg text-gray-700">{timePerQuestion}s</div>
                <div className="text-gray-500">Timer</div>
              </div>
            </div>

            <button
              onClick={startQuiz}
              className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
            >
              Start Quiz
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 text-center">
          <h1 className="text-3xl font-bold mb-2">🌍 Eco Quiz</h1>
          <p className="text-green-100 mb-4">Environmental Studies Assessment</p>

          <div className="w-full h-3 bg-green-700 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
            <span className="rounded-full bg-white/15 px-3 py-1">Question {quizQuestions.length > 0 ? currentQuestion + 1 : 0}/{quizQuestions.length || questionCount}</span>
            <span className="rounded-full bg-white/15 px-3 py-1">{currentLevelLabel}</span>
            <span className="rounded-full bg-white/15 px-3 py-1">{question?.difficulty?.toUpperCase() ?? "—"}</span>
            <span className="rounded-full bg-white/15 px-3 py-1">{timeLeft}s left</span>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {!showResults ? (
            <>
              <div className="mb-4 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                    Question {quizQuestions.length > 0 ? currentQuestion + 1 : 0} of {quizQuestions.length}
                  </div>
                  {streak > 1 && (
                    <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {streak} streak
                    </div>
                  )}
                  {question && (
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {currentLevelLabel} {currentLevelTotal > 0 ? `${currentLevelProgress}/${currentLevelTotal}` : ""}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {question && (
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyClass(question.difficulty)}`}>
                      {question.difficulty.toUpperCase()}
                    </div>
                  )}
                  <div className={`text-xl font-bold ${getTimerColor()}`}>
                    {timeLeft}s
                  </div>
                </div>
              </div>

              <div className="text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
                {question?.question}
              </div>

              <div className="grid gap-3 mb-6">
                {question?.options.map((option, index) => (
                  <div key={index} onClick={() => selectOption(index)} className={getOptionClass(index)}>
                    <div className="flex items-center justify-between gap-4">
                      <span>{option}</span>
                      {answered && index === question.correct && <span className="text-green-600">✓</span>}
                      {answered && selectedAnswer === index && index !== question.correct && <span className="text-red-600">✕</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between gap-4">
                <button
                  onClick={previousQuestion}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                    currentQuestion === 0 ? "invisible" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleAnswer}
                  disabled={selectedAnswer === null && !answered}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {answered ? (currentQuestion === quizQuestions.length - 1 ? "Show Results" : "Next Question") : "Submit Answer"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">{score >= 40 ? "🏆" : score >= 30 ? "🌟" : score >= 20 ? "🌱" : "📚"}</div>
              <div className="text-5xl font-bold text-green-600 mb-4">
                {score}/{quizQuestions.length}
              </div>
              <div className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                {getScoreMessage()}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-700">{quizQuestions.length > 0 ? Math.round((score / quizQuestions.length) * 100) : 0}%</div>
                  <div className="text-gray-500 text-sm">Accuracy</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-700">{formatTime(totalTime)}</div>
                  <div className="text-gray-500 text-sm">Total Time</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-700">{streak > 0 ? streak : "-"}</div>
                  <div className="text-gray-500 text-sm">Best Streak</div>
                </div>
              </div>

              <button
                onClick={restartQuiz}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
              >
                Take Quiz Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
