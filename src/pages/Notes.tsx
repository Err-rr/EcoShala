import React, { useState } from 'react';
import { Plus, Edit3, Search, Calendar, BookOpen, FileText, Trash2, Save, X } from 'lucide-react';

const Notes = () => {
  const [notes, setNotes] = useState([
   {
  id: 1,
  topic: 'Environment',
  subTopic: 'Tree Plantation',
  date: '2025-09-07',
  title: 'Community Plantation Drive',
  content: 'Organize a local tree plantation event. Key tasks include gathering volunteers, arranging saplings, preparing the site, and ensuring proper watering schedules.',
  createdAt: '2025-09-07T10:30:00'
   },
   {
  id: 2,
  topic: 'Personal',
  subTopic: 'Eco-Learning',
  date: '2025-09-06',
  title: 'Sustainable Living Practices',
  content: 'Learn about reducing plastic use, saving energy at home, and proper waste segregation. Focus on small daily actions that collectively make a big environmental impact.',
  createdAt: '2025-09-06T15:20:00'
   }

  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  
  const [newNote, setNewNote] = useState({
    topic: '',
    subTopic: '',
    date: new Date().toISOString().split('T')[0],
    title: '',
    content: ''
  });

  const topics = ['all', ...new Set(notes.map(note => note.topic))];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.subTopic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = selectedTopic === 'all' || note.topic === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  const handleCreateNote = () => {
    if (newNote.topic && newNote.title) {
      const note = {
        ...newNote,
        id: Math.max(...notes.map(n => n.id), 0) + 1,
        createdAt: new Date().toISOString()
      };
      setNotes(prev => [note, ...prev]);
      setNewNote({
        topic: '',
        subTopic: '',
        date: new Date().toISOString().split('T')[0],
        title: '',
        content: ''
      });
      setIsCreating(false);
    }
  };

  const handleUpdateNote = () => {
    if (editingNote && editingNote.topic && editingNote.title) {
      setNotes(prev => prev.map(note => 
        note.id === editingNote.id ? editingNote : note
      ));
      setEditingNote(null);
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const NoteForm = ({ note, setNote, onSave, onCancel, isEditing = false }) => (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
          <input
            type="text"
            value={note.topic}
            onChange={(e) => setNote(prev => ({ ...prev, topic: e.target.value }))}
            placeholder="e.g., Work, Personal, Study"
            className="w-full px-3 py-2 bg-white/80 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sub Topic</label>
          <input
            type="text"
            value={note.subTopic}
            onChange={(e) => setNote(prev => ({ ...prev, subTopic: e.target.value }))}
            placeholder="e.g., Meeting Notes, Ideas"
            className="w-full px-3 py-2 bg-white/80 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={note.date}
            onChange={(e) => setNote(prev => ({ ...prev, date: e.target.value }))}
            className="w-full px-3 py-2 bg-white/80 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter note title..."
          className="w-full px-3 py-2 bg-white/80 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
        <textarea
          value={note.content}
          onChange={(e) => setNote(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Write your note here..."
          rows={6}
          className="w-full px-3 py-2 bg-white/80 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 resize-none"
        />
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          <Save className="w-4 h-4" />
          {isEditing ? 'Update' : 'Save'} Note
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Notes</h1>
          <p className="text-gray-600">Organize your thoughts and ideas</p>
        </div>

        {/* Controls */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-lg border border-white/50">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 flex gap-4 w-full md:w-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search notes..."
                  className="w-full pl-10 pr-4 py-2 bg-white/80 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="px-4 py-2 bg-white/80 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
              >
                {topics.map(topic => (
                  <option key={topic} value={topic}>
                    {topic === 'all' ? 'All Topics' : topic}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
            >
              <Plus className="w-4 h-4" />
              New Note
            </button>
          </div>
        </div>

        {/* Create/Edit Note Form */}
        {isCreating && (
          <NoteForm
            note={newNote}
            setNote={setNewNote}
            onSave={handleCreateNote}
            onCancel={() => setIsCreating(false)}
          />
        )}

        {editingNote && (
          <NoteForm
            note={editingNote}
            setNote={setEditingNote}
            onSave={handleUpdateNote}
            onCancel={() => setEditingNote(null)}
            isEditing={true}
          />
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map(note => (
            <div key={note.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/50 hover:bg-white/80 transition-all duration-200">
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">{note.topic}</span>
                  {note.subTopic && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{note.subTopic}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  {formatDate(note.date)}
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{note.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.content}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  {formatDate(note.createdAt)}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setEditingNote(note)}
                    className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No notes found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedTopic !== 'all' 
                ? 'Try adjusting your search or filter' 
                : 'Create your first note to get started'}
            </p>
            {!isCreating && (
              <button
                onClick={() => setIsCreating(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Create Note
              </button>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50">
            <div className="text-2xl font-bold text-green-600">{notes.length}</div>
            <div className="text-sm text-gray-600">Total Notes</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50">
            <div className="text-2xl font-bold text-blue-600">{topics.length - 1}</div>
            <div className="text-sm text-gray-600">Topics</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50">
            <div className="text-2xl font-bold text-purple-600">{filteredNotes.length}</div>
            <div className="text-sm text-gray-600">Filtered Results</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;