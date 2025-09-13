import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import AssessmentCard from './components/AssessmentCard';
import CareerCard from './components/CareerCard';
import StreamWizard from './components/StreamWizard';
import SkillsGapAnalysis from './components/SkillsGapAnalysis';
import ProgressTracker from './components/ProgressTracker';
import PeerComparison from './components/PeerComparison';

const CareerDiscoveryPortal = () => {
  const [activeTab, setActiveTab] = useState('assessments');
  const [selectedStream, setSelectedStream] = useState(null);
  const [bookmarkedCareers, setBookmarkedCareers] = useState([]);
  const [userProgress, setUserProgress] = useState({
    completed: 2,
    streak: 7,
    points: 1250,
    level: 'Explorer',
    achievements: []
  });

  const assessments = [
    {
      id: 'personality',
      title: 'Personality Assessment',
      description: 'Discover your personality type and how it aligns with different career paths. Based on scientifically proven models.',
      duration: '15-20 minutes',
      icon: 'User',
      bgColor: 'bg-blue-500',
      features: ['16 Personality Types', 'Career Matching', 'Strength Analysis']
    },
    {
      id: 'interests',
      title: 'Interest Profiler',
      description: 'Explore your interests and passions to find careers that truly excite and motivate you.',
      duration: '10-15 minutes',
      icon: 'Heart',
      bgColor: 'bg-red-500',
      features: ['Holland Code', 'Interest Areas', 'Activity Preferences']
    },
    {
      id: 'aptitude',
      title: 'Aptitude Test',
      description: 'Measure your natural abilities and cognitive strengths across different skill areas.',
      duration: '25-30 minutes',
      icon: 'Brain',
      bgColor: 'bg-purple-500',
      features: ['Logical Reasoning', 'Numerical Ability', 'Verbal Skills']
    },
    {
      id: 'values',
      title: 'Work Values Assessment',
      description: 'Identify what matters most to you in a career - work-life balance, salary, impact, and more.',
      duration: '8-12 minutes',
      icon: 'Scale',
      bgColor: 'bg-green-500',
      features: ['Value Priorities', 'Work Environment', 'Life Goals']
    },
    {
      id: 'skills',
      title: 'Skills Inventory',
      description: 'Evaluate your current skills and identify areas for development in your chosen career path.',
      duration: '12-18 minutes',
      icon: 'Award',
      bgColor: 'bg-orange-500',
      features: ['Technical Skills', 'Soft Skills', 'Learning Recommendations']
    }
  ];

  const careers = [
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      category: 'Technology',
      description: 'Design, develop, and maintain software applications and systems using various programming languages and frameworks.',
      salaryRange: '4-15 LPA',
      salaryLevel: 'high',
      growth: 'high',
      icon: 'Code',
      bgColor: 'bg-blue-500',
      education: ['B.Tech CSE', 'BCA', 'MCA'],
      skills: ['Programming', 'Problem Solving', 'System Design', 'Debugging', 'Teamwork']
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      category: 'Analytics',
      description: 'Analyze complex data to extract insights and build predictive models that drive business decisions.',
      salaryRange: '6-20 LPA',
      salaryLevel: 'high',
      growth: 'high',
      icon: 'BarChart3',
      bgColor: 'bg-green-500',
      education: ['Statistics', 'Mathematics', 'Computer Science'],
      skills: ['Python/R', 'Machine Learning', 'Statistics', 'Data Visualization', 'SQL']
    },
    {
      id: 'digital-marketer',
      title: 'Digital Marketing Specialist',
      category: 'Marketing',
      description: 'Create and execute online marketing campaigns to promote brands and drive customer engagement.',
      salaryRange: '3-10 LPA',
      salaryLevel: 'medium',
      growth: 'high',
      icon: 'Megaphone',
      bgColor: 'bg-purple-500',
      education: ['Marketing', 'Communications', 'Business'],
      skills: ['SEO/SEM', 'Content Creation', 'Analytics', 'Social Media', 'Creativity']
    },
    {
      id: 'doctor',
      title: 'Medical Doctor',
      category: 'Healthcare',
      description: 'Diagnose and treat patients, providing medical care and promoting health and wellness in communities.',
      salaryRange: '8-25 LPA',
      salaryLevel: 'high',
      growth: 'medium',
      icon: 'Stethoscope',
      bgColor: 'bg-red-500',
      education: ['MBBS', 'MD', 'Specialization'],
      skills: ['Medical Knowledge', 'Empathy', 'Decision Making', 'Communication', 'Attention to Detail']
    },
    {
      id: 'teacher',
      title: 'Educator/Teacher',
      category: 'Education',
      description: 'Educate and inspire students, helping them develop knowledge, skills, and character for their future.',
      salaryRange: '2.5-8 LPA',
      salaryLevel: 'medium',
      growth: 'medium',
      icon: 'GraduationCap',
      bgColor: 'bg-indigo-500',
      education: ['B.Ed', 'Subject Specialization', 'Teaching Certification'],
      skills: ['Communication', 'Patience', 'Subject Expertise', 'Classroom Management', 'Creativity']
    },
    {
      id: 'entrepreneur',
      title: 'Entrepreneur',
      category: 'Business',
      description: 'Start and manage your own business, creating innovative solutions and building successful ventures.',
      salaryRange: '0-50+ LPA',
      salaryLevel: 'high',
      growth: 'high',
      icon: 'Rocket',
      bgColor: 'bg-yellow-500',
      education: ['Business', 'MBA', 'Domain Expertise'],
      skills: ['Leadership', 'Risk Taking', 'Innovation', 'Networking', 'Financial Management']
    }
  ];

  const tabs = [
    { id: 'assessments', name: 'Assessments', icon: 'ClipboardList' },
    { id: 'careers', name: 'Explore Careers', icon: 'Briefcase' },
    { id: 'streams', name: 'Stream Wizard', icon: 'BookOpen' },
    { id: 'skills', name: 'Skills Gap', icon: 'TrendingUp' },
    { id: 'progress', name: 'Progress', icon: 'Target' },
    { id: 'peers', name: 'Peer Insights', icon: 'Users' }
  ];

  useEffect(() => {
    // Simulate loading user progress
    const savedProgress = localStorage.getItem('careerDiscoveryProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const handleStartAssessment = (assessmentId) => {
    console.log('Starting assessment:', assessmentId);
    // Implement assessment start logic
  };

  const handleExploreCareer = (careerId) => {
    console.log('Exploring career:', careerId);
    // Implement career exploration logic
  };

  const handleBookmarkCareer = (careerId) => {
    setBookmarkedCareers(prev => 
      prev?.includes(careerId) 
        ? prev?.filter(id => id !== careerId)
        : [...prev, careerId]
    );
  };

  const handleStreamSelect = (streamId) => {
    setSelectedStream(streamId);
  };

  const handleContinueAssessment = () => {
    setActiveTab('assessments');
  };

  const handleViewResults = () => {
    console.log('Viewing assessment results');
  };

  const handleViewPeerDetails = (storyId) => {
    console.log('Viewing peer story:', storyId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Icon name="Sparkles" size={16} />
                <span>Discover Your Perfect Career Path</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                Career Discovery Portal
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                Take scientifically-backed assessments, explore 200+ careers, and get personalized guidance 
                to make informed decisions about your future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  onClick={() => setActiveTab('assessments')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Start Assessment
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Compass"
                  iconPosition="left"
                  onClick={() => setActiveTab('careers')}
                >
                  Explore Careers
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-surface border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 overflow-x-auto py-4">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground shadow-elevation-1'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Assessments Tab */}
            {activeTab === 'assessments' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-text-primary mb-4">
                    Career Assessment Suite
                  </h2>
                  <p className="text-text-secondary max-w-2xl mx-auto">
                    Complete our comprehensive assessments to discover your strengths, interests, 
                    and ideal career matches based on scientific research.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assessments?.map((assessment) => (
                    <AssessmentCard
                      key={assessment?.id}
                      assessment={assessment}
                      onStart={handleStartAssessment}
                      isCompleted={userProgress?.completed >= 2}
                      progress={assessment?.id === 'personality' ? 100 : assessment?.id === 'interests' ? 60 : 0}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Careers Tab */}
            {activeTab === 'careers' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-text-primary mb-4">
                    Explore Career Options
                  </h2>
                  <p className="text-text-secondary max-w-2xl mx-auto">
                    Discover detailed information about 200+ careers including salary ranges, 
                    growth prospects, and required skills in the Indian job market.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {careers?.map((career) => (
                    <CareerCard
                      key={career?.id}
                      career={career}
                      onExplore={handleExploreCareer}
                      isBookmarked={bookmarkedCareers?.includes(career?.id)}
                      onBookmark={handleBookmarkCareer}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Stream Wizard Tab */}
            {activeTab === 'streams' && (
              <StreamWizard
                onStreamSelect={handleStreamSelect}
                selectedStream={selectedStream}
              />
            )}

            {/* Skills Gap Tab */}
            {activeTab === 'skills' && (
              <SkillsGapAnalysis
                userSkills={[]}
                targetCareer="software-engineer"
              />
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <ProgressTracker
                userProgress={userProgress}
                onContinue={handleContinueAssessment}
                onViewResults={handleViewResults}
              />
            )}

            {/* Peer Insights Tab */}
            {activeTab === 'peers' && (
              <PeerComparison
                userProfile={{}}
                onViewDetails={handleViewPeerDetails}
              />
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-secondary py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Discover Your Future?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of students who have found their perfect career path through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                iconName="Rocket"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90"
              >
                Get Personalized Guidance
              </Button>
              <Link to="/personal-guidance-center">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="border-white text-white hover:bg-white/10"
                >
                  Talk to Expert
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CareerDiscoveryPortal;