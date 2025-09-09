import React, { useState, useRef } from 'react';
import { Upload, Camera, Award, Leaf, CheckCircle, X } from 'lucide-react';

const Activity = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ecoPoints, setEcoPoints] = useState(150); // Starting points
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = {
            id: Date.now() + Math.random(),
            src: e.target.result,
            name: file.name,
            points: Math.floor(Math.random() * 20) + 10, // Random points 10-30
            timestamp: new Date().toLocaleString()
          };
          setUploadedImages(prev => [...prev, newImage]);
          setEcoPoints(prev => prev + newImage.points);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    handleFileSelect(e.target.files);
  };

  const removeImage = (id) => {
    const imageToRemove = uploadedImages.find(img => img.id === id);
    if (imageToRemove) {
      setUploadedImages(prev => prev.filter(img => img.id !== id));
      setEcoPoints(prev => prev - imageToRemove.points);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-10 h-10 text-green-600" />
            <h1 className="text-4xl font-bold text-green-800">Eco Activity Hub</h1>
          </div>
          <p className="text-green-700 text-lg">
            Upload images of your eco-friendly activities and earn points!
          </p>
        </div>

        {/* Points Display */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-green-200">
          <div className="flex items-center justify-center gap-4">
            <Award className="w-8 h-8 text-yellow-500" />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-800">{ecoPoints}</h2>
              <p className="text-green-600">Eco Points Earned</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-500 text-white p-4 rounded-lg mb-6 flex items-center gap-3 shadow-lg animate-pulse">
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold">Great job! You've earned eco points for your contribution!</span>
          </div>
        )}

        {/* Upload Area */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg border border-green-200">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-green-500 bg-green-50' 
                : 'border-green-300 hover:border-green-500 hover:bg-green-50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="bg-green-100 p-6 rounded-full">
                <Upload className="w-12 h-12 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Upload Your Eco Activity Images
                </h3>
                <p className="text-green-600 mb-4">
                  Drop images here or click to browse
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-green-500">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    <span>Recycling photos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4" />
                    <span>Green activities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Eco projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {/* Uploaded Images Grid */}
        {uploadedImages.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-200">
            <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
              <Camera className="w-6 h-6" />
              Your Eco Contributions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedImages.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-200 hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img
                        src={image.src}
                        alt={image.name}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-green-800 truncate mb-2">
                        {image.name}
                      </h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-green-600">
                          <Award className="w-4 h-4" />
                          <span className="font-bold">+{image.points} points</span>
                        </div>
                        <span className="text-xs text-gray-500">{image.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8 shadow-lg border border-green-200">
          <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
            <Leaf className="w-4 h-4 sm:w-5 sm:h-5" />
            Earn More Points!
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-green-700">
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <strong>Recycling Activities:</strong> Photos of sorting waste, recycling bins, or upcycling projects
            </div>
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <strong>Green Transport:</strong> Cycling, walking, or using public transport instead of cars
            </div>
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <strong>Nature Conservation:</strong> Planting trees, cleaning parks, or wildlife protection
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;