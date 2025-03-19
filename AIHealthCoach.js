import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaChartPie, 
  FaNotesMedical, 
  FaPills, 
  FaUserFriends, 
  FaUsers, 
  FaRobot, 
  FaCog,
  FaPaperPlane,
  FaLightbulb,
  FaHistory
} from 'react-icons/fa';
import '../styles/Dashboard.css';
import '../styles/AIHealthCoach.css';
// Import logo
import logo from '../assets/health-logo.png';
// Import HealthDataModal
import HealthDataModal from '../components/Modals/HealthDataModal';

const AIHealthCoach = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ai-coach');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const messageInputRef = useRef(null);
  
  // State for health log modal
  const [isHealthLogModalOpen, setIsHealthLogModalOpen] = useState(false);
  const [logType, setLogType] = useState('glucose');

  // Navigation functions
  const navigateToProfile = () => {
    navigate('/profile');
  };

  const navigateToMedications = () => {
    navigate('/medications');
  };

  const navigateToFriends = () => {
    navigate('/friends');
  };
  
  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  // Function to Navigate to community page
  const navigateToCommunity = () => {
    navigate('/community');
  };
  
  // Function to Navigate to AI Coach page
  const navigateToAiCoach = () => {
      navigate('/ai-coach');
  };
  
  // Function to Navigate to settings page
  const navigateToSettings = () => {
      navigate('/settings');
    };
  
  // Open health log modal
  const openLogModal = (type = 'glucose') => {
    setLogType(type);
    setIsHealthLogModalOpen(true);
  };

  // Load conversation history and health data
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, you would fetch the user's conversation history
        // and health data from a backend API
        setTimeout(() => {
          setConversation([
            {
              id: '1',
              sender: 'ai',
              message: "Hello! I'm your AI Health Coach. How can I assist you with your health management today?",
              timestamp: new Date(Date.now() - 1000 * 60).toISOString()
            }
          ]);
          
          setSuggestedQuestions([
            "What should my blood sugar target be?",
            "How can I improve my medication adherence?",
            "Suggest a meal plan for my condition",
            "What exercise is safe for someone with my condition?"
          ]);
          
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Scroll to bottom of chat when conversation updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Send user message and handle AI response
  const sendMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to conversation
    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: message.trim(),
      timestamp: new Date().toISOString()
    };
    
    setConversation(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);
    
    // In a real app, you would send the message to a backend API
    // and receive an AI response. Here we'll simulate a response.
    setTimeout(() => {
      const aiResponses = [
        "Based on your health data, I recommend staying hydrated and maintaining regular blood glucose monitoring.",
        "It's important to take your medications regularly. Would you like me to set up reminders for you?",
        "Your recent health readings look good! Keep up the good work with your health routine.",
        "According to guidelines for your condition, it's recommended to have regular check-ups every 3 months.",
        "Have you been experiencing any side effects from your medications lately?"
      ];
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        message: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toISOString()
      };
      
      setConversation(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Get today's date in a readable format
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', 
    month: 'long', 
    day: 'numeric'
  });

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your health coach...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Chronic Care Companion Logo" className="sidebar-logo" />
          <div className="sidebar-title">
            <h2 className="title-primary">Chronic Care</h2>
            <h3 className="title-secondary">Companion</h3>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={navigateToDashboard}
          >
            <span className="nav-icon"><FaChartPie /></span> Dashboard
          </button>

          <button 
            className={`nav-item ${activeTab === 'medications' ? 'active' : ''}`}
            onClick={navigateToMedications}
          >
            <span className="nav-icon"><FaPills /></span> Medications
          </button>

          <button 
            className={`nav-item ${activeTab === 'friends' ? 'active' : ''}`}
            onClick={navigateToFriends}
          >
            <span className="nav-icon"><FaUserFriends /></span> Friends
          </button>

          <button 
            className={`nav-item ${activeTab === 'community' ? 'active' : ''}`}
            onClick={navigateToCommunity}
          >
            <span className="nav-icon"><FaUsers /></span> Community
          </button>

          <button 
            className={`nav-item ${activeTab === 'ai-coach' ? 'active' : ''}`}
            onClick={navigateToAiCoach}
          >
            <span className="nav-icon"><FaRobot /></span> AI Coach
          </button>

          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={navigateToSettings}
          >
            <span className="nav-icon"><FaCog /></span> Settings
          </button>
          
        </nav>
        <div className="sidebar-footer">
          <div 
            className="user-profile"
            onClick={navigateToProfile}
            role="button"
            title="View Profile"
            tabIndex={0}
          >
            <div className="avatar">
              {user?.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt={`${user?.firstName || 'User'}'s profile`}
                  className="avatar-image" 
                />
              ) : (
                <span>{user?.firstName?.charAt(0) || 'U'}</span>
              )}
            </div>
            <div className="user-info">
              <p className="user-name">{user?.firstName || 'User'}</p>
              <p className="user-email">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Top Bar */}
        <div className="dashboard-topbar">
          <div className="topbar-left">
            <h1>AI Health Coach</h1>
            <div className="date">{today}</div>
          </div>
        </div>
        
        {/* AI Coach Interface */}
        <div className="ai-coach-container">
          <div className="ai-chat-container">
            <div className="chat-messages">
              {conversation.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
                >
                  <div className="message-content">
                    {msg.sender === 'ai' && (
                      <div className="ai-avatar">
                        <FaRobot />
                      </div>
                    )}
                    <div className="message-bubble">
                      <p>{msg.message}</p>
                      <span className="message-time">{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="chat-message ai-message">
                  <div className="message-content">
                    <div className="ai-avatar">
                      <FaRobot />
                    </div>
                    <div className="message-bubble typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>
            
            <div className="chat-input-container">
              <textarea 
                ref={messageInputRef}
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                onKeyPress={handleKeyPress}
                placeholder="Type your health question here..."
                className="chat-input"
                rows={1}
              />
              <button 
                onClick={sendMessage} 
                className="send-button"
                disabled={!message.trim() || isTyping}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
          
          <div className="ai-sidebar">
            <div className="suggested-questions">
              <h3><FaLightbulb /> Suggested Questions</h3>
              <div className="questions-list">
                {suggestedQuestions.map((question, index) => (
                  <button 
                    key={index} 
                    className="suggested-question"
                    onClick={() => {
                      setMessage(question);
                      messageInputRef.current?.focus();
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="conversation-history">
              <h3><FaHistory /> Recent Topics</h3>
              <div className="topics-list">
                <button className="history-topic">Medication Schedule</button>
                <button className="history-topic">Blood Pressure Concerns</button>
                <button className="history-topic">Exercise Recommendations</button>
                <button className="history-topic">Diet Planning</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Health Data Modal */}
      {isHealthLogModalOpen && (
        <HealthDataModal
          isOpen={isHealthLogModalOpen}
          onClose={() => setIsHealthLogModalOpen(false)}
          logType={logType}
        />
      )}
    </div>
  );
};

export default AIHealthCoach;
