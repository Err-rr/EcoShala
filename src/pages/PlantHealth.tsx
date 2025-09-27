import React, { useState, useRef, useEffect } from 'react';

const LeafGuard = () => {
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(null);
  const [isWebcamMode, setIsWebcamMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [modeText, setModeText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  const [maxPredictions, setMaxPredictions] = useState(0);

  const fileInputRef = useRef(null);
  const webcamContainerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const URL = "https://teachablemachine.withgoogle.com/models/UAIniK_gb/";

  const classIcons = {
    'Healthy': '🌟',
    'Powdery': '⚠️',
    'Rust': '🔴'
  };

  const careTips = {
    'Healthy': [
      "Water early morning to reduce disease risk",
      "Ensure good air circulation around plants",
      "Remove dead or yellowing leaves regularly",
      "Apply balanced fertilizer monthly",
      "Monitor regularly for early problem detection"
    ],
    'Powdery': [
      "Improve air circulation around the plant",
      "Water at soil level, avoid wetting leaves",
      "Remove affected leaves immediately",
      "Apply fungicide spray in early morning",
      "Reduce humidity around the plant"
    ],
    'Rust': [
      "Remove and destroy infected leaves immediately",
      "Water at soil level to keep leaves dry",
      "Apply copper-based fungicide treatment",
      "Increase spacing between plants for airflow",
      "Avoid overhead watering completely"
    ]
  };

  // Load external scripts
  useEffect(() => {
    const loadScripts = async () => {
      // Load TensorFlow.js
      if (!window.tf) {
        const tfScript = document.createElement('script');
        tfScript.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js';
        document.head.appendChild(tfScript);
        await new Promise(resolve => tfScript.onload = resolve);
      }

      // Load Teachable Machine
      if (!window.tmImage) {
        const tmScript = document.createElement('script');
        tmScript.src = 'https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js';
        document.head.appendChild(tmScript);
        await new Promise(resolve => tmScript.onload = resolve);
      }
    };

    loadScripts();
  }, []);

  // Load model
  const loadModel = async () => {
    if (model || !window.tmImage) return model;

    setIsLoading(true);
    try {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";
      
      const loadedModel = await window.tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
      setMaxPredictions(loadedModel.getTotalClasses());
      return loadedModel;
    } catch (error) {
      console.error('Error loading model:', error);
      alert('Error loading AI model. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Start webcam
  const startWebcam = async () => {
    const currentModel = await loadModel();
    if (!currentModel) return;

    setIsWebcamMode(true);
    setModeText("Camera Active");
    setUploadedImage(null);
    setShowRefreshButton(true);

    try {
      const flip = true;
      const newWebcam = new window.tmImage.Webcam(300, 300, flip);
      await newWebcam.setup();
      await newWebcam.play();
      
      setWebcam(newWebcam);
      
      if (webcamContainerRef.current) {
        webcamContainerRef.current.innerHTML = '';
        webcamContainerRef.current.appendChild(newWebcam.canvas);
      }

      // Start prediction loop with faster updates
      let lastPredictionTime = 0;
      const PREDICTION_INTERVAL = 200; // Reduce from default ~33ms to 200ms for faster processing
      
      const loop = async () => {
        if (newWebcam && isWebcamMode) {
          const currentTime = Date.now();
          newWebcam.update();
          
          // Only run prediction every PREDICTION_INTERVAL ms for better performance
          if (currentTime - lastPredictionTime > PREDICTION_INTERVAL) {
            try {
              const prediction = await currentModel.predict(newWebcam.canvas);
              setPredictions(prediction);
              lastPredictionTime = currentTime;
            } catch (error) {
              console.error('Prediction error:', error);
            }
          }
          
          animationFrameRef.current = requestAnimationFrame(loop);
        }
      };
      loop();
    } catch (error) {
      console.error('Error starting webcam:', error);
      alert('Error accessing camera. Please ensure camera permissions are granted.');
    }
  };

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const currentModel = await loadModel();
    if (!currentModel) return;

    setIsWebcamMode(false);
    setModeText("Image Analysis");
    setShowRefreshButton(true);

    // Stop webcam if running
    if (webcam) {
      webcam.stop();
      setWebcam(null);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      setUploadedImage(result);
      
      // Create image element for prediction with optimized loading
      const img = new Image();
      img.onload = async () => {
        try {
          // Add small delay to ensure image is fully processed
          setTimeout(async () => {
            const prediction = await currentModel.predict(img);
            setPredictions(prediction);
          }, 100); // Small delay for better performance
        } catch (error) {
          console.error('Error predicting image:', error);
          alert('Error analyzing image. Please try another image.');
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      const mockEvent = {
        target: { files: [files[0]] }
      };
      handleImageUpload(mockEvent);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Reset to upload state
  const resetToUpload = () => {
    setIsWebcamMode(false);
    setModeText('');
    setUploadedImage(null);
    setShowRefreshButton(false);
    setPredictions([]);

    if (webcam) {
      webcam.stop();
      setWebcam(null);
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (webcam) {
        webcam.stop();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [webcam]);

  const getResultColor = (className) => {
    switch (className) {
      case 'Healthy': return '#4CAF50';
      case 'Powdery': return '#FFC107';
      case 'Rust': return '#FF5722';
      default: return '#4ade80';
    }
  };

  // Get the dominant prediction for care tips
  const getDominantPrediction = () => {
    if (predictions.length === 0) return null;
    return predictions.reduce((prev, current) => 
      prev.probability > current.probability ? prev : current
    );
  };

  const dominantPrediction = getDominantPrediction();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(209, 250, 229, 0.8) 0%, rgba(167, 243, 208, 0.8) 100%)',
      padding: '15px',
      color: '#1f2937',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(15px)',
        border: '2px solid #10b981',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 15px 30px rgba(16, 185, 129, 0.2)',
        maxWidth: '1000px',
        margin: '0 auto',
        minHeight: 'calc(85vh - 30px)'
      }}>
        {/* Header */}
        <div style={{ position: 'relative', marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{
            color: '#10b981',
            fontSize: '1.8rem',
            fontWeight: '300',
            textShadow: '0 0 15px rgba(16, 185, 129, 0.3)',
            margin: '0 0 10px 0'
          }}>
            🌿 LeafGuard
          </h1>
          <h2 style={{
            color: '#10b981',
            fontSize: '1.4rem',
            fontWeight: '300',
            margin: '0 0 20px 0'
          }}>
            Detect. Protect. Thrive.
          </h2>
          {showRefreshButton && (
            <button
              onClick={resetToUpload}
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: 'linear-gradient(45deg, #10b981, #059669)',
                color: '#ffffff',
                border: 'none',
                padding: '8px',
                borderRadius: '50%',
                cursor: 'pointer',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
              </svg>
            </button>
          )}
        </div>

        {/* Main Content */}
        <div style={{
          display: 'flex',
          gap: '20px',
          flexDirection: window.innerWidth <= 768 ? 'column' : 'row'
        }}>
          {/* Left Section */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              marginBottom: '15px'
            }}>
              <button
                onClick={startWebcam}
                style={{
                  background: 'linear-gradient(45deg, #10b981, #059669)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 16px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 6px 15px rgba(16, 185, 129, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"/>
                </svg>
                Camera
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  background: 'linear-gradient(45deg, #10b981, #059669)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 16px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 6px 15px rgba(16, 185, 129, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                Upload
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />

            {/* Mode Indicator */}
            {modeText && (
              <div style={{
                color: '#10b981',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textAlign: 'center',
                marginBottom: '8px'
              }}>
                {modeText}
              </div>
            )}

            {/* Upload Area / Image Display / Webcam */}
            <div style={{ minHeight: '300px', aspectRatio: '1' }}>
              {!isWebcamMode && !uploadedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{
                    height: '100%',
                    border: '2px dashed #10b981',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    const target = e.currentTarget;
                    target.style.background = 'rgba(16, 185, 129, 0.2)';
                    target.style.borderColor = '#059669';
                  }}
                  onMouseOut={(e) => {
                    const target = e.currentTarget;
                    target.style.background = 'rgba(16, 185, 129, 0.1)';
                    target.style.borderColor = '#10b981';
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '8px' }}>📤</div>
                  <div style={{ color: '#10b981', fontSize: '1rem', marginBottom: '3px' }}>
                    Click to upload image
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                    or drag and drop here
                  </div>
                </div>
              ) : uploadedImage ? (
                <div style={{
                  height: '100%',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid #10b981',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}>
                  <img
                    src={uploadedImage}
                    alt="Uploaded leaf"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      borderRadius: '8px'
                    }}
                  />
                </div>
              ) : (
                <div
                  ref={webcamContainerRef}
                  style={{
                    height: '100%',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid #10b981',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                  }}
                />
              )}
            </div>
          </div>

          {/* Right Section - Results */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', maxWidth: '50%' }}>
            <div style={{
              color: '#10b981',
              fontSize: '1.2rem',
              marginBottom: '15px',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Detection Results
            </div>

            <div style={{
              flex: '1',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #10b981',
              boxShadow: '0 5px 15px rgba(16, 185, 129, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              minHeight: '300px'
            }}>
              {isLoading ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: '#10b981',
                  fontSize: '1rem',
                  fontStyle: 'italic'
                }}>
                  Loading model...
                </div>
              ) : predictions.length > 0 ? (
                <>
                  {predictions.map((prediction, index) => {
                    const percentage = Math.round(prediction.probability * 100);
                    return (
                      <div
                        key={index}
                        style={{
                          background: 'rgba(249, 250, 251, 0.8)',
                          borderRadius: '8px',
                          borderLeft: `4px solid ${getResultColor(prediction.className)}`,
                          color: '#1f2937',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px',
                          gap: '10px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          const target = e.currentTarget;
                          target.style.transform = 'translateY(-2px)';
                          target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                          const className = prediction.className;
                          if (className === 'Healthy') {
                            target.style.background = 'rgba(220, 252, 231, 0.9)';
                          } else if (className === 'Powdery') {
                            target.style.background = 'rgba(254, 249, 195, 0.9)';
                          } else if (className === 'Rust') {
                            target.style.background = 'rgba(254, 226, 226, 0.9)';
                          }
                        }}
                        onMouseOut={(e) => {
                          const target = e.currentTarget;
                          target.style.transform = 'translateY(0)';
                          target.style.boxShadow = 'none';
                          target.style.background = 'rgba(249, 250, 251, 0.8)';
                        }}
                      >
                        <div style={{
                          fontSize: '1.5rem',
                          width: '30px',
                          textAlign: 'center'
                        }}>
                          {classIcons[prediction.className] || '🔬'}
                        </div>
                        <div style={{
                          flex: '1',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{ fontWeight: '600', fontSize: '1rem' }}>
                            {prediction.className}:
                          </span>
                          <span style={{
                            fontSize: '1.2rem',
                            fontWeight: '700',
                            color: getResultColor(prediction.className)
                          }}>
                            {percentage}%
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Care Tips Section */}
                  {dominantPrediction && dominantPrediction.probability > 0.3 && (
                    <div style={{
                      marginTop: '20px',
                      background: 'rgba(240, 253, 244, 0.9)',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '2px solid rgba(16, 185, 129, 0.3)',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
                    }}>
                      <div style={{
                        color: '#10b981',
                        fontSize: '1.3rem',
                        fontWeight: '800',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        textShadow: '0 1px 2px rgba(16, 185, 129, 0.2)'
                      }}>
                        <span style={{ fontSize: '1.6rem' }}>💡</span>
                        Care Tips for {dominantPrediction.className} Plant
                      </div>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        {careTips[dominantPrediction.className]?.map((tip, index) => (
                          <div key={index} style={{
                            color: '#1f2937',
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            padding: '6px 0',
                            fontWeight: '500'
                          }}>
                            <span style={{ 
                              color: '#10b981', 
                              fontWeight: 'bold', 
                              minWidth: '20px',
                              fontSize: '1rem'
                            }}>
                              {index + 1}.
                            </span>
                            <span style={{ lineHeight: '1.4' }}>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: '#10b981',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  padding: '20px'
                }}>
                  Choose camera or upload an image to start detection
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeafGuard;