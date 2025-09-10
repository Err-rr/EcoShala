import React, { useState } from 'react';
import { Plus, CheckCircle2, Circle, Target, List } from 'lucide-react';

const ToDo = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [dailyChallenges, setDailyChallenges] = useState([
    { id: 1, text: 'Complete Level-up', completed: false },
    { id: 2, text: 'Complete Daily Challanges', completed: false },
    { id: 3, text: 'Plant 1 tree', completed: false },
    { id: 4, text: 'Play 1 Game', completed: false }
  ]);
  const [customTodos, setCustomTodos] = useState([
    { id: 1, text: 'Complete Notes ', completed: false },
    { id: 2, text: 'Boost Level', completed: true }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const toggleDailyChallenge = (id) => {
    setDailyChallenges(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const toggleCustomTodo = (id) => {
    setCustomTodos(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addCustomTodo = () => {
    if (newTodo.trim()) {
      const newId = Math.max(...customTodos.map(t => t.id), 0) + 1;
      setCustomTodos(prev => [...prev, { id: newId, text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addCustomTodo();
    }
  };

  const TodoItem = ({ item, onToggle, type }) => (
    <div className="flex items-center p-3 bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-white/50 transition-all duration-200 hover:bg-white/80">
      <button
        onClick={() => onToggle(item.id)}
        className="flex-shrink-0 mr-3 transition-colors duration-200"
      >
        {item.completed ? (
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        ) : (
          <Circle className="w-5 h-5 text-gray-400 hover:text-green-500" />
        )}
      </button>
      <span className={`flex-1 ${item.completed ? 'text-gray-500 line-through' : 'text-gray-800'} transition-all duration-200`}>
        {item.text}
      </span>
    </div>
  );

  return (
    <div 
      className="min-h-screen p-4"
      style={{
        background: `
          linear-gradient(135deg, rgba(209, 250, 229, 0.8) 0%, rgba(167, 243, 208, 0.8) 100%),
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.1) 20px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.05) 10px,
            rgba(255, 255, 255, 0.05) 20px
          )
        `
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My To-Do</h1>
          <p className="text-gray-600">Stay organized and accomplish your goals</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white/60 backdrop-blur-sm rounded-xl p-1 mb-6 shadow-lg border border-white/50">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'daily'
                ? 'bg-white shadow-md text-green-700 font-semibold'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            <Target className="w-5 h-5" />
            Daily Challenges
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'custom'
                ? 'bg-white shadow-md text-green-700 font-semibold'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            <List className="w-5 h-5" />
            My To-Do Lists
          </button>
        </div>

        {/* Content */}
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/50">
          {activeTab === 'daily' ? (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Daily Challenges</h2>
              </div>
              <div className="space-y-3">
                {dailyChallenges.map(challenge => (
                  <TodoItem
                    key={challenge.id}
                    item={challenge}
                    onToggle={toggleDailyChallenge}
                    type="daily"
                  />
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-50/70 rounded-xl border border-green-200/50">
                <p className="text-green-800 text-sm">
                  Complete your daily challenges to build healthy habits! 
                  {dailyChallenges.filter(c => c.completed).length}/{dailyChallenges.length} completed today
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <List className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">My To-Do Lists</h2>
              </div>
              
              {/* Add new todo */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a new task..."
                  className="flex-1 px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200"
                />
                <button
                  onClick={addCustomTodo}
                  className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Todo list */}
              <div className="space-y-3">
                {customTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    item={todo}
                    onToggle={toggleCustomTodo}
                    type="custom"
                  />
                ))}
              </div>

              {customTodos.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <List className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No tasks yet. Add your first task above!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {activeTab === 'daily' ? (
            <>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50">
                <div className="text-2xl font-bold text-green-600">
                  {dailyChallenges.filter(c => c.completed).length}
                </div>
                <div className="text-sm text-gray-600">Challenges Completed</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50">
                <div className="text-2xl font-bold text-blue-600">
                  {dailyChallenges.length}
                </div>
                <div className="text-sm text-gray-600">Total Challenges</div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50">
                <div className="text-2xl font-bold text-green-600">
                  {customTodos.filter(t => t.completed).length}
                </div>
                <div className="text-sm text-gray-600">Tasks Completed</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50">
                <div className="text-2xl font-bold text-blue-600">
                  {customTodos.length}
                </div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
