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
    ],
    tamil: [
      "10வது வகுப்புக்குப் பிறகு எந்த ஸ்ட்ரீம் தேர்வு செய்ய வேண்டும்?",
      "எந்த இன்ஜினியரிங் பிராஞ்சில் சிறந்த வாய்ப்பு உள்ளது?",
      "மெடிக்கல் நுழைவுத் தேர்வுகளுக்கு எப்படி தயாராக வேண்டும்?",
      "காமர்ஸில் உள்ள தொழில் வாய்ப்புகள் என்ன?",
      "அரசு கல்லூரி சேர்க்கை பற்றி சொல்லுங்கள்"
    ],
    telugu: [
      "10వ తరగతి తర్వాత ఏ స్ట్రీమ్ ఎంచుకోవాలి?",
      "ఎలాంటి ఇంజినీరింగ్ బ్రాంచ్‌కు మంచి స్కోప్ ఉంది?",
      "మెడికల్ ఎంట్రన్స్ పరీక్షలకు ఎలా సిద్ధం కావాలి?",
      "కామర్స్‌లో ఉన్న కెరీర్ ఆప్షన్స్ ఏమిటి?",
      "ప్రభుత్వ కళాశాలల్లో అడ్మిషన్ల గురించి చెప్పండి"
    ],
    bengali: [
      "দশম শ্রেণির পরে কোন স্ট্রিম বেছে নেব?",
      "কোন ইঞ্জিনিয়ারিং শাখায় সবচেয়ে ভালো সুযোগ আছে?",
      "মেডিকেল প্রবেশিকা পরীক্ষার জন্য কীভাবে প্রস্তুতি নেব?",
      "কমার্সে ক্যারিয়ারের কী কী অপশন আছে?",
      "সরকারি কলেজে ভর্তি সম্পর্কে বলুন"
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
        counselor: "I'll connect you with one of our expert counselors. They're available 24/7 and can provide personalized guidance. Would you prefer a video call or chat session?",
        default: "That's a great question! I'm here to help with career guidance, stream selection, college recommendations, and connecting you with expert counselors. What specific area would you like to explore?"
      },
      hindi: {
        stream: "आपकी रुचियों के आधार पर, मैं हमारा व्यापक एप्टीट्यूड असेसमेंट लेने की सलाह दूंगा। यह विभिन्न विषयों में आपकी ताकत का विश्लेषण करेगा और सबसे उपयुक्त स्ट्रीम सुझाएगा। क्या आप अभी असेसमेंट शुरू करना चाहेंगे?",
        college: "मैं आपको कॉलेज खोजने में मदद कर सकता हूं! क्या आप मुझे अपना पसंदीदा स्थान, बजट रेंज और जिस कोर्स में आप रुचि रखते हैं, बता सकते हैं? इससे मुझे व्यक्तिगत सिफारिशें प्रदान करने में मदद मिलेगी।",
        assessment: "बेहतरीन विकल्प! हमारे करियर असेसमेंट में एप्टीट्यूड टेस्ट, व्यक्तित्व विश्लेषण और रुचि मैपिंग शामिल है। इसमें लगभग 15-20 मिनट लगते हैं और विस्तृत जानकारी मिलती है। क्या मैं आपका असेसमेंट शुरू करूं?",
        counselor: "मैं आपको हमारे विशेषज्ञ काउंसलर से जोड़ूंगा। वे 24/7 उपलब्ध हैं और व्यक्तिगत मार्गदर्शन प्रदान कर सकते हैं। क्या आप वीडियो कॉल या चैट सेशन पसंद करेंगे?",
        default: "यह एक बेहतरीन सवाल है! मैं करियर गाइडेंस, स्ट्रीम सिलेक्शन, कॉलेज रिकमेंडेशन और विशेषज्ञ काउंसलर से जोड़ने में मदद के लिए यहां हूं। आप किस विशिष्ट क्षेत्र को एक्सप्लोर करना चाहेंगे?"
      },
      marathi: {
        stream: "तुमच्या आवडींनुसार, मी आमचा सर्वसमावेशक अभिक्षमता मूल्यमापन घेण्याची शिफारस करतो. हे वेगवेगळ्या विषयांमधील तुमच्या ताकदीचे विश्लेषण करेल आणि सर्वात योग्य प्रवाह सुचवेल. तुम्हाला आत्ताच मूल्यमापन सुरू करायचे आहे का?",
        college: "मी तुम्हाला महाविद्यालये शोधण्यात मदत करू शकतो! कृपया तुमचे आवडते स्थान, बजेट श्रेणी आणि तुम्हाला कोणत्या कोर्समध्ये रस आहे ते सांगा. यामुळे मला वैयक्तिक शिफारसी देण्यास मदत होईल.",
        assessment: "छान निवड! आमच्या करिअर मूल्यमापनामध्ये अभिक्षमता चाचण्या, व्यक्तिमत्व विश्लेषण आणि आवड मॅपिंग समाविष्ट आहे. यास सुमारे १५-२० मिनिटे लागतात आणि तपशीलवार माहिती मिळते. मी तुमचे मूल्यमापन सुरू करू का?",
        counselor: "मी तुम्हाला आमच्या तज्ज्ञ सल्लागारांशी जोडेन. ते २४/७ उपलब्ध आहेत आणि वैयक्तिक मार्गदर्शन देऊ शकतात. तुम्हाला व्हिडिओ कॉल किंवा चॅट सत्र हवे आहे का?",
        default: "हा एक छान प्रश्न आहे! मी करिअर मार्गदर्शन, प्रवाह निवड, महाविद्यालय शिफारसी आणि तज्ज्ञ सल्लागारांशी जोडण्यात मदत करण्यासाठी येथे आहे. तुम्हाला कोणत्या विशिष्ट क्षेत्राचा शोध घ्यायचा आहे?"
      },
      tamil: {
        stream: "உங்கள் விருப்பங்களைப் பொருத்து, எங்கள் விரிவான திறனறிதல் மதிப்பீட்டை எடுத்துக்கொள்ள பரிந்துரைக்கிறேன். இது பல்வேறு பாடங்களில் உங்கள் வலிமைகளை பகுப்பாய்வு செய்து, மிகவும் பொருத்தமான துறையை பரிந்துரைக்கும். இப்போது மதிப்பீட்டைத் தொடங்க விரும்புகிறீர்களா?",
        college: "நான் உங்களுக்கு கல்லூரிகளைத் தேட உதவலாம்! உங்கள் விருப்பமான இடம், பட்ஜெட் வரம்பு மற்றும் நீங்கள் ஆர்வமுள்ள பாடநெறி என்ன என்பதைச் சொல்ல முடியுமா? இது தனிப்பயன் பரிந்துரைகளை வழங்க உதவும்.",
        assessment: "சிறந்த தேர்வு! எங்கள் தொழில் மதிப்பீட்டில் திறனறிதல் தேர்வுகள், தனிமனிதப் பகுப்பாய்வு மற்றும் விருப்ப வரைபடம் அடங்கும். இது சுமார் 15-20 நிமிடங்கள் ஆகும் மற்றும் விரிவான தகவலை வழங்கும். உங்கள் மதிப்பீட்டைத் தொடங்கலாமா?",
        counselor: "நான் உங்களை எங்கள் நிபுணர் ஆலோசகருடன் இணைக்கிறேன். அவர்கள் 24/7 கிடைக்கின்றனர் மற்றும் தனிப்பயன் வழிகாட்டுதலை வழங்கலாம். நீங்கள் வீடியோ அழைப்பு அல்லது உரையாடல் அமர்வு விரும்புகிறீர்களா?",
        default: "இது ஒரு சிறந்த கேள்வி! தொழில் வழிகாட்டுதல், துறை தேர்வு, கல்லூரி பரிந்துரைகள் மற்றும் நிபுணர் ஆலோசகருடன் இணைப்பதில் உதவ நான் இங்கே இருக்கிறேன். நீங்கள் எந்த குறிப்பிட்ட பகுதியை ஆராய விரும்புகிறீர்கள்?"
      },
      telugu: {
        stream: "మీ ఆసక్తులను బట్టి, మా సమగ్ర సామర్థ్య పరీక్షను తీసుకోవాలని నేను సిఫార్సు చేస్తాను. ఇది వివిధ విషయాలలో మీ బలాలను విశ్లేషించి, అత్యంత అనుకూలమైన స్ట్రీమ్‌ను సూచిస్తుంది. మీరు ఇప్పుడు అసెస్‌మెంట్ ప్రారంభించాలనుకుంటున్నారా?",
        college: "నేను మీకు కాలేజీలను కనుగొనడంలో సహాయపడగలను! దయచేసి మీ ఇష్టమైన ప్రదేశం, బడ్జెట్ పరిధి మరియు మీరు ఆసక్తి ఉన్న కోర్సు ఏమిటో చెప్పగలరా? ఇది నాకు వ్యక్తిగత సిఫార్సులు ఇవ్వడంలో సహాయపడుతుంది.",
        assessment: "చక్కటి ఎంపిక! మా కెరీర్ అసెస్‌మెంట్‌లో సామర్థ్య పరీక్షలు, వ్యక్తిత్వ విశ్లేషణ మరియు ఆసక్తి మ్యాపింగ్ ఉన్నాయి. దీనికి సుమారు 15-20 నిమిషాలు పడుతుంది మరియు వివరమైన సమాచారం అందిస్తుంది. నేను మీ అసెస్‌మెంట్ ప్రారంభించాలా?",
        counselor: "నేను మిమ్మల్ని మా నిపుణుల కౌన్సిలర్‌తో కలిపేస్తాను. వారు 24/7 అందుబాటులో ఉంటారు మరియు వ్యక్తిగత మార్గదర్శకత్వాన్ని అందించగలరు. మీరు వీడియో కాల్ లేదా చాట్ సెషన్‌ను ఇష్టపడతారా?",
        default: "అది గొప్ప ప్రశ్న! కెరీర్ మార్గదర్శకత్వం, స్ట్రీమ్ ఎంపిక, కాలేజీ సిఫార్సులు మరియు నిపుణుల కౌన్సిలర్‌తో కలిపించడంలో సహాయపడటానికి నేను ఇక్కడ ఉన్నాను. మీరు ఏ ప్రత్యేక ప్రాంతాన్ని అన్వేషించాలనుకుంటున్నారు?"
      }
      // Add more languages here as needed
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