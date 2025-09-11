import React from 'react';

const CoursePreview: React.FC = () => {
  return (
    <>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .environmental-news-container {
           font-family: 'EB Garamond', 'Times New Roman', Times, serif;
            line-height: 1.6;
            background: linear-gradient(135deg, rgba(209, 250, 229, 0.8) 0%, rgba(167, 243, 208, 0.8) 100%);
            min-height: 100vh;
            color: #1a1a1a;
            padding: 20px;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }

          .breaking-news {
            background: linear-gradient(135deg, #d10000, #ff0000);
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            margin-bottom: 30px;
            animation: pulse 2s infinite;
            text-align: center;
            box-shadow: 0 5px 15px rgba(200, 0, 0, 0.4);
            border: 1px solid #800000;
            font-family: 'Playfair Display', serif;
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }

          .breaking-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 0.9em;
          }

          .breaking-badge {
            background: #000;
            padding: 3px 10px;
            border-radius: 3px;
            font-weight: bold;
            letter-spacing: 1px;
          }

          .breaking-time {
            opacity: 0.9;
            color:black;
          }

          .breaking-text {
           font-weight:bold;
            font-size: 1.2em;
            letter-spacing: 0.5px;
            color:white;
            
          }

          .news-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 40px;
          }

          .main-story {
            background: #fff;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            border: 1px solid #ccc;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .main-story:hover {
          
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
          }

          .story-image {
            width: 100%;
            height: 300px;
            background: url("https://thumbs.dreamstime.com/b/sustainable-green-industry-eco-friendly-technology-vintage-news-newspaper-printing-abstract-concept-retro-headlines-d-292891333.jpg");
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4em;
            color: #2d5a2d;
            border-bottom: 2px solid #ccc;
          }

          .story-content {
            padding: 30px;
          }

          .story-category {
            display: inline-block;
            background: #2d5a2d;
            color: white;
            padding: 8px 16px;
            border-radius: 3px;
            font-size: 0.85em;
            font-weight: bold;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: 'Playfair Display', serif;
          }

          .story-title {
            font-size: 2.2em;
            font-weight: bold;
            color: #000;
            margin-bottom: 15px;
            line-height: 1.3;
            font-family: 'Playfair Display', serif;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
            margin-top: 0;
          }

          .story-excerpt {
            color: #333;
            font-size: 1.1em;
            margin-bottom: 20px;
            line-height: 1.7;
          }

          .story-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 20px;
            border-top: 2px solid #eee;
            font-size: 0.9em;
            color: #666;
            font-style: italic;
          }

          .sidebar {
            display: flex;
            flex-direction: column;
            gap: 25px;
          }

          .sidebar-section {
            background: #fff;
            border-radius: 5px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid #ccc;
          }

          .sidebar-title {
            font-size: 1.4em;
            font-weight: bold;
            color: #000;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #ccc;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: 'Playfair Display', serif;
            margin-top: 0;
          }

          .quick-news-item {
            display: flex;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #eee;
            transition: background 0.3s ease;
          }

          .quick-news-item:hover {
            background: #f5f5f5;
            border-radius: 3px;
            padding: 15px 10px;
          }

          .quick-news-item:last-child {
            border-bottom: none;
          }

          .news-icon {
            font-size: 2em;
            margin-right: 15px;
            color: #2d5a2d;
          }

          .news-text {
            flex: 1;
          }

          .news-headline {
            font-weight: bold;
            color: #000;
            font-size: 1em;
            margin-bottom: 5px;
            font-family: 'Playfair Display', serif;
          }

          .news-time {
            font-size: 0.85em;
            color: #666;
            font-style: italic;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 20px;
          }

          .stat-item {
            background: linear-gradient(135deg, #f0f8f0, #e8f5e8);
            padding: 20px;
            border-radius: 5px;
            text-align: center;
            border: 1px solid #ccc;
          }

          .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: black;
            display: block;
            font-family: 'Playfair Display', serif;
          }

          .stat-item:hover  {
     transform: scale(1.05);
}

          .stat-label {
            font-size: 0.9em;
            color: #333;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          @media (max-width: 768px) {
            .news-grid {
                grid-template-columns: 1fr;
            }
            
            .story-title {
                font-size: 1.8em;
            }
            
            .container {
                padding: 10px;
            }
            
            .breaking-header {
                flex-direction: column;
                align-items: center;
                gap: 5px;
            }
          }
        `}
      </style>
      
      <div className="environmental-news-container">
        <div className="container">
          <div className="breaking-news">
            <div className="breaking-header">
              <span className="breaking-badge">BREAKING</span>
              <span className="breaking-time">September 11, 2025 • 3:42 PM</span>
            </div>
            <div className="breaking-text">
              New renewable energy milestone reached globally as solar and wind capacity exceeds coal for first time in history
            </div>
          </div>

          <div className="news-grid">
            <article className="main-story">
              <div className="story-image">
                <span></span>
              </div>
              <div className="story-content">
                <span className="story-category">Ocean Conservation</span>
                <h2 className="story-title">Major Breakthrough in Ocean Plastic Cleanup Technology</h2>
                <p className="story-excerpt">
                  Scientists have developed a revolutionary new method for removing microplastics from ocean water using sustainable bio-materials. The breakthrough could transform how we approach marine pollution cleanup efforts worldwide.
                </p>
                <div className="story-meta">
                  <span>📰 Environmental Times</span>
                  <span>🕒 2 hours ago</span>
                </div>
              </div>
            </article>

            <aside className="sidebar">
              <div className="sidebar-section">
                <h3 className="sidebar-title">Quick Updates</h3>
                <div className="quick-news-item">
                  <div className="news-icon">🌳</div>
                  <div className="news-text">
                    <div className="news-headline">Forest Restoration Initiative Exceeds Goals</div>
                    <div className="news-time">4 hours ago</div>
                  </div>
                </div>
                <div className="quick-news-item">
                  <div className="news-icon">⚡</div>
                  <div className="news-text">
                    <div className="news-headline">Solar Energy Costs Drop to Record Low</div>
                    <div className="news-time">6 hours ago</div>
                  </div>
                </div>
                <div className="quick-news-item">
                  <div className="news-icon">🦋</div>
                  <div className="news-text">
                    <div className="news-headline">Monarch Butterfly Population Shows Recovery</div>
                    <div className="news-time">8 hours ago</div>
                  </div>
                </div>
              </div>

              <div className="sidebar-section">
                <h3 className="sidebar-title">Environmental Stats</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-number">42%</span>
                    <span className="stat-label">Renewable Energy</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">15M</span>
                    <span className="stat-label">Trees Planted</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">28°C</span>
                    <span className="stat-label">Global Temp</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">385ppm</span>
                    <span className="stat-label">CO₂ Levels</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePreview;
