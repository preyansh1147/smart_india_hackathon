import React, { useEffect, useRef, useState } from 'react';

import Button from './ui/Button';
import Icon from './AppIcon';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const languages = [
    { code: 'english', name: 'English', flag: '🇮🇳' },
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'tamil', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'telugu', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bengali', name: 'বাংলা', flag: '🇮🇳' }
  ];

  const welcomeMessages = {
    english: {
      greeting: "Hi! I'm ShikshaPath AI, your career guidance assistant. How can I help you today?",
      quickReplies: [
        "Help me choose a stream",
        "Find colleges near me",
        "Career assessment test",
        "Talk to a counselor"
      ]
    },
    hindi: {
      greeting: "नमस्ते! मैं ShikshaPath AI हूं, आपका करियर गाइडेंस असिस्टेंट। आज मैं आपकी कैसे मदद कर सकता हूं?",
      quickReplies: [
        "स्ट्रीम चुनने में मदद करें",
        "मेरे पास के कॉलेज खोजें",
        "करियर असेसमेंट टेस्ट",
        "काउंसलर से बात करें"
      ]
    },
    tamil: {
      greeting: "வணக்கம்! நான் ShikshaPath AI, உங்கள் தொழில் வழிகாட்டுதல் உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
      quickReplies: [
        "ஸ்ட்ரீம் தேர்வு செய்ய உதவுங்கள்",
        "என் அருகில் உள்ள கல்லூரிகள்",
        "தொழில் மதிப்பீட்டு சோதனை",
        "ஆலோசகருடன் பேசுங்கள்"
      ]
    },
    telugu: {
      greeting: "నమస్కారం! నేను ShikshaPath AI, మీ కెరీర్ గైడెన్స్ అసిస్టెంట్. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?",
      quickReplies: [
        "స్ట్రీమ్ ఎంచుకోవడంలో సహాయం",
        "నా దగ్గర కాలేజీలు కనుగొనండి",
        "కెరీర్ అసెస్మెంట్ టెస్ట్",
        "కౌన్సెలర్‌తో మాట్లాడండి"
      ]
    },
    bengali: {
      greeting: "নমস্কার! আমি ShikshaPath AI, আপনার ক্যারিয়ার গাইডেন্স সহায়ক। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
      quickReplies: [
        "স্ট্রিম বেছে নিতে সাহায্য করুন",
        "আমার কাছের কলেজগুলি খুঁজুন",
        "ক্যারিয়ার অ্যাসেসমেন্ট টেস্ট",
        "কাউন্সেলরের সাথে কথা বলুন"
      ]
    }
  };

  const contextualPrompts = {
    english: [
      "What stream should I choose after Class 10?",
      "Which engineering branch has the best scope?",
      "How do I prepare for medical entrance exams?",
      "What are the career options in commerce?",
      "Tell me about government college admissions"
    ],
    hindi: [
      "कक्षा 10 के बाद कौन सा स्ट्रीम चुनूं?",
      "किस इंजीनियरिंग ब्रांच में सबसे अच्छा स्कोप है?",
      "मेडिकल एंट्रेंस एग्जाम की तैयारी कैसे करूं?",
      "कॉमर्स में करियर के क्या विकल्प हैं?",
      "सरकारी कॉलेज एडमिशन के बारे में बताएं"
    ]
  };

  useEffect(() => {
    if (isOpen && messages?.length === 0) {
      const welcomeMsg = {
        id: Date.now(),
        text: welcomeMessages?.[currentLanguage]?.greeting,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMsg]);
    }
  }, [isOpen, currentLanguage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (message = inputValue) => {
    if (!message?.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage) => {
    const responses = {
      english: {
        stream: "Based on your interests, I'd recommend taking our comprehensive aptitude assessment. It will analyze your strengths in different subjects and suggest the most suitable stream. Would you like to start the assessment now?",
        college: "I can help you find colleges! Could you tell me your preferred location, budget range, and the course you're interested in? This will help me provide personalized recommendations.",
        assessment: "Great choice! Our career assessment includes aptitude tests, personality analysis, and interest mapping. It takes about 15-20 minutes and provides detailed insights. Shall I start your assessment?",
        counselor: "I\'ll connect you with one of our expert counselors. They\'re available 24/7 and can provide personalized guidance. Would you prefer a video call or chat session?",
        default: "That's a great question! I'm here to help with career guidance, stream selection, college recommendations, and connecting you with expert counselors. What specific area would you like to explore?"
      },
      hindi: {
        stream: "आपकी रुचियों के आधार पर, मैं हमारा व्यापक एप्टीट्यूड असेसमेंट लेने की सलाह दूंगा। यह विभिन्न विषयों में आपकी ताकत का विश्लेषण करेगा और सबसे उपयुक्त स्ट्रीम सुझाएगा। क्या आप अभी असेसमेंट शुरू करना चाहेंगे?",
        college: "मैं आपको कॉलेज खोजने में मदद कर सकता हूं! क्या आप मुझे अपना पसंदीदा स्थान, बजट रेंज और जिस कोर्स में आप रुचि रखते हैं, बता सकते हैं? इससे मुझे व्यक्तिगत सिफारिशें प्रदान करने में मदद मिलेगी।",
        assessment: "बेहतरीन विकल्प! हमारे करियर असेसमेंट में एप्टीट्यूड टेस्ट, व्यक्तित्व विश्लेषण और रुचि मैपिंग शामिल है। इसमें लगभग 15-20 मिनट लगते हैं और विस्तृत जानकारी मिलती है। क्या मैं आपका असेसमेंट शुरू करूं?",
        counselor: "मैं आपको हमारे विशेषज्ञ काउंसलर से जोड़ूंगा। वे 24/7 उपलब्ध हैं और व्यक्तिगत मार्गदर्शन प्रदान कर सकते हैं। क्या आप वीडियो कॉल या चैट सेशन पसंद करेंगे?",
        default: "यह एक बेहतरीन सवाल है! मैं करियर गाइडेंस, स्ट्रीम सिलेक्शन, कॉलेज रिकमेंडेशन और विशेषज्ञ काउंसलर से जोड़ने में मदद के लिए यहां हूं। आप किस विशिष्ट क्षेत्र को एक्सप्लोर करना चाहेंगे?"
      }
    };

    const currentResponses = responses?.[currentLanguage] || responses?.english;
    
    if (userMessage?.toLowerCase()?.includes('stream') || userMessage?.toLowerCase()?.includes('स्ट्रीम')) {
      return currentResponses?.stream;
    } else if (userMessage?.toLowerCase()?.includes('college') || userMessage?.toLowerCase()?.includes('कॉलेज')) {
      return currentResponses?.college;
    } else if (userMessage?.toLowerCase()?.includes('assessment') || userMessage?.toLowerCase()?.includes('असेसमेंट')) {
      return currentResponses?.assessment;
    } else if (userMessage?.toLowerCase()?.includes('counselor') || userMessage?.toLowerCase()?.includes('काउंसलर')) {
      return currentResponses?.counselor;
    } else {
      return currentResponses?.default;
    }
  };

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Widget */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isOpen ? 'w-96 h-[500px]' : 'w-16 h-16'
      }`}>
        {isOpen ? (
          /* Chat Interface */
          (<div className="bg-surface rounded-2xl shadow-elevation-4 border border-border overflow-hidden h-full flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Icon name="Bot" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">ShikshaPath AI</h3>
                    <p className="text-xs text-white/80">Career Guidance Assistant</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Language Selector */}
                  <select
                    value={currentLanguage}
                    onChange={(e) => setCurrentLanguage(e?.target?.value)}
                    className="bg-white/20 text-white text-xs rounded px-2 py-1 border-none outline-none"
                  >
                    {languages?.map(lang => (
                      <option key={lang?.code} value={lang?.code} className="text-text-primary">
                        {lang?.flag} {lang?.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={toggleWidget}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
              {messages?.map((message) => (
                <div
                  key={message?.id}
                  className={`flex ${message?.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    message?.sender === 'user' ?'bg-primary text-white rounded-br-sm' :'bg-surface text-text-primary rounded-bl-sm shadow-elevation-1'
                  }`}>
                    <p className="text-sm">{message?.text}</p>
                    <p className={`text-xs mt-1 ${
                      message?.sender === 'user' ? 'text-white/70' : 'text-text-secondary'
                    }`}>
                      {message?.timestamp?.toLocaleTimeString('en-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-surface p-3 rounded-2xl rounded-bl-sm shadow-elevation-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Replies */}
              {messages?.length === 1 && !isTyping && (
                <div className="space-y-2">
                  <p className="text-xs text-text-secondary text-center">Quick options:</p>
                  <div className="flex flex-wrap gap-2">
                    {welcomeMessages?.[currentLanguage]?.quickReplies?.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs bg-primary/10 text-primary px-3 py-2 rounded-full hover:bg-primary/20 transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e?.target?.value)}
                  onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                  placeholder={currentLanguage === 'hindi' ? 'अपना संदेश टाइप करें...' : 'Type your message...'}
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue?.trim()}
                  iconName="Send"
                  className="px-3"
                />
              </div>
            </div>
          </div>)
        ) : (
          /* Floating Button */
          (<button
            onClick={toggleWidget}
            className="w-16 h-16 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          >
            <Icon name="MessageCircle" size={24} className="group-hover:scale-110 transition-transform" />
            {/* Notification Dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center animate-pulse">
              <Icon name="Sparkles" size={8} color="white" />
            </div>
          </button>)
        )}
      </div>
      {/* Contextual Prompts */}
      {!isOpen && (
        <div className="fixed bottom-24 right-6 z-40 space-y-2">
          {contextualPrompts?.[currentLanguage]?.slice(0, 2)?.map((prompt, index) => (
            <div
              key={index}
              className={`bg-surface border border-border rounded-lg p-3 shadow-elevation-2 max-w-xs cursor-pointer hover:shadow-elevation-3 transition-all duration-300 transform translate-x-full opacity-0 animate-slide-in-right delay-${index * 500}`}
              onClick={() => {
                setIsOpen(true);
                setTimeout(() => handleSendMessage(prompt), 500);
              }}
            >
              <p className="text-sm text-text-primary">{prompt}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-text-secondary">Ask ShikshaPath AI</span>
                <Icon name="ArrowRight" size={12} className="text-primary" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;